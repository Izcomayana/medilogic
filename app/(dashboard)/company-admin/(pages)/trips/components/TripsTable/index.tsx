/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  MapPin,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  User,
  Clock,
  Navigation,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { TripsTableSkeleton } from '@/app/(dashboard)/components/Trips/tripSkeleton';
import { getTripStatusBadge } from '@/utils/badge';
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
import { formatDateTime } from '@/utils/datetime';
import { UiTrip } from '@/hooks/trips/mappers';

type TripsTableProps = {
  trips: UiTrip[];
  loading: boolean;

  // pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  startIndex: number;
  tripsPerPage: number;

  // actions (optional)
  handleViewDetails?: (trip: UiTrip) => void;
  handleEdit?: (trip: UiTrip) => void;
  handleQuickStatusUpdate?: (id: string, status: string) => void;
  handleDeleteTrip?: (id: string) => void;

  isClientView?: boolean;
};

export function TripsTable({
  trips,
  handleViewDetails,
  handleEdit,
  handleQuickStatusUpdate,
  handleDeleteTrip,
  totalPages,
  startIndex,
  tripsPerPage,
  currentPage,
  setCurrentPage,
  loading,
  isClientView, // ✅ FIX
}: TripsTableProps) {
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  function getPriorityBadge(priority?: string | null) {
    if (!priority) {
      return (
        <Badge variant="outline" className="text-gray-400 border-gray-600">
          N/A
        </Badge>
      );
    }

    switch (priority.toLowerCase()) {
      case 'urgent':
        return <Badge className="bg-red-600 text-white">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white">High</Badge>;
      case 'normal':
        return <Badge className="bg-green-600 text-white">Normal</Badge>;
      case 'stat':
        return <Badge className="bg-blue-600 text-white">Stat</Badge>;
      default:
        return (
          <Badge variant="outline" className="text-gray-300 border-gray-600">
            {priority}
          </Badge>
        );
    }
  }

  const filteredTrips = trips;
  const paginatedTrips = trips;

  return (
    <>
      <Card className="dashboard-card py-0">
        <CardContent className="p-0">
          {loading ? (
            <TripsTableSkeleton />
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No trips found
              </h3>
              <p className="text-gray-400">
                No trips match your current search and filter criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-300">Driver</TableHead>
                      <TableHead className="text-gray-300">Priority</TableHead>
                      <TableHead className="text-gray-300">Route</TableHead>
                      <TableHead className="text-gray-300">
                        Date & Time
                      </TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTrips.map((trip) => (
                      <TableRow
                        key={trip.id}
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        <TableCell className="text-gray-300 flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {trip.driverName && trip.driverName.trim() !== '' ? (
                            trip.driverName
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-gray-400 border-gray-600"
                            >
                              Unassigned
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getPriorityBadge(trip.priority)}</TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm flex items-center gap-1">
                              <Navigation className="h-3 w-3 text-green-500" />
                              {trip.pickupLocation
                                ? trip.pickupLocation.split(',')[0]
                                : 'N/A'}
                            </span>
                            <span className="text-sm flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-red-500" />
                              {trip.dropoffLocation
                                ? trip.dropoffLocation.split(',')[0]
                                : 'N/A'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDateTime(trip.dateTime)}
                          </div>
                        </TableCell>
                        <TableCell>{getTripStatusBadge(trip.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-700"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                align="end"
                                className="bg-gray-700 border-gray-600"
                              >
                                {!isClientView && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => handleViewDetails?.(trip)}
                                      className="text-gray-300 hover:bg-gray-600"
                                    >
                                      <Eye className="h-3 w-3 mr-1" />
                                      View
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                      onClick={() => handleEdit?.(trip)}
                                      className="text-gray-300 hover:bg-gray-600"
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit Trip
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleQuickStatusUpdate?.(
                                          trip.id,
                                          'completed'
                                        )
                                      }
                                      disabled={trip.status === 'completed'}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Mark Complete
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleQuickStatusUpdate?.(
                                          trip.id,
                                          'cancelled'
                                        )
                                      }
                                      disabled={trip.status === 'cancelled'}
                                    >
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Cancel Trip
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                      className="text-red-400"
                                      onClick={() => setTripToDelete(trip.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 px-6 pb-6">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1}-
                    {Math.min(startIndex + tripsPerPage, filteredTrips.length)}{' '}
                    of {filteredTrips.length}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!tripToDelete}
        onOpenChange={(open) => !open && setTripToDelete(null)} // reset when closed
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
            <AlertDialogCancel className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!handleDeleteTrip) return;
                if (tripToDelete) handleDeleteTrip(tripToDelete); // ✅ use state value
                setTripToDelete(null); // close modal after action
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
