'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { format } from 'date-fns';
import { DateRangeLocal } from '@/app/(dashboard)/components/DateRange';
import { formatDateEnd, formatDateStart } from '@/utils/datetime';

export type ActivityLog = {
  id: string;
  user: string;
  role: string;
  action: string;
  details: string;
  ipAddress: string;
  location: string;
  // formatted for UI
  timestamp: string;
  // raw for filtering
  rawTimestamp: string;
};

export type DateRangeFilter = 'all' | 'today' | 'week' | 'month' | 'year';

const safe = (v: unknown): string =>
  typeof v === 'string' ? v : v == null ? '' : String(v);

const safeLower = (v: unknown): string => safe(v).toLowerCase();

export function useActivityLogs(logsPerPage = 20) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeFilter>('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [exportingcsv, setExportingcsv] = useState(false);
  const [exportingpdf, setExportingpdf] = useState(false);

  const authorizedRequest = useAuthorizedRequest();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);

      const data = await authorizedRequest(async (validToken) => {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/activity-logs',
          { headers: { Authorization: `Bearer ${validToken}` } }
        );

        const arr: any[] = Array.isArray(res.data) ? res.data : [];

        const mapped: ActivityLog[] = arr.map((log: any, idx: number) => {
          // Try common keys with safe fallbacks
          const iso =
            safe(log.timestamp) ||
            safe(log.created_at) ||
            new Date().toISOString();

          const formatted = (() => {
            try {
              return format(new Date(iso), 'yyyy-MM-dd HH:mm');
            } catch {
              return safe(iso);
            }
          })();

          const details = safe(
            log.details ?? log.description ?? log.message ?? ''
          );

          return {
            id: safe(log.id) || `${iso}-${idx}`,
            action: safe(log.action ?? log.event ?? ''),
            user: safe(log.user ?? log.user_name ?? log.actor ?? ''),
            role: safe(log.role ?? log.user_role ?? ''),
            details: details.length > 80 ? details.slice(0, 80) + '…' : details,
            ipAddress: safe(log.ip_address ?? log.ip ?? ''),
            location: safe(log.location ?? ''),
            timestamp: formatted,
            rawTimestamp: iso,
          };
        });

        return mapped;
      }, 'Failed to load activity logs');

      if (isMounted) {
        if (data) setLogs(data);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  // Date range boundaries
  const getStartDate = (): Date | null => {
    const now = new Date();
    switch (dateRange) {
      case 'today': {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
      }
      case 'week': {
        const d = new Date(now);
        d.setDate(now.getDate() - 7);
        return d;
      }
      case 'month': {
        const d = new Date(now);
        d.setMonth(now.getMonth() - 1);
        return d;
      }
      case 'year': {
        const d = new Date(now);
        d.setFullYear(now.getFullYear() - 1);
        return d;
      }
      default:
        return null;
    }
  };

  // ✅ Filtering (fully guarded)
  const filteredLogs = useMemo(() => {
    const startDate = getStartDate();

    return logs.filter((log) => {
      const matchesSearch =
        safeLower(log.user).includes(safeLower(searchTerm)) ||
        safeLower(log.action).includes(safeLower(searchTerm)) ||
        safeLower(log.details).includes(safeLower(searchTerm));

      const matchesRole =
        roleFilter === 'all' || safeLower(log.role) === safeLower(roleFilter);

      const matchesAction =
        actionFilter === 'all' ||
        safeLower(log.action) === safeLower(actionFilter);

      // If you later add explicit org fields on the log, use them instead.
      const matchesOrg =
        orgFilter === 'all' ||
        safeLower(log.details).includes(safeLower(orgFilter));

      const matchesDate =
        !startDate ||
        (log.rawTimestamp &&
          new Date(log.rawTimestamp).getTime() >= startDate.getTime());

      return (
        matchesSearch &&
        matchesRole &&
        matchesAction &&
        matchesOrg &&
        matchesDate
      );
    });
  }, [logs, searchTerm, roleFilter, actionFilter, orgFilter, dateRange]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(
    startIndex,
    startIndex + logsPerPage
  );

  const handleExportLogs = useCallback(
    async (format: 'csv' | 'pdf', range?: DateRangeLocal) => {
      const isCSV = format === 'csv';

      isCSV ? setExportingcsv(true) : setExportingpdf(true);

      try {
        await authorizedRequest(async (token) => {
          const params = new URLSearchParams({
            ...(range?.from && {
              start_date: formatDateStart(range.from),
            }),
            ...(range?.to
              ? { end_date: formatDateEnd(range.to) }
              : range?.from
                ? { end_date: formatDateEnd(range.from) }
                : {}),
          });

          const res = await fetch(
            `https://medilogic-backend.onrender.com/activity-logs/export/${format}?${params.toString()}`,
            {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!res.ok) throw new Error('Export failed');

          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = `activity-logs-${Date.now()}.${format}`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }, `Failed to export ${format.toUpperCase()}`);
      } finally {
        isCSV ? setExportingcsv(false) : setExportingpdf(false);
      }
    },
    [authorizedRequest]
  );
  const exportLogsCSV = async () => {
    try {
      setExportingcsv(true);

      const data = await authorizedRequest(async (validToken) => {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/activity-logs/export/csv',
          {
            headers: { Authorization: `Bearer ${validToken}` },
            responseType: 'blob', // important for file download
            params: {
              // Optional filters — you can wire these up if your backend supports them
              // user_id: 'some-id',
              // organization_id: 'some-org',
              // start_date: ...,
              // end_date: ...
            },
          }
        );

        // Convert blob to downloadable file
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `activity-logs-${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }, 'Failed to export CSV');

      return data;
    } catch (err) {
      console.error('CSV export failed:', err);
      throw err;
    } finally {
      setExportingcsv(false);
    }
  };

  const exportLogsPDF = async () => {
    try {
      setExportingpdf(true);

      const data = await authorizedRequest(async (validToken) => {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/activity-logs/export/pdf',
          {
            headers: { Authorization: `Bearer ${validToken}` },
            responseType: 'blob', // important for file download
            params: {
              // Optional filters if backend supports:
              // user_id: 'some-id',
              // organization_id: 'some-org',
              // start_date: ...,
              // end_date: ...
            },
          }
        );

        // Convert blob to downloadable file
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `activity-logs-${Date.now()}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }, 'Failed to export PDF');

      return data;
    } catch (err) {
      console.error('PDF export failed:', err);
      throw err;
    } finally {
      setExportingpdf(false);
    }
  };

  return {
    logs,
    loading,
    searchTerm,
    setSearchTerm,
    dateRange,
    setDateRange,
    roleFilter,
    setRoleFilter,
    orgFilter,
    setOrgFilter,
    actionFilter,
    setActionFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    filteredLogs,
    paginatedLogs,
    logsPerPage,
    exportingcsv,
    exportLogsCSV,
    exportingpdf,
    exportLogsPDF,
    handleExportLogs,
  };
}
