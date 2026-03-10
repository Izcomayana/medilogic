'use client';

import { TabsContent } from '@radix-ui/react-tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download, Eye, MoreHorizontal } from 'lucide-react';
import { MedilogicTableSkeleton } from './components/Skeleton/index.';
import { useMedilogicDrivers } from './useDrivers';
import DocumentsModal from './components/DocumentsModal';
import DriverDetails from './components/DriverDetails';
import MedilogicFilters from './components/Filters';

export function MedilogicDrivers() {
  const driverState = useMedilogicDrivers();

  const {
    filters,
    setFilters,
    loading,
    drivers,
    fetchSingleDriver,
    viewDocuments,
    driverModalOpen,
    setDriverModalOpen,
    selectedDriver,
  } = driverState;

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
      <MedilogicFilters {...driverState} />

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
      <DriverDetails {...driverState} />

      {/* DOCUMENTS MODAL */}
      <DocumentsModal {...driverState} />
    </TabsContent>
  );
}
