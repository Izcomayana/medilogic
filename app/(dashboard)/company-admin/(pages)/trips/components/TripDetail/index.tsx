import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useTrips } from '@/hooks/useTrips';
import {
  MapPin,
  Edit,
  Calendar,
  User,
  Clock,
  Navigation,
  // CheckCircle,
  // Loader,
  // AlertCircle,
  // XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';

type TripsDetailsProps = ReturnType<typeof useTrips>;

// function getStatusBadge(status: string) {
//   switch (status.toLowerCase()) {
//     case 'completed':
//       return (
//         <Badge className="bg-[#15941f] text-white">
//           <CheckCircle className="h-3 w-3 mr-1" />
//           Completed
//         </Badge>
//       );
//     case 'in progress':
//       return (
//         <Badge variant="secondary" className="bg-blue-600 text-white">
//           <Loader className="h-3 w-3 mr-1" />
//           In Progress
//         </Badge>
//       );
//     case 'pending':
//       return (
//         <Badge variant="secondary" className="bg-yellow-600 text-white">
//           <AlertCircle className="h-3 w-3 mr-1" />
//           Pending
//         </Badge>
//       );
//     case 'cancelled':
//       return (
//         <Badge variant="destructive">
//           <XCircle className="h-3 w-3 mr-1" />
//           Cancelled
//         </Badge>
//       );
//     default:
//       return <Badge variant="outline">{status}</Badge>;
//   }
// }

export function TripsDetailModal({
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedTrip,
  // handleEdit,
  // formatDateTime,
}: TripsDetailsProps) {
  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Trip Details - {selectedTrip?.id}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete information about this waste collection trip.
          </DialogDescription>
        </DialogHeader>

        {selectedTrip && (
          <div className="space-y-6 py-4 max-h-96 overflow-y-auto">
            {/* Trip Metadata */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Trip Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm">Trip ID</Label>
                    <p className="text-white font-medium">{selectedTrip.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Client / Organization
                    </Label>
                    <p className="text-white">
                      {selectedTrip.clientOrganization}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Driver Assigned
                    </Label>
                    <p className="text-white flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {selectedTrip.driverAssigned}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Status</Label>
                    <div className="mt-1">
                      {/* {getStatusBadge(selectedTrip.status)} */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Schedule
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Scheduled Date & Time
                    </Label>
                    <p className="text-white flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {/* {formatDateTime(selectedTrip.dateTime)} */}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Created Date
                    </Label>
                    <p className="text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedTrip.createdDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Route Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <Label className="text-gray-400 text-sm flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-green-500" />
                    Pickup Location
                  </Label>
                  <p className="text-white mt-1">
                    {selectedTrip.pickupLocation}
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <Label className="text-gray-400 text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Dropoff Location
                  </Label>
                  <p className="text-white mt-1">
                    {selectedTrip.dropoffLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {/* {selectedTrip.notes && (
              <div className="space-y-2">
                <Label className="text-gray-400 text-sm">
                  Notes / Special Instructions
                </Label>
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                  <p className="text-gray-300 text-sm">{selectedTrip.notes}</p>
                </div>
              </div>
            )} */}

            {/* Status History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Status Timeline
              </h3>
              <div className="space-y-3">
                {selectedTrip.statusHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      {/* {getStatusBadge(entry.status)} */}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{entry.note}</p>
                      <p className="text-gray-400 text-xs">{entry.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDetailsModalOpen(false)}
          >
            Close
          </Button>
          <Button
            // onClick={() => selectedTrip && handleEdit(selectedTrip)}
            className="primary-button"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
