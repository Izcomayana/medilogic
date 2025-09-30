import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthorizedRequest } from '@/hooks/useRequest';

interface Driver {
  id: string;
  name: string;
}

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const authorizedRequest = useAuthorizedRequest();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    authorizedRequest(async (token) => {
      const res = await axios.get(
        'https://medilogic-backend.onrender.com/admin/users',
        {
          params: { role: 'driver', is_active: true, limit: 100 },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (isMounted) {
        const mapped = res.data.map((u: any) => ({
          id: u.id,
          name: u.name,
        }));
        setDrivers(mapped);
      }
    }, 'Failed to fetch drivers').finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  return { drivers, loading };
}
