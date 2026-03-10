'use client';

import { TabsContent } from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

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
  experience_years: number | null;
  status: string;
  subscription_plan: string;
  created_at: string;
  documents: DriverDocument[];
};

type Filters = {
  country: string;
  status: string;
  min_experience: string;
};

export function MedilogicDrivers() {
  const [drivers, setDrivers] = useState<MedilogicDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    country: '',
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
          ...(filters.country && { country: filters.country }),
          ...(filters.status && { status: filters.status }),
          ...(filters.min_experience && {
            min_experience: filters.min_experience,
          }),
        },
      });

      setDrivers(res.data);
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

  const getPlanBadge = (plan: string) => {
    const styles: Record<string, string> = {
      free: 'bg-gray-600 text-white',
      green: 'bg-green-600 text-white',
      blue: 'bg-blue-500 text-black',
      premium: 'bg-purple-600 text-white',
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          styles[plan] || 'bg-gray-700'
        }`}
      >
        {plan}
      </span>
    );
  };

  return (
    <TabsContent value="medilogic-drivers" className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 mt-4">
        <Select
          value={filters.status}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, status: value }))
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.country}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, country: value }))
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nigeria">Nigeria</SelectItem>
            <SelectItem value="UK">UK</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.min_experience}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              min_experience: value,
            }))
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1+ Years</SelectItem>
            <SelectItem value="3">3+ Years</SelectItem>
            <SelectItem value="5">5+ Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && <MedilogicTableSkeleton />}

      {!loading && drivers.length === 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <Table>
            <TableHeader className="bg-gray-800 text-gray-200">
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="px-4 py-3">Name</TableHead>
                <TableHead className="px-4 py-3">Email</TableHead>
                <TableHead className="px-4 py-3">Country</TableHead>
                <TableHead className="px-4 py-3">Plan</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <p className="text-gray-400">No drivers found.</p>
            </TableBody>
          </Table>
        </div>
      )}

      {!loading && drivers.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <Table>
            <TableHeader className="bg-gray-800 text-gray-200">
              <TableRow>
                <TableHead className="text-gray-200">Name</TableHead>
                <TableHead className="text-gray-200">Email</TableHead>
                <TableHead className="text-gray-200">Country</TableHead>
                <TableHead className="text-gray-200">Plan</TableHead>
                <TableHead className="text-right text-gray-200">
                  Actions
                </TableHead>
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

                  <TableCell className="px-4 py-3">{driver.email}</TableCell>

                  <TableCell className="px-4 py-3">
                    {driver.country ?? '-'}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {getPlanBadge(driver.subscription_plan)}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => fetchSingleDriver(driver.id)}
                        >
                          View Driver
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => viewDocuments(driver.id)}
                        >
                          View Documents
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* DRIVER DETAILS MODAL */}

      <AlertDialog open={driverModalOpen} onOpenChange={setDriverModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Driver Details</AlertDialogTitle>
          </AlertDialogHeader>

          {selectedDriver && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedDriver.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedDriver.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedDriver.phone_number ?? '-'}
              </p>
              <p>
                <strong>Country:</strong> {selectedDriver.country ?? '-'}
              </p>
              <p>
                <strong>Vehicle:</strong> {selectedDriver.vehicle_type ?? '-'}
              </p>
              <p>
                <strong>Experience:</strong>{' '}
                {selectedDriver.experience_years ?? 0} yrs
              </p>
              <p>
                <strong>Status:</strong> {selectedDriver.status}
              </p>
            </div>
          )}

          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>

      {/* DOCUMENTS MODAL */}

      <AlertDialog
        open={documentsModalOpen}
        onOpenChange={setDocumentsModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Driver Documents</AlertDialogTitle>
          </AlertDialogHeader>

          {selectedDriver?.documents?.length === 0 && (
            <p className="text-gray-400 text-sm">
              This driver has not uploaded any documents yet.
            </p>
          )}

          {selectedDriver?.documents?.length > 0 && (
            <div className="space-y-2">
              {selectedDriver.documents.map((doc: any) => (
                <div key={doc.id} className="border rounded p-2 text-sm">
                  {doc.filename}
                </div>
              ))}
            </div>
          )}

          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </TabsContent>
  );
}
