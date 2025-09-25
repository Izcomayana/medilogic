/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTrips } from '@/hooks/trips/useTrips';
import { X } from 'lucide-react';

type EditTripProps = ReturnType<typeof useTrips>;

export function EditTripModal({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedTrip,
  formData,
  setFormData,
  loading,
  resetForm,
  handleUpdateTrip,
}: EditTripProps) {
  return (
    <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white !max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>Edit Trip - {selectedTrip?.id}</AlertDialogTitle>
            <AlertDialogCancel
              className="text-gray-700"
              onClick={() => setIsEditModalOpen(false)}
            >
              <X />
            </AlertDialogCancel>
          </div>

          <AlertDialogDescription className="text-gray-400">
            Update trip information and status.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Driver & Client Name */}
            <div>
              <Label htmlFor="client" className="text-gray-300">
                Client Name
              </Label>
              <Input
                id="client"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                placeholder="Enter client name"
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="driver" className="text-gray-300">
                Driver Name
              </Label>
              <Input
                id="driver"
                value={formData.driverName}
                onChange={(e) =>
                  setFormData({ ...formData, driverName: e.target.value })
                }
                placeholder="Enter driver name"
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            {/* Delivery Type */}
            <div className="">
              <Label className="text-gray-300">Delivery Type</Label>
              <Select
                value={formData.deliveryType}
                onValueChange={(value) =>
                  setFormData({ ...formData, deliveryType: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                  <SelectValue placeholder="Select type of delivery" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="clinical_waste">Clinical Waste</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="samples">Samples</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {/* If "Other" → show text area */}
              {formData.deliveryType === 'other' && (
                <div className="mt-3">
                  <Label className="block text-sm font-medium mb-1">
                    Custom Delivery Description
                  </Label>
                  <Textarea
                    value={formData.customDeliveryDescription}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        customDeliveryDescription: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                    rows={2}
                    placeholder="Enter custom delivery details..."
                  />
                </div>
              )}
            </div>

            {/* Priority */}
            <div>
              <Label htmlFor="priority" className="text-gray-300">
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="stat">Stat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pickup + Dropoff */}
          <div>
            <Label htmlFor="pickup" className="text-gray-300">
              Pickup Address
            </Label>
            <Input
              id="pickup"
              value={formData.pickupLocation}
              onChange={(e) =>
                setFormData({ ...formData, pickupLocation: e.target.value })
              }
              placeholder="Enter pickup location"
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>
          <div>
            <Label htmlFor="dropoff" className="text-gray-300">
              Dropoff Address
            </Label>
            <Input
              id="dropoff"
              value={formData.dropoffLocation}
              onChange={(e) =>
                setFormData({ ...formData, dropoffLocation: e.target.value })
              }
              placeholder="Enter dropoff location"
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          {/* DateTime & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="datetime" className="text-gray-300">
                Trip Date & Time
              </Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) =>
                  setFormData({ ...formData, dateTime: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="status" className="text-gray-300">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cost + Distance */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cost" className="text-gray-300">
                Cost
              </Label>
              <Input
                id="cost"
                type="number"
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: e.target.value })
                }
                placeholder="Enter cost"
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="distanceKm" className="text-gray-300">
                Distance (km)
              </Label>
              <Input
                id="distanceKm"
                type="number"
                value={formData.distanceKm}
                onChange={(e) =>
                  setFormData({ ...formData, distanceKm: e.target.value })
                }
                placeholder="Enter distance in km"
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
          </div>

          {/* Vehicle + Zone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicleType" className="text-gray-300">
                Vehicle Type
              </Label>
              <Input
                id="vehicleType"
                value={formData.vehicleType}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleType: e.target.value })
                }
                placeholder="Enter vehicle type"
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="locationZone" className="text-gray-300">
                Location Zone
              </Label>
              <Input
                id="locationZone"
                value={formData.locationZone}
                onChange={(e) =>
                  setFormData({ ...formData, locationZone: e.target.value })
                }
                placeholder="Enter location zone"
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
          </div>

          {/* Shift + Compliance + Recurrence */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="shiftWindow" className="text-gray-300">
                Shift Window
              </Label>
              <Input
                id="shiftWindow"
                value={formData.shiftWindow}
                onChange={(e) =>
                  setFormData({ ...formData, shiftWindow: e.target.value })
                }
                placeholder="Enter shift window"
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="complianceFlag" className="text-gray-300">
                Compliance
              </Label>
              <Select
                value={String(formData.complianceFlag)}
                onValueChange={(value) =>
                  setFormData({ ...formData, complianceFlag: value === 'true' })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="recurrenceRule" className="text-gray-300">
                Recurrence
              </Label>
              <Select
                value={formData.recurrenceRule}
                onValueChange={(value) =>
                  setFormData({ ...formData, recurrenceRule: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                  <SelectValue placeholder="Select recurrence" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-gray-300">
              Notes / Special Instructions
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Enter any special instructions or notes"
              className="bg-gray-700 border-gray-600 text-white mt-2"
              rows={3}
            />
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditModalOpen(false);
              resetForm();
            }}
            className="text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateTrip}
            disabled={loading}
            className="primary-button"
          >
            {loading ? 'Updating...' : 'Update Trip'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
