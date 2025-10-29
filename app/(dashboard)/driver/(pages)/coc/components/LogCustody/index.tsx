'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
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
import { MapPin, Loader, FileUp } from 'lucide-react';
import { useCOC } from '@/app/(dashboard)/driver/hooks/useCoc';
import { formatDateTime } from '@/utils/datetime';

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
  driverTrips,
  loadingTrips,
  formatFileSize,
}: ReturnType<typeof useCOC>) {
  return (
    <AlertDialog open={showLogModal} onOpenChange={setShowLogModal}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 lg:max-w-2xl max-h-[90vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Log Custody Event
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Record a new custody transfer for a trip
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* 🧩 Make the form flex + scrollable */}
        <form
          onSubmit={handleSubmitEvent}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {/* Trip Selection */}
            <div>
              <Label className="text-gray-300 text-sm mb-2">Trip *</Label>
              <Select
                value={formData.tripId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, tripId: value }))
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white overflow-hidden">
                  <SelectValue
                    placeholder={
                      loadingTrips ? 'Loading trips...' : 'Select a trip'
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {driverTrips.length > 0 ? (
                    driverTrips.map((trip) => {
                      const formattedType =
                        trip.delivery_type === 'other'
                          ? trip.custom_delivery_description || 'Other'
                          : trip.delivery_type
                              ?.replaceAll('_', ' ')
                              .replace(/\b\w/g, (l: string) =>
                                l.toUpperCase()
                              ) || 'Unknown Type';

                      return (
                        <SelectItem key={trip.trip_id} value={trip.trip_id}>
                          {`${trip.client_name || 'Unknown Client'} — ${formattedType} — ${formatDateTime(trip.scheduled_time)}`}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <div className="text-gray-400 text-sm p-2">
                      No trips assigned yet
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

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
                      {type.replaceAll('_', ' ')}
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
                  setFormData((prev) => ({
                    ...prev,
                    timestamp: e.target.value,
                  }))
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
                  placeholder="Enter or use GPS"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
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
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="bg-gray-700 border-gray-600 text-white min-h-24"
              />
            </div>

            {/* Signed By */}
            <div>
              <Label className="text-gray-300 text-sm mb-2">Signed By</Label>
              <Input
                type="text"
                placeholder="Person who signed"
                value={formData.signedBy}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, signedBy: e.target.value }))
                }
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* Witness Name */}
            <div>
              <Label className="text-gray-300 text-sm mb-2">Witness Name</Label>
              <Input
                type="text"
                placeholder="Witness present during custody"
                value={formData.witnessName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    witnessName: e.target.value,
                  }))
                }
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* Signature Upload */}
            <div>
              <Label className="text-gray-300 text-sm mb-2">
                Signature Image
              </Label>

              <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-4 text-center bg-gray-700/50 hover:bg-gray-700 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      signatureImage: e.target.files ? e.target.files[0] : null,
                    }))
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <FileUp className="h-6 w-6 text-gray-400 mb-2" />
                  {formData.signatureImage ? (
                    <p className="text-sm text-white">
                      {formData.signatureImage.name}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Click or drag to upload
                    </p>
                  )}
                </div>
              </div>

              {formData.signatureImage && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, signatureImage: null }))
                  }
                  className="mt-2 text-gray-700 hover:text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white text-sm p-2 !py-0"
                >
                  Clear signature image
                </Button>
              )}
            </div>

            {/* File Upload */}
            <div>
              <Label className="text-gray-300 text-sm mb-2">Attachments</Label>

              <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700/50 hover:bg-gray-700 transition">
                {/* The actual file input */}
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files || []);
                    setFormData((prev) => {
                      const existing = prev.files || [];
                      const uniqueFiles = newFiles.filter(
                        (file) =>
                          !existing.some(
                            (f) => f.name === file.name && f.size === file.size
                          )
                      );
                      return {
                        ...prev,
                        files: [...existing, ...uniqueFiles],
                      };
                    });
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />

                <div className="relative z-0 pointer-events-none">
                  <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />

                  {formData.files && formData.files.length > 0 ? (
                    <div className="space-y-1">
                      {formData.files.map((file, i) => (
                        <div key={i} className="text-sm text-white font-medium">
                          <p>{file.name}</p>
                          <p className="text-xs text-gray-400">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-300">
                        Click or drag to upload files
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PDF, JPG, PNG, DOC up to 10MB each
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Move Clear Button OUTSIDE so it's clickable */}
              {formData.files && formData.files.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ ...formData, files: [] })}
                  className="mt-3 text-gray-700 border-gray-600 hover:text-white hover:bg-gray-700"
                >
                  Clear files
                </Button>
              )}
            </div>
          </div>
          {/* Footer stays sticky below */}
          <AlertDialogFooter className="pt-4 mt-4 border-t border-gray-700 flex-shrink-0">
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
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
