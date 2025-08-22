// /lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://medilogic-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
