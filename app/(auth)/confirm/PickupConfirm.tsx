'use client';

import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export default function PickupConfirmForm({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);

  // Text fields
  const [wtnCode, setWtnCode] = useState('');
  const [pin, setPin] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [notes, setNotes] = useState('');

  // Files
  const [signatureImage, setSignatureImage] = useState<File | null>(null);
  const [pickupPhoto, setPickupPhoto] = useState<File | null>(null);
  const [facilitySignature, setFacilitySignature] = useState<File | null>(null);
  const [dropoffPhoto, setDropoffPhoto] = useState<File | null>(null);

  const parseApiError = async (res: Response) => {
    try {
      const data = await res.json();

      // Simple string error
      if (typeof data?.detail === 'string') {
        return data.detail;
      }

      // Validation errors array
      if (Array.isArray(data?.detail)) {
        return data.detail
          .map((err: any) => {
            const field = err.loc?.[err.loc.length - 1];
            return field ? `${field.replace(/_/g, ' ')}: ${err.msg}` : err.msg;
          })
          .join(', ');
      }

      return 'Something went wrong. Please try again.';
    } catch {
      return 'Unexpected server error. Please try again.';
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      toast.error('Missing confirmation token');
      return;
    }

    setLoading(true);

    const formData = new FormData();

    // REQUIRED
    formData.append('token', token);

    // Optional / conditional fields
    if (pin) formData.append('pin', pin);
    if (wtnCode) formData.append('wtn_code', wtnCode);
    if (clientName) formData.append('external_client_name', clientName);
    if (clientEmail) formData.append('external_client_email', clientEmail);
    if (latitude) formData.append('latitude', latitude);
    if (longitude) formData.append('longitude', longitude);
    if (notes) formData.append('extra_notes', notes);

    // Files
    if (signatureImage) formData.append('signature_image', signatureImage);
    if (pickupPhoto) formData.append('pickup_photo', pickupPhoto);
    if (facilitySignature)
      formData.append('facility_signature', facilitySignature);
    if (dropoffPhoto) formData.append('dropoff_photo', dropoffPhoto);

    try {
      const res = await fetch(
        'https://medilogic-backend.onrender.com/confirm',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) {
        const message = await parseApiError(res);
        throw new Error(message);
      }

      toast.success('Pickup confirmed successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit pickup confirmation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Pickup Confirmation
          </CardTitle>
        </CardHeader>

        <p className="text-sm text-gray-400 text-center">
          Please confirm pickup details below.
        </p>

        <CardContent className="space-y-6">
          {/* Trip Info */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300">Trip Info</h3>

            <Input
              placeholder="WTN Code"
              value={wtnCode}
              onChange={(e) => setWtnCode(e.target.value)}
            />

            <Input
              placeholder="Pickup PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </section>

          <Separator />

          {/* Client */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300">
              Client Details
            </h3>

            <Input
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />

            <Input
              type="email"
              placeholder="Client Email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </section>

          <Separator />

          {/* Location */}
          <section className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <Input
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </section>

          <Separator />

          {/* Files */}
          <section className="space-y-3">
            <Label>Client Signature</Label>
            <Input
              type="file"
              onChange={(e) => setSignatureImage(e.target.files?.[0] ?? null)}
            />

            <Label>Pickup Photo</Label>
            <Input
              type="file"
              onChange={(e) => setPickupPhoto(e.target.files?.[0] ?? null)}
            />

            <Label>Facility Signature</Label>
            <Input
              type="file"
              onChange={(e) =>
                setFacilitySignature(e.target.files?.[0] ?? null)
              }
            />

            <Label>Dropoff Photo</Label>
            <Input
              type="file"
              onChange={(e) => setDropoffPhoto(e.target.files?.[0] ?? null)}
            />
          </section>

          <Separator />

          <Textarea
            placeholder="Extra notes…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {loading ? 'Submitting…' : 'Confirm Pickup'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
