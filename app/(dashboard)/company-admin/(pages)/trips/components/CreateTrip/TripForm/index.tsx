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

export default function TripForm({ formData, setFormData, drivers }: any) {
  return (
    <>
      {/* 🔽 Scrollable form section */}
      <div className="grid gap-4 py-4">
        {/* Driver ID + Name */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="driver" className="text-gray-300">
              Driver Assigned
            </Label>
            <Select
              value={formData.driverAssigned}
              onValueChange={(value) =>
                setFormData({ ...formData, driverAssigned: value })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                <SelectValue placeholder="Select driver" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {drivers.map((driver: any) => (
                  <SelectItem key={driver} value={driver}>
                    {driver}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          {/* Delivery Type */}
          <div className="">
            <Label
              htmlFor="delivery_type"
              className="block text-sm font-medium mb-1"
            >
              Delivery Type
            </Label>
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
                  className="w-full border rounded p-2"
                  placeholder="Enter custom delivery details..."
                />
              </div>
            )}
          </div>
          {/* <div>
        <Label htmlFor="driverId" className="text-gray-300">Driver ID</Label>
        <Input
          id="driverId"
          value={formData.driverId}
          onChange={(e) =>
            setFormData({ ...formData, driverId: e.target.value })
          }
          placeholder="Enter driver ID"
          className="bg-gray-700 border-gray-600 text-white mt-2"
        />
      </div> */}
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
          <div>
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
                <SelectItem value="Cancelled">Cancelled</SelectItem>
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
              type="number"
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
                <SelectItem value="daily">Daily</SelectItem>
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
