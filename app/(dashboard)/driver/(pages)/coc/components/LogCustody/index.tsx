'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Loader } from 'lucide-react';
import { useCOC } from '@/app/(dashboard)/driver/hooks/useCoc';

export function LogCustodyEventModal({
  showLogModal,
  setShowLogModal,
  handleSubmitEvent,
  handleGetLocation,
  eventTypes,
  formData,
  setFormData,
  isLoadingLocation,
  isSubmitting,
  selectedTrip,
}: ReturnType<typeof useCOC>) {
  return (
    <Dialog open={showLogModal} onOpenChange={() => setShowLogModal(false)}>
      <DialogContent className="bg-gray-800 border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Log Custody Event</DialogTitle>
          <DialogDescription className="text-gray-400">
            Record a new custody transfer for {selectedTrip}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitEvent} className="space-y-4">
          {/* Event Type */}
          <div>
            <Label className="text-gray-300 text-sm mb-2">Event Type</Label>
            <Select
              value={formData.eventType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, eventType: value }))
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-white">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timestamp */}
          <div>
            <Label className="text-gray-300 text-sm mb-2">Timestamp</Label>
            <Input
              type="datetime-local"
              value={formData.timestamp}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, timestamp: e.target.value }))
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Location */}
          <div>
            <Label className="text-gray-300 text-sm mb-2">Location</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter location or use GPS"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="bg-gray-700 border-gray-600 text-white flex-1"
              />
              <Button
                type="button"
                onClick={handleGetLocation}
                disabled={isLoadingLocation}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 bg-transparent"
              >
                {isLoadingLocation ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-gray-300 text-sm mb-2">Notes</Label>
            <Textarea
              placeholder="Add any additional notes (optional)"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="bg-gray-700 border-gray-600 text-white min-h-24"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={() => setShowLogModal(false)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? 'Logging...' : 'Log Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
