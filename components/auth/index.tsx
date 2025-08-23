/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any;
  role: string | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  logout: () => void;
  setToken: (token: string | null) => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _token = localStorage.getItem('authToken');
    const _refresh = localStorage.getItem('refreshToken');
    const _role = localStorage.getItem('userRole');

    setTokenState(_token);
    setRefreshToken(_refresh);
    setRole(_role);
    setLoading(false);
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) localStorage.setItem('authToken', newToken);
    else localStorage.removeItem('authToken');
  };

  const logout = () => {
    localStorage.clear();
    setTokenState(null);
    setRefreshToken(null);
    setRole(null);
    window.location.href = '/login';
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await axios.post(
        'https://medilogic-backend.onrender.com/access/refresh-token',
        JSON.stringify(refreshToken),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const newToken = response.data.access_token;
      setToken(newToken);

      if (response.data.refresh_token) {
        setRefreshToken(response.data.refresh_token);
        localStorage.setItem('refreshToken', response.data.refresh_token);
      }

      return newToken; // ✅ return token
    } catch (err) {
      console.error('Token refresh failed', err);
      logout();
      return null;
    }
  };

  useEffect(() => {
    console.log('AuthProvider mounted');
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        refreshToken,
        isLoggedIn: !!token,
        user: null,
        logout,
        setToken,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
