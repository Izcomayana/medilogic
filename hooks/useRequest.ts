import { useAuth } from '@/components/auth';
import { useCallback } from 'react';
import { isTokenExpired } from './token';
import { toast } from 'sonner';

export const useAuthorizedRequest = () => {
  const { token, refreshAccessToken } = useAuth();

  return useCallback(
    async <T>(
      requestFn: (validToken: string) => Promise<T>,
      errorMessage: string
    ): Promise<T | null> => {
      try {
        let validToken = token;
        if (!validToken || isTokenExpired(validToken)) {
          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            toast.error('Authentication expired. Please log in again.');
            return null;
          }
          validToken = refreshed;
        }
        return await requestFn(validToken);
      } catch (err: any) {
        const msg = err?.response?.data?.detail || err.message || errorMessage;
        toast.error(msg);
        return null;
      }
    },
    [token, refreshAccessToken]
  );
};
