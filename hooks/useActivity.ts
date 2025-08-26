'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { format } from 'date-fns';

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
  };
}

// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { useAuthorizedRequest } from '@/hooks/useRequest';
// import { format } from "date-fns";

// export type ActivityLog = {
//   id: string;
//   user: string;
//   role: string;
//   action: string;
//   details: string;
//   ipAddress: string;
//   location: string;
//   timestamp: string;
// };

// export type DateRangeFilter = 'all' | 'today' | 'week' | 'month';

// export function useActivityLogs(logsPerPage = 20) {
//   const [logs, setLogs] = useState<ActivityLog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dateRange, setDateRange] = useState<DateRangeFilter>('all');
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [orgFilter, setOrgFilter] = useState('all');
//   const [actionFilter, setActionFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);

//   const formatDate = (iso: string) => {
//     return format(new Date(iso), "yyyy-MM-dd HH:mm"); // Example: 2025-08-22 14:32
//   }

//   const truncate = (text: string, max = 40) => {
//     return text.length > max ? text.slice(0, max) + "..." : text;
//   }

//   const authorizedRequest = useAuthorizedRequest();

//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);

//     authorizedRequest(
//       async (validToken) => {
//         const res = await axios.get(
//           "https://medilogic-backend.onrender.com/activity-logs",
//           { headers: { Authorization: `Bearer ${validToken}` } }
//         );

//         if (!isMounted) return null;

//         return res.data.map((log: any) => ({
//           id: log.id,
//           action: log.action,
//           user: log.user,
//           timestamp: formatDate(log.timestamp),
//           details: truncate(log.details),
//         }));
//       },
//       "Failed to load activity logs"
//     ).then((data) => {
//       if (data && isMounted) setLogs(data);
//       setLoading(false);
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, [authorizedRequest]);

//   // ✅ Filtering
//   const filteredLogs = useMemo(() => {
//     return logs.filter((log) => {
//       const matchesSearch =
//         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         log.details.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesRole =
//         roleFilter === 'all' ||
//         log.role.toLowerCase() === roleFilter.toLowerCase();
//       const matchesAction =
//         actionFilter === 'all' ||
//         log.action.toLowerCase().includes(actionFilter.toLowerCase());
//       const matchesOrg =
//         orgFilter === 'all' ||
//         log.details.toLowerCase().includes(orgFilter.toLowerCase());

//       return matchesSearch && matchesRole && matchesAction && matchesOrg;
//     });
//   }, [logs, searchTerm, roleFilter, actionFilter, orgFilter]);

//   // ✅ Pagination
//   const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
//   const startIndex = (currentPage - 1) * logsPerPage;
//   const paginatedLogs = filteredLogs.slice(
//     startIndex,
//     startIndex + logsPerPage
//   );

//   return {
//     logs,
//     loading,
//     searchTerm,
//     setSearchTerm,
//     dateRange,
//     setDateRange,
//     roleFilter,
//     setRoleFilter,
//     orgFilter,
//     setOrgFilter,
//     actionFilter,
//     setActionFilter,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     startIndex,
//     filteredLogs,
//     paginatedLogs,
//     logsPerPage,
//   };
// }
