'use client';

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';

export type PendingApplication = {
  id: string;
  applicantName: string;
  email: string;
  password: string;
  role: 'Admin' | 'Regulator';
  organizationName?: string | null;
  organizationType?: string | null;
  country?: string | null;
  state?: string | null;
  region?: string | null;
  submittedDate: string;
  notes?: string | null;
  status: 'Pending';
};

export function usePendingApplications() {
  const [applications, setApplications] = useState<PendingApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'admins' | 'regulators'>(
    'all'
  );
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedApplication, setSelectedApplication] =
    useState<PendingApplication | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const authorizedRequest = useAuthorizedRequest();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);

      const data = await authorizedRequest(async (validToken) => {
        const res = await axios.get(
          `https://medilogic-backend.onrender.com/pending-applications`,
          {
            headers: { Authorization: `Bearer ${validToken}` },
          }
        );

        const data: any[] = Array.isArray(res.data) ? res.data : [];

        const mapped: PendingApplication[] = data.map((item: any) => ({
          id: item.id,
          applicantName: item.full_name,
          email: item.email,
          password: item.password,
          role: item.role === 'admin' ? 'Admin' : 'Regulator',
          organizationName: item.organization_name || null,
          organizationType: item.organization_type || null,
          country: item.regulated_country || null,
          state: item.regulated_state || null,
          region: item.regulated_region || null,
          submittedDate: item.submitted_at,
          notes: item.message || null,
          status: 'Pending',
        }));

        return mapped;
      }, 'Failed to load applications');

      if (isMounted) {
        if (data) setApplications(data);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.organizationName &&
          app.organizationName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (app.region &&
          app.region.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'admins' && app.role === 'Admin') ||
        (activeTab === 'regulators' && app.role === 'Regulator');

      return matchesSearch && matchesTab;
    });
  }, [applications, searchTerm, activeTab]);

  const sortedApplications = useMemo(() => {
    return [...filteredApplications].sort((a, b) => {
      if (sortBy === 'newest') {
        return (
          new Date(b.submittedDate).getTime() -
          new Date(a.submittedDate).getTime()
        );
      } else {
        return (
          new Date(a.submittedDate).getTime() -
          new Date(b.submittedDate).getTime()
        );
      }
    });
  }, [filteredApplications, sortBy]);

  const orgAdminCount = applications.filter(
    (app) => app.role === 'Admin'
  ).length;
  const regulatorCount = applications.filter(
    (app) => app.role === 'Regulator'
  ).length;

  const handleViewDetails = (application: PendingApplication) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const handleApprove = (applicationId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== applicationId));
    toast.success('Application approved successfully');
    setIsDetailsModalOpen(false);
  };

  const handleReject = (applicationId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== applicationId));
    toast.success('Application rejected');
    setIsDetailsModalOpen(false);
  };

  return {
    applications,
    loading,
    sortedApplications,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    orgAdminCount,
    regulatorCount,
    selectedApplication,
    setSelectedApplication,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    handleViewDetails,
    handleApprove,
    handleReject,
  };
}
