'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthorizedRequest } from '@/hooks/useRequest';

type UserProfile = {
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  organization: {
    id: string | null;
    name: string | null;
    address: string | null;
    phone_number: string | null;
    license_number: string | null;
    ico_registered: boolean;
    data_retention_years: string | null;
    invite_code: string;
  };
};

export function useProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const authorizedRequest = useAuthorizedRequest();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);

      const data = await authorizedRequest(async (validToken) => {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/profile',
          {
            headers: { Authorization: `Bearer ${validToken}` },
          }
        );

        return res.data as UserProfile;
      }, 'Failed to load organization info');

      if (isMounted) {
        if (data) setUser(data);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  return { user, loading };
}
