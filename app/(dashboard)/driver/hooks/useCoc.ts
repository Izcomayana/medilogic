'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';
import { usePods } from './usePODs';
import { useProfile } from '@/hooks/useProfile';

export interface Trip {
  id: string;
  client: string;
  date: string;
}

export interface CustodyEvent {
  id: string;
  tripId: string;
  eventType: string;
  handler: string;
  timestamp: string;
  location: string;
  notes: string;
  status: string;
  attachmentUrl?: string[];
  signatureImageUrl?: string;
  signatureTimestamp?: string;
  signedBy?: string;
  witnessName?: string;
}

export interface CustodyEventFormData {
  tripId: string;
  eventType: string;
  timestamp: string;
  location: string;
  notes: string;
  files?: File[];
  signatureImage?: File | null;
  signedBy: string;
  witnessName: string;
}

export const eventTypes = [
  'pickup_confirmed',
  'in_transit',
  'delayed',
  'handed_off',
  'delivered',
];

export function useCOC() {
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [custodyEvents, setCustodyEvents] = useState<CustodyEvent[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useProfile();
  const { loadingTrips, driverTrips } = usePods();

  const [formData, setFormData] = useState<CustodyEventFormData>({
    tripId: '',
    eventType: 'pickup_confirmed',
    timestamp: new Date().toISOString().slice(0, 16),
    location: '',
    notes: '',
    files: [],
    signatureImage: null,
    signedBy: '',
    witnessName: '',
  });

  const authorizedRequest = useAuthorizedRequest();

  const tripEvents = custodyEvents.filter((e) => e.tripId === selectedTrip);

  const fetchCustodyEvents = useCallback(async (tripId: string) => {
    if (!tripId) return;
    setLoadingEvents(true);
    console.log(loadingEvents);
    try {
      await authorizedRequest(async (token) => {
        const response = await api.get(`/custody/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustodyEvents(
          (response.data || []).map((e: any) => ({
            id: e.id,
            tripId: e.trip_id,
            eventType: e.event_type,
            signedBy: e.signed_by,
            timestamp: e.timestamp,
            location: e.location,
            notes: e.notes,
            witnessName: e.witness_name,
            attachmentUrl: e.attachment_urls,
            signatureImageUrl: e.signature_image_url,
            status:
              e.event_type === 'dropoff_confirmed'
                ? 'completed'
                : 'in-progress',
          }))
        );
      }, 'Failed to fetch custody events');
    } catch (err) {
      console.error('Error fetching custody events:', err);
      toast.error('Failed to load custody events');
    } finally {
      setLoadingEvents(false);
      console.log(loadingEvents);
    }
  }, []);

  useEffect(() => {
    if (selectedTrip) {
      fetchCustodyEvents(selectedTrip);
    }
  }, [selectedTrip, fetchCustodyEvents]);

  const handleRefresh = async () => {
    if (!selectedTrip) return;
    setIsRefreshing(true);
    await fetchCustodyEvents(selectedTrip);
    setIsRefreshing(false);
  };

  const selectedTripData = driverTrips.find((t) => t.trip_id === selectedTrip);
  console.log(selectedTripData);

  const handleExport = (format: 'csv' | 'pdf') => {
    const eventsToExport = tripEvents;

    if (format === 'csv') {
      const csvContent = [
        ['Stage', 'Handler', 'Timestamp', 'Location', 'Notes'],
        ...eventsToExport.map((e) => [
          e.eventType,
          e.handler,
          e.timestamp,
          e.location,
          e.notes,
        ]),
      ]
        .map((row) => row.map((cell) => `"${cell}"`).join(','))
        .join('\n');

      const link = document.createElement('a');
      link.setAttribute(
        'href',
        'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
      );
      link.setAttribute('download', `custody-${selectedTrip}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'pdf') {
      toast('PDF export would be generated here with pdfkit library');
    }

    toast.success(`Custody log exported as ${format.toUpperCase()}`);
  };

  const analytics = useMemo(() => {
    if (!tripEvents.length) {
      return {
        duration: 'N/A',
        uniqueHandlers: 0,
        handlerBreakdown: [],
        eventTypes: [],
      };
    }

    // Duration
    const firstTime = new Date(tripEvents[0].timestamp).getTime();
    const lastTime = new Date(
      tripEvents[tripEvents.length - 1].timestamp
    ).getTime();
    const durationMs = lastTime - firstTime;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const duration = `${hours}h ${minutes}m`;

    // Handler breakdown
    const handlerCounts = new Map<string, number>();
    for (const e of tripEvents) {
      handlerCounts.set(e.handler, (handlerCounts.get(e.handler) || 0) + 1);
    }
    const handlerBreakdown = Array.from(handlerCounts.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    // Event type breakdown
    const typeCounts = Array.from(
      new Set(tripEvents.map((e) => e.eventType))
    ).map((type) => ({
      type,
      count: tripEvents.filter((e) => e.eventType === type).length,
    }));

    return {
      duration,
      uniqueHandlers: handlerCounts.size,
      handlerBreakdown,
      eventTypes: typeCounts,
    };
  }, [tripEvents]);

  // Set local timestamp whenever modal opens
  useEffect(() => {
    if (showLogModal) {
      const now = new Date();
      const localDateTime = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      );
      setFormData((prev) => ({
        ...prev,
        timestamp: localDateTime.toISOString().slice(0, 16),
      }));
    }
  }, [showLogModal]);

  const handleGetLocation = async () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
        }));
        toast.success('Location captured');
        setIsLoadingLocation(false);
      },
      () => {
        toast.error('Failed to fetch location');
        setIsLoadingLocation(false);
      }
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.tripId) {
      toast.error('Please select a trip');
      setIsSubmitting(false);
      return;
    }

    if (!formData.location.trim()) {
      toast.error('Please enter or fetch location');
      setIsSubmitting(false);
      return;
    }

    try {
      await authorizedRequest(async (token) => {
        let signatureImageUrl = '';

        // 🖋️ Step 1: If there's a signature image, upload it to S3 using presigned URL
        if (formData.signatureImage) {
          try {
            // Detect the file extension (default to png if not found)
            const ext =
              formData.signatureImage.name.split('.').pop()?.toLowerCase() ||
              'png';

            // Ask backend for upload URL with correct extension
            const { data: uploadInfo } = await api.get(
              `/custody/upload/signature-url?file_ext=${ext}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            // Upload the image file directly to S3
            await fetch(uploadInfo.upload_url, {
              method: 'PUT',
              headers: {
                'Content-Type': formData.signatureImage.type || 'image/png',
              },
              body: formData.signatureImage,
            });

            // Save the final file URL for later use
            signatureImageUrl = uploadInfo.file_url;
          } catch (uploadErr) {
            console.error('Signature upload failed:', uploadErr);
            toast.error('Failed to upload signature image');
            setIsSubmitting(false);
            return;
          }
        }

        // 🧩 Step 2: Build the custody event form data
        const fd = new FormData();

        fd.append(
          'event',
          JSON.stringify({
            trip_id: formData.tripId,
            driver_id: user?.user_id,
            event_type: formData.eventType.toLowerCase(),
            timestamp: new Date(formData.timestamp).toISOString(),
            location: formData.location,
            notes: formData.notes,
            organization_id: user?.organization.id,
            signature_timestamp: new Date().toISOString(),
            signed_by: formData.signedBy,
            witness_name: formData.witnessName,
            signature_image_url: signatureImageUrl || null, // ✅ Now valid URL string
          })
        );

        // 📎 Step 3: Append additional file uploads (if any)
        if (formData.files && formData.files.length > 0) {
          formData.files.forEach((file) => {
            fd.append('files', file);
          });
        }

        // 🚀 Step 4: Submit the custody event
        await api.post('/custody/', fd, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success('Custody event logged successfully ✅');
        setShowLogModal(false);

        // Reset form after submission
        setFormData({
          tripId: '',
          eventType: 'pickup_confirmed',
          timestamp: new Date().toISOString().slice(0, 16),
          location: '',
          notes: '',
          files: [],
          signatureImage: null,
          signedBy: '',
          witnessName: '',
        });
      }, 'Failed to log custody event');
    } catch (error) {
      console.error('Error logging custody event:', error);
      toast.error('Failed to log custody event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    loadingEvents,
    custodyEvents,
    tripEvents: custodyEvents,
    selectedTrip,
    setSelectedTrip,
    showLogModal,
    setShowLogModal,
    isRefreshing,
    selectedTripData,
    analytics,
    handleRefresh,
    handleExport,
    eventTypes,
    driverTrips,
    loadingTrips,
    formData,
    setFormData,
    handleGetLocation,
    formatFileSize,
    handleSubmitEvent,
    isLoadingLocation,
    isSubmitting,
  };
}
