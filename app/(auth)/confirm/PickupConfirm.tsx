'use client';

import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Spinner } from '@/components/ui/spinner';

export default function PickupConfirmForm({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [saved, setSaved] = useState<any>(null);

  const clientSigRef = useRef<SignatureCanvas | null>(null);
  const facilitySigRef = useRef<SignatureCanvas | null>(null);

  // text
  const [wtnCode, setWtnCode] = useState('');
  const [pin, setPin] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [facilitytName, setFacilitytName] = useState('');
  const [facilitytAddress, setFacilitytAddress] = useState('');
  const [notes, setNotes] = useState('');

  // photos
  const [pickupPhoto, setPickupPhoto] = useState<File | null>(null);
  const [dropoffPhoto, setDropoffPhoto] = useState<File | null>(null);

  // signatures (base64)
  const [clientSignature, setClientSignature] = useState<string>('');
  const [facilitySignature, setFacilitySignature] = useState<string>('');

  const [requiresPin, setRequiresPin] = useState(false);
  const [requiresWtn, setRequiresWtn] = useState(false);

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

  const dataURLToFile = (dataUrl: string, filename: string) => {
    if (!dataUrl.startsWith('data:')) {
      throw new Error('Invalid signature data');
    }

    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error('Invalid signature format');
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const canConfirm = Boolean(dropoffPhoto || saved?.has_dropoff_photo);

  const missingRequirements = [];
  if (!canConfirm) missingRequirements.push('Dropoff photo');

  useEffect(() => {
    if (!token) return;

    fetch(`https://medilogic-backend.onrender.com/confirm?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        setSaved(data.saved ?? {});
        setClientName(data.client_name ?? '');
        setClientEmail(data.client_email ?? '');
        setRequiresPin(Boolean(data.requires_pin));
        setRequiresWtn(Boolean(data.requires_wtn));

        const saved = data.saved ?? {};

        // setWtnCode(saved.wtn_serial ?? '');
        setWtnCode(saved.wtn_code ?? '');
        setLatitude(saved.latitude ?? '');
        setLongitude(saved.longitude ?? '');
        setNotes(saved.extra_notes ?? '');
        setFacilitytName(saved.disposal_facility_name ?? '');
        setFacilitytAddress(saved.disposal_facility_address ?? '');
      })
      .catch(() => toast.error('Invalid or expired confirmation link'));
  }, [token]);

  const handleGetLocation = () => {
    setIsLoadingLocation(true);

    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setLatitude(latitude.toFixed(6));
        setLongitude(longitude.toFixed(6));

        toast.success('Location captured');
        setIsLoadingLocation(false);
      },
      () => {
        toast.error('Failed to fetch location');
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('token', token);

    if (pin) formData.append('pin', pin);
    if (wtnCode) formData.append('wtn_code', wtnCode);
    if (clientName) formData.append('external_client_name', clientName);
    if (clientEmail) formData.append('external_client_email', clientEmail);
    if (latitude) formData.append('latitude', latitude);
    if (longitude) formData.append('longitude', longitude);
    if (notes) formData.append('extra_notes', notes);

    if (facilitytName) {
      formData.append('disposal_facility_name', facilitytName);
    }

    if (facilitytAddress) {
      formData.append('disposal_facility_address', facilitytAddress);
    }

    if (clientSignature) {
      formData.append(
        'signature_image',
        dataURLToFile(clientSignature, 'client-signature.png')
      );
    }

    if (facilitySignature) {
      formData.append(
        'facility_signature',
        dataURLToFile(facilitySignature, 'facility-signature.png')
      );
    }

    if (pickupPhoto) formData.append('pickup_photo', pickupPhoto);
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

      if (canConfirm) {
        toast.success('Delivery confirmed successfully');
      } else {
        toast.message('Progress saved', {
          description:
            'You can finish this later once all required details are provided.',
        });
      }
      // toast.success('Pickup confirmed successfully');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const SignatureBlock = ({
    label,
    sigRef,
    onChange,
    value,
    onClear,
    hasSaved,
    previewUrl,
  }: any) => (
    <>
      <Label>{label}</Label>

      {hasSaved && !value && (
        <p className="text-xs text-green-400 mb-1">
          Signature already captured ✓
        </p>
      )}

      {previewUrl && !value && (
        <img
          src={previewUrl}
          className="rounded-md mb-2 max-h-40 border border-gray-600"
        />
      )}

      <div className="border border-gray-600 bg-gray-700 rounded-lg p-2">
        <SignatureCanvas
          ref={sigRef}
          penColor="white"
          backgroundColor="#374151"
          canvasProps={{ className: 'rounded-lg w-full h-40' }}
          onEnd={() =>
            onChange(sigRef.current?.toDataURL('image/jpeg', 0.8) || '')
          }
        />
      </div>

      <div className="flex justify-between mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClear}
          className="text-gray-800"
        >
          Clear
        </Button>
        {value && (
          <span className="text-xs text-green-400">Signature captured ✓</span>
        )}
      </div>
    </>
  );

  return (
    <div
      className="min-h-screen  bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('/auth2.png')" }}
    >
      <Card className="w-full max-w-2xl bg-gray-800 opacity-80 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Pickup Confirmation
          </CardTitle>
        </CardHeader>

        <p className="text-sm text-gray-400 text-center">
          Please confirm pickup details below.
        </p>

        {!canConfirm && (
          <div className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-md p-2 mx-4">
            To confirm delivery, please upload:
            <ul className="list-disc list-inside mt-1">
              {missingRequirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        <CardContent className="space-y-6">
          {/* Trip Info */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300">Trip Info</h3>

            {requiresWtn && (
              <Input
                placeholder="WTN Code"
                value={wtnCode}
                onChange={(e) => setWtnCode(e.target.value)}
              />
            )}

            {requiresPin && (
              <Input
                placeholder="Pickup PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            )}
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

            <SignatureBlock
              label="Client Signature"
              sigRef={clientSigRef}
              value={clientSignature}
              onChange={setClientSignature}
              onClear={() => {
                clientSigRef.current?.clear();
                setClientSignature('');
              }}
              hasSaved={saved?.has_signature_image}
              previewUrl={saved?.signature_image_url}
            />

            <Label>Pickup Photo</Label>
            <Input
              type="file"
              onChange={(e) => setPickupPhoto(e.target.files?.[0] ?? null)}
            />
            {saved?.pickup_photo_url && !pickupPhoto && (
              <img
                src={saved.pickup_photo_url}
                className="mt-2 rounded-md max-h-40 border border-gray-600"
              />
            )}
          </section>

          <Separator />

          {/* Location */}
          <section className="space-y-2">
            <Label className="text-gray-300 text-sm">Location</Label>

            <div className="grid grid-cols-2 gap-2">
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
            </div>

            <Button
              type="button"
              onClick={handleGetLocation}
              disabled={isLoadingLocation}
              variant="outline"
              className="w-full border-gray-600 text-gray-800 hover:text-white hover:bg-gray-700"
            >
              {isLoadingLocation ? 'Getting location…' : 'Get Current Location'}
            </Button>
          </section>

          <Separator />

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-300">
              Facilities Details
            </h3>
            <Input
              placeholder="Facility Name"
              value={facilitytName}
              onChange={(e) => setFacilitytName(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Facility Address"
              value={facilitytAddress}
              onChange={(e) => setFacilitytAddress(e.target.value)}
            />

            <SignatureBlock
              label="Facility Signature"
              sigRef={facilitySigRef}
              value={facilitySignature}
              onChange={setFacilitySignature}
              onClear={() => {
                facilitySigRef.current?.clear();
                setFacilitySignature('');
              }}
              hasSaved={saved?.has_facility_signature}
              previewUrl={saved?.facility_signature_url}
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={canConfirm ? handleSubmit : handleSubmit}
                >
                  {loading ? (
                    <span className="flex gap-2">
                      <Spinner /> Processing
                    </span>
                  ) : canConfirm ? (
                    'Confirm Delivery'
                  ) : (
                    'Save Progress'
                  )}
                </Button>
              </TooltipTrigger>

              {!canConfirm && (
                <TooltipContent side="top">
                  <p className="text-sm max-w-xs">
                    Delivery can only be confirmed once a dropoff photo is
                    uploaded. Until then, your progress will be saved.
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
