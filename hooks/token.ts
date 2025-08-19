import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return Date.now() >= decoded.exp * 1000;
  } catch (e) {
    return true; // Assume expired if decode fails
  }
};
