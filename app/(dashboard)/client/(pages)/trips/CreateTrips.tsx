'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react'; // spinner

type Props = {
  createClientTrip: (payload: any) => Promise<void>;
};

export function CreateClientTripModal({ createClientTrip }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ NEW

  const [form, setForm] = useState({
    delivery_type: '',
    custom_delivery_description: '',
    pickup_location: '',
    dropoff_location: '',
    distance_km: '',
    scheduled_time: '',
    priority: 'normal',
    requires_pin: false,
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isSubmitDisabled =
    loading ||
    !form.delivery_type ||
    !form.pickup_location ||
    !form.dropoff_location ||
    !form.scheduled_time;

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;

    setLoading(true); // ✅ start loading

    try {
      await createClientTrip({
        ...form,
        distance_km: Number(form.distance_km || 0),
        scheduled_time: new Date(form.scheduled_time).toISOString(),
      });

      setOpen(false);

      setForm({
        delivery_type: '',
        custom_delivery_description: '',
        pickup_location: '',
        dropoff_location: '',
        distance_km: '',
        scheduled_time: '',
        priority: 'normal',
        requires_pin: false,
      });
    } catch {
      toast.error('Failed to create trip');
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <>
      <Button className="primary-button" onClick={() => setOpen(true)}>
        Create Trip
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-700 text-white lg:max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Trip</AlertDialogTitle>
          </AlertDialogHeader>

 <div className='grid gap-6 max-h-[70vh] overflow-y-auto'>
            <div className="">
              <Label className="text-gray-300">Delivery Type</Label>
              <Select onValueChange={(val) => handleChange('delivery_type', val)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                  <SelectValue placeholder="Select type of delivery" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700">
                  <SelectItem value="clinical_waste">Clinical Waste</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="samples">Samples</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {/* If "Other" → show text area */}
              {form.delivery_type === 'other' && (
                <div className="mt-3">
                  <Label className="block text-sm font-medium mb-1">
                    Custom Delivery Description
                  </Label>
                  <Textarea
                    value={form.custom_delivery_description}
                    onChange={(e) =>
                      setForm((prev: any) => ({
                        ...prev,
                        custom_delivery_description: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                    rows={2}
                    placeholder="Enter custom delivery details..."
                  />
                </div>
              )}
            </div>

            <div className="">
              <Label htmlFor="pickup" className="text-gray-300">
                Pickup Address
              </Label>
              <Input
                id="pickup"
                placeholder="Pickup Location"
                value={form.pickup_location}
                onChange={(e) => handleChange('pickup_location', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div className="">
              <Label htmlFor="dropoff" className="text-gray-300">
                Dropoff Address
              </Label>
              <Input
                id="dropoff"
                placeholder="Dropoff Location"
                value={form.dropoff_location}
                onChange={(e) => handleChange('dropoff_location', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div className="">
              <Label htmlFor="distanceKm" className="text-gray-300">
                Distance (km)
              </Label>
              <Input
                id="distanceKm"
                type="number"
                placeholder="Distance (km)"
                value={form.distance_km}
                onChange={(e) => handleChange('distance_km', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

<div className="flex flex-col md:flex-row md:justify-between">
              <div className="">
              <Label htmlFor="datetime" className="text-gray-300">
                Trip Date & Time
              </Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={form.scheduled_time}
                onChange={(e) => handleChange('scheduled_time', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div className="">
              <Label className="text-gray-300 mb-2">Select Priority</Label>

              <Select
                value={form.priority}
                onValueChange={(val) => handleChange('priority', val)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700">
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="stat">Stat</SelectItem>
                </SelectContent>
              </Select>
            </div>
</div>

            <div>
              <Label className="text-gray-300 mb-2">Delivery Pin</Label>
              <Select
                value={form.requires_pin ? 'yes' : 'no'}
                onValueChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    requires_pin: v === 'yes',
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Delivery pin?" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <AlertDialogFooter className="border-t border-gray-700 pt-4 sticky z-20">
            <AlertDialogCancel 
              disabled={loading}
              className="text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className="primary-button"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Create Trip'
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
