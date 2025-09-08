import { Card, CardContent } from '@/components/ui/card';
import { useTrips } from '@/hooks/useTrips/useTrips';
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
  Loader,
  AlertCircle,
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
import { TripsTableSkeleton } from './tripSkeleton';

type TableProps = ReturnType<typeof useTrips>;

export function TripsTable({
  filteredTrips,
  paginatedTrips,
  formatDateTime,
  handleViewDetails,
  // handleEdit,
  handleQuickStatusUpdate,
  handleDeleteTrip,
  totalPages,
  startIndex,
  tripsPerPage,
  currentPage,
  setCurrentPage,
  loading,
}: TableProps) {
  function getStatusBadge(status: string) {
    switch (status.toLowerCase()) {
      case 'completed':
        return (
          <Badge className="bg-[#15941f] text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'in progress':
        return (
          <Badge variant="secondary" className="bg-blue-600 text-white">
            <Loader className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-600 text-white">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

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
      case 'low':
        return <Badge className="bg-blue-600 text-white">Low</Badge>;
      default:
        return (
          <Badge variant="outline" className="text-gray-300 border-gray-600">
            {priority}
          </Badge>
        );
    }
  }

  return (
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
                    {/* <TableHead className="text-gray-300">Trip ID</TableHead> */}
                    {/* <TableHead className="text-gray-300">
                      Organization
                    </TableHead> */}
                    <TableHead className="text-gray-300">Driver</TableHead>
                    <TableHead className="text-gray-300">Priority</TableHead>
                    <TableHead className="text-gray-300">Route</TableHead>
                    <TableHead className="text-gray-300">Date & Time</TableHead>
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
                      {/* <TableCell className="font-medium text-white">
                        {trip.id}
                      </TableCell> */}
                      {/* <TableCell className="text-gray-300">
                        {trip.clientOrganization}
                      </TableCell> */}
                      <TableCell className="text-gray-300 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {trip.driverAssigned &&
                        trip.driverAssigned.trim() !== '' ? (
                          trip.driverAssigned
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
                      <TableCell>{getStatusBadge(trip.status)}</TableCell>
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
                              <DropdownMenuItem
                                onClick={() => handleViewDetails(trip)}
                                className="text-gray-300 hover:bg-gray-600"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-600"
                                // onClick={() => handleEdit(trip)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Trip
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-600"
                                onClick={() =>
                                  handleQuickStatusUpdate(trip.id, 'Completed')
                                }
                                disabled={trip.status === 'Completed'}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Complete
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 hover:bg-gray-600"
                                onClick={() => handleDeleteTrip(trip.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
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
                  {Math.min(startIndex + tripsPerPage, filteredTrips.length)} of{' '}
                  {filteredTrips.length}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
  );
}
