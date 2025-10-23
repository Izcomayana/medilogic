/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDrivers } from './useDrivers';
import { useSysConfig } from '@/hooks/settings/useSysConfg';

export default function TripForm({ formData, setFormData }: any) {
  const { drivers, loading } = useDrivers();
  const {
    isLoadingPriorityLevels,
    priorityLevels,
    isLoadingVehicleTypes,
    vehicleTypes,
    isLoadingShiftWindows,
    shiftWindows,
    isLoadingZones,
    zones,
  } = useSysConfig();

  return (
    <>
      {/* 🔽 Scrollable form section */}
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

          {/* Driver Assigned Dropdown */}
          <div>
            <Label htmlFor="driverAssigned" className="text-gray-300">
              Assign Driver
            </Label>
            <Select
              value={formData.driverId}
              onValueChange={(value) => {
                const selectedDriver = drivers.find((d) => d.id === value);
                setFormData({
                  ...formData,
                  driverId: value,
                  driverName: selectedDriver ? selectedDriver.name : '',
                });
              }}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                <SelectValue
                  placeholder={loading ? 'Loading drivers...' : 'Select driver'}
                />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {drivers.length > 0 ? (
                  drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm p-2 italic">
                    No drivers found <br /> kindly register a driver first.
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Driver Name */}
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

          {/* Priority */}
          <div>
            <Label htmlFor="priority" className="text-gray-300">
              Priority
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => {
                const selectedPriority = priorityLevels.find(
                  (d) => d.name === value
                );

                setFormData({
                  ...formData,
                  // convert to lowercase for the backend
                  priority: value,
                  // keep the display name (capitalized, etc.)
                  priorityName: selectedPriority ? selectedPriority.name : '',
                });
              }}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                <SelectValue
                  placeholder={
                    isLoadingPriorityLevels
                      ? 'Loading priorities...'
                      : 'Select priority'
                  }
                />
              </SelectTrigger>

              <SelectContent className="bg-gray-700 border-gray-600">
                {priorityLevels.length > 0 ? (
                  priorityLevels.map((priority) => (
                    <SelectItem
                      key={priority.id}
                      value={priority.name.toLowerCase()}
                    >
                      {priority.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm p-2 italic">
                    No priority levels found <br /> add one in your System
                    Config.
                  </div>
                )}
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Canceled</SelectItem>
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
                setFormData({ ...formData, cost: Number(e.target.value) })
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
              type="text"
              value={formData.distanceKm}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  distanceKm: Number(e.target.value),
                })
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
            <Select
              value={formData.vehicleType}
              onValueChange={(value) => {
                const selectedVehicle = vehicleTypes.find(
                  (v) => v.name === value
                );
                setFormData({
                  ...formData,
                  vehicleType: value,
                  vehicleTypeName: selectedVehicle ? selectedVehicle.name : '',
                });
              }}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                <SelectValue
                  placeholder={
                    isLoadingVehicleTypes
                      ? 'Loading vehicles...'
                      : 'Select vehicle'
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {vehicleTypes.length > 0 ? (
                  vehicleTypes.map((vehicle) => (
                    <SelectItem
                      key={vehicle.id}
                      value={vehicle.name.toLowerCase()}
                    >
                      {vehicle.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm p-2 italic">
                    No vehicle levels found <br /> add one in your System
                    Config.
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="locationZone" className="text-gray-300">
              Location Zone
            </Label>
            <Select
              value={formData.locationZone}
              onValueChange={(value) => {
                const selectedZones = zones.find((z) => z.name === value);
                setFormData({
                  ...formData,
                  zone: value,
                  zoneName: selectedZones ? selectedZones.name : '',
                });
              }}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                <SelectValue
                  placeholder={
                    isLoadingZones ? 'Loading zones...' : 'Select zone'
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {zones.length > 0 ? (
                  zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.name.toLowerCase()}>
                      {zone.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm p-2 italic">
                    No zone found <br /> add one in your System Config.
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Shift + Compliance + Recurrence */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="shiftWindow" className="text-gray-300">
              Shift Window
            </Label>
            <Select
              value={formData.shiftWindow}
              onValueChange={(value) => {
                const selectedVehicle = shiftWindows.find(
                  (s) => s.name === value
                );
                setFormData({
                  ...formData,
                  shiftWindow: value,
                  shiftWindowName: selectedVehicle ? selectedVehicle.name : '',
                });
              }}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                <SelectValue
                  placeholder={
                    isLoadingShiftWindows ? 'Loading shifts...' : 'Select shift'
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {shiftWindows.length > 0 ? (
                  shiftWindows.map((shift) => (
                    <SelectItem key={shift.id} value={shift.name.toLowerCase()}>
                      {shift.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm p-2 italic">
                    No shift windows found <br /> add one in your System Config.
                  </div>
                )}
              </SelectContent>
            </Select>
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
    </>
  );
}
