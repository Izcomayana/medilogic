'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTrips } from '@/hooks/useTrips';
import { Filters } from './components/Filters';
import { TripsTable } from './components/TripsTable';
import { EditTripModal } from './components/EditTrips';
import { TripsDetailModal } from './components/TripsDetails';
import { PageHeader } from '@/app/(dashboard)/PageHeader';

const trips = [
  {
    id: 'TRP001',
    clientOrganization: 'Clinic ABC',
    pickupLocation: '123 Medical Center Dr, Lagos',
    dropoffLocation: '456 Waste Facility Rd, Lagos',
    driverAssigned: 'John Smith',
    status: 'Completed',
    dateTime: '2025-08-22 09:00',
    notes: 'Medical waste pickup - handle with care',
    createdDate: '2025-08-20',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-22 08:00',
        note: 'Trip created',
      },
      {
        status: 'In Progress',
        timestamp: '2025-08-22 09:00',
        note: 'Driver started pickup',
      },
      {
        status: 'Completed',
        timestamp: '2025-08-22 11:30',
        note: 'Waste delivered successfully',
      },
    ],
  },
  {
    id: 'TRP002',
    clientOrganization: 'TechCorp Solutions',
    pickupLocation: '789 Business Park, Abuja',
    dropoffLocation: '321 Recycling Center, Abuja',
    driverAssigned: 'Sarah Johnson',
    status: 'In Progress',
    dateTime: '2025-08-23 14:00',
    notes: 'Electronic waste disposal',
    createdDate: '2025-08-21',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-23 13:30',
        note: 'Trip scheduled',
      },
      {
        status: 'In Progress',
        timestamp: '2025-08-23 14:00',
        note: 'Driver en route to pickup',
      },
    ],
  },
  {
    id: 'TRP003',
    clientOrganization: 'PharmaCare Industries',
    pickupLocation: '555 Pharma Complex, Port Harcourt',
    dropoffLocation: '777 Hazmat Facility, Port Harcourt',
    driverAssigned: 'Mike Davis',
    status: 'Pending',
    dateTime: '2025-08-24 10:00',
    notes: 'Pharmaceutical waste - requires special handling certification',
    createdDate: '2025-08-22',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-22 16:00',
        note: 'Trip scheduled for tomorrow',
      },
    ],
  },
  {
    id: 'TRP004',
    clientOrganization: 'WasteTech Solutions',
    pickupLocation: '999 Industrial Zone, Kano',
    dropoffLocation: '111 Treatment Plant, Kano',
    driverAssigned: 'Lisa Wilson',
    status: 'Cancelled',
    dateTime: '2025-08-21 08:00',
    notes: 'Industrial waste collection',
    createdDate: '2025-08-19',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-19 15:00',
        note: 'Trip created',
      },
      {
        status: 'Cancelled',
        timestamp: '2025-08-21 07:30',
        note: 'Client requested cancellation',
      },
    ],
  },
];

export default function TripsPage() {
  const tripState = useTrips();
  const [, setTripsList] = useState(trips);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  const handleDelete = (tripId: string) => {
    setTripsList((prev) => prev.filter((trip) => trip.id !== tripId));
    setTripToDelete(null);
    toast.success('Trip deleted successfully');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Trips"
        subtitle="Manage waste collection and delivery trips"
      />

      <main className="flex-1 p-6">
        {/* Filters and Controls */}
        <Filters {...tripState} />

        {/* Trips Table */}
        <TripsTable {...tripState} />
      </main>

      {/* Trip Details Modal */}
      <TripsDetailModal {...tripState} />

      {/* Edit Trip Modal */}
      <EditTripModal {...tripState} />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!tripToDelete}
        onOpenChange={() => setTripToDelete(null)}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this trip? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => tripToDelete && handleDelete(tripToDelete)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}