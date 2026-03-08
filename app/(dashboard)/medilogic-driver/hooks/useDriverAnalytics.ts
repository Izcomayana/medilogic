'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { toast } from 'sonner';

type Analytics = {
  profile_views: number;
  org_views: Record<string, number>;
  charts: Record<string, string[]>;
};

export default function useDriverAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  const authorizedRequest = useAuthorizedRequest();

  const fetchAnalytics = async () => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.get<Analytics>('/Medilogic_drivers/driver', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnalytics(res.data);
      }, 'Failed to load analytics');
    } catch {
      toast.error('Unable to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    analytics,
    loading,
    fetchAnalytics,
  };
}
