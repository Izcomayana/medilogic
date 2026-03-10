'use client';

import { TabsContent } from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MedilogicTableSkeleton } from './Skeleton';

type DriverDocument = {
  id: string;
  filename: string;
  upload_time: string;
};

type MedilogicDriver = {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  country: string | null;
  vehicle_type: string | null;
  preferred_role: string | null;
  experience_years: number | null;
  status: string;
  subscription_plan: string;
  created_at: string;
  documents: DriverDocument[];
};

export function MedilogicDrivers() {
  const [drivers, setDrivers] = useState<MedilogicDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const authorizedRequest = useAuthorizedRequest();

  const fetchDrivers = async () => {
    try {
       await authorizedRequest(async (token) => {
      const res = await api.get('/Medilogic_drivers/', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
      });
      const data = res.data;
      setDrivers(data);
       }, 'failed to get medilogic drivers')
    } catch (err) {
      console.error('Failed to fetch drivers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <TabsContent value="medilogic-drivers" className="space-y-6">

      {loading && (
        <MedilogicTableSkeleton />
      )}

      {!loading && drivers.length === 0 && (
        <p className="text-gray-400">No drivers found.</p>
      )}

      {!loading && drivers.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <Table>
            <TableHeader className="bg-gray-800 text-gray-200">
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="text-gray-200 px-4 py-3">Name</TableHead>
                <TableHead className="text-gray-200 px-4 py-3">Email</TableHead>
                <TableHead className="text-gray-200 px-4 py-3">Country</TableHead>
                <TableHead className="text-gray-200 px-4 py-3">Plan</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {drivers.map((driver) => (
                <TableRow
                  key={driver.id}
                  className="border-t border-gray-700 hover:bg-gray-800"
                >
                  <TableCell className="px-4 py-3 font-medium text-white">
                    {driver.name}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {driver.email}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {driver.country ?? '-'}
                  </TableCell>

                  <TableCell className="px-4 py-3 capitalize">
                    {driver.subscription_plan}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </TabsContent>
  );
}