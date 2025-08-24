'use client';

import { useState, useMemo } from 'react';
import { activityLogs } from '@/app/(dashboard)/super-admin/(pages)/activity-logs/activity';

export function useActivityLogs(logsPerPage = 20) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === 'all' ||
        log.role.toLowerCase() === roleFilter.toLowerCase();
      const matchesAction =
        actionFilter === 'all' ||
        log.action.toLowerCase().includes(actionFilter.toLowerCase());
      const matchesOrg =
        orgFilter === 'all' ||
        log.details.toLowerCase().includes(orgFilter.toLowerCase());

      return matchesSearch && matchesRole && matchesAction && matchesOrg;
    });
  }, [searchTerm, roleFilter, actionFilter, orgFilter]);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(
    startIndex,
    startIndex + logsPerPage
  );

  return {
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
