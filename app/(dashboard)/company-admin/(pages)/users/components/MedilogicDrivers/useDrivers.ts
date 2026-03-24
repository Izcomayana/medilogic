import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

type DriverDocument = {
  id: string;
  filename: string;
  upload_time: string;
  file_url?: string;
};

type MedilogicDriver = {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  country: string | null;
  experience_years: number | null;
  status: string;
  subscription_plan: string;
  created_at: string;
  documents: DriverDocument[];
};

type Filters = {
  search: string;
  status: string;
  min_experience: string;
};

export function useMedilogicDrivers() {
  const [drivers, setDrivers] = useState<MedilogicDriver[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: '',
    min_experience: '',
  });

  const authorizedRequest = useAuthorizedRequest();

  const fetchDrivers = async () => {
    setLoading(true);

    await authorizedRequest(async (token) => {
      const res = await api.get('/Medilogic_drivers/', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...(filters.search && { search: filters.search }),
          ...(filters.status && { status: filters.status }),
          ...(filters.min_experience && {
            min_experience: filters.min_experience,
          }),
          page,
          page_size: 10,
        },
      });

      console.log('result:', res.data.results);

      setDrivers(res.data.results);
      setTotal(res.data.total);
      setPage(res.data.page);
    }, 'failed to fetch drivers');

    setLoading(false);
  };

  const fetchSingleDriver = async (id: string) => {
    await authorizedRequest(async (token) => {
      const res = await api.get(`/Medilogic_drivers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedDriver(res.data);
      setDriverModalOpen(true);
    }, 'failed to fetch driver');
  };

  useEffect(() => {
    fetchDrivers();
  }, [filters]);

  const viewDocuments = async (id: string) => {
    await authorizedRequest(async (token) => {
      const res = await api.get(`/Medilogic_drivers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedDriver(res.data);
      setDocumentsModalOpen(true);
    }, 'failed to get doc');
  };

  return {
    filters,
    setFilters,
    loading,
    drivers,
    fetchSingleDriver,
    viewDocuments,
    driverModalOpen,
    setDriverModalOpen,
    selectedDriver,
    documentsModalOpen,
    setDocumentsModalOpen,
  };
}
