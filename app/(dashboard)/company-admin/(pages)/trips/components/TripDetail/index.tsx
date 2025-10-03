import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useTrips } from '@/hooks/trips/useTrips';
import {
  MapPin,
  Calendar,
  User,
  Clock,
  Navigation,
  Car,
  Gauge,
  ShieldCheck,
  Flag,
  Repeat,
  PoundSterling,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { formatDateTime } from '@/hooks/utils';
import { getStatusBadge } from '../../badge';
import { formatDateTime } from '@/utils/datetime';

type TripsDetailsProps = ReturnType<typeof useTrips>;

export function TripsDetailModal({
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedTrip,
  // formatDateTime,
}: TripsDetailsProps) {
  if (!selectedTrip) return null;

  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white !max-w-2xl rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <MapPin className="h-5 w-5 text-blue-400" />
            Trip Details
            <span className="text-gray-400 text-sm font-normal">
              #{selectedTrip.id}
            </span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete information about this waste collection trip.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Trip Information + Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
                Trip Information
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 text-sm">Client</Label>
                  <p className="text-white font-medium">
                    {selectedTrip.clientName || '—'}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Driver</Label>
                  <p className="text-white flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {selectedTrip.driverName || 'Unassigned'}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Priority</Label>
                  <Badge
                    className={
                      selectedTrip.priority === 'high'
                        ? 'bg-red-600'
                        : selectedTrip.priority === 'normal'
                          ? 'bg-blue-600'
                          : 'bg-gray-600'
                    }
                  >
                    {selectedTrip.priority || 'normal'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Status</Label>
                  <Badge variant="secondary" className="capitalize">
                    {selectedTrip.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
                Schedule
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 text-sm">
                    Scheduled Time
                  </Label>
                  <p className="text-white flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {selectedTrip.dateTime
                      ? formatDateTime(selectedTrip.dateTime)
                      : 'Not scheduled'}
                  </p>
                </div>

                <div>
                  <Label className="text-gray-400 text-sm">Created Date</Label>
                  <p className="text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {selectedTrip.createdDate
                      ? formatDateTime(selectedTrip.createdDate)
                      : '—'}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Shift Window</Label>
                  <p className="text-white">
                    {selectedTrip.shiftWindow || '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Route Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Route Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <Label className="text-gray-400 text-sm flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-green-500" />
                  Pickup Location
                </Label>
                <p className="text-white mt-1">
                  {selectedTrip.pickupLocation || '—'}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <Label className="text-gray-400 text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Dropoff Location
                </Label>
                <p className="text-white mt-1">
                  {selectedTrip.dropoffLocation || '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Additional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                <Car className="h-5 w-5 text-blue-400" />
                <span>{selectedTrip.vehicleType || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                <PoundSterling className="h-5 w-5 text-green-400" />
                <span>{selectedTrip.cost || '0'}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                <Gauge className="h-5 w-5 text-yellow-400" />
                <span>{selectedTrip.distance || '0'} km</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                <Flag className="h-5 w-5 text-purple-400" />
                <span>{selectedTrip.locationZone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-teal-400" />
                <span>
                  {selectedTrip.complianceFlag ? 'Compliant' : 'Not compliant'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                <Repeat className="h-5 w-5 text-pink-400" />
                <span>{selectedTrip.recurrenceRule || 'none'}</span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          {selectedTrip.statusHistory?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
                Status Timeline
              </h3>
              <div className="space-y-3">
                {selectedTrip.statusHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    {getStatusBadge(entry.status)}
                    <div className="flex flex-col gap-3">
                      <p className="text-white text-sm">{entry.note}</p>
                      <p className="text-gray-400 text-xs">
                        {formatDateTime(entry.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDetailsModalOpen(false)}
            className="rounded-xl text-gray-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
