'use client';

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';

/* ───────────────────────────────
   🔹 Interfaces / Types
──────────────────────────────── */
export interface CustodyEvent {
  id: string;
  tripId: string;
  eventType: string;
  handler: string;
  timestamp: string;
  location: string;
  notes: string;
  status: string;
}

export interface Trip {
  id: string;
  client: string;
  date: string;
}

export interface CustodyEventFormData {
  eventType: string;
  timestamp: string;
  location: string;
  notes: string;
}

const eventTypes = [
  'Pickup',
  'Transit',
  'Drop-off',
  'Handover',
  'Storage',
  'Return',
];

/* ───────────────────────────────
   🔹 Mock Data
──────────────────────────────── */
const mockTrips: Trip[] = [
  { id: 'TRIP-001', client: 'Acme Corp', date: '2025-10-24' },
  { id: 'TRIP-002', client: 'Tech Solutions Ltd', date: '2025-10-24' },
  { id: 'TRIP-003', client: 'Green Waste Co', date: '2025-10-23' },
];

const mockCustodyEvents: CustodyEvent[] = [
  {
    id: 'COC-001',
    tripId: 'TRIP-001',
    eventType: 'Pickup',
    handler: 'John Driver',
    timestamp: '2025-10-24 10:30',
    location: 'London Clinic',
    notes: 'Package sealed and labeled',
    status: 'completed',
  },
  {
    id: 'COC-002',
    tripId: 'TRIP-001',
    eventType: 'Transit',
    handler: 'John Driver',
    timestamp: '2025-10-24 11:00',
    location: 'En route to disposal',
    notes: 'In good condition, temperature maintained',
    status: 'completed',
  },
  {
    id: 'COC-003',
    tripId: 'TRIP-001',
    eventType: 'Drop-off',
    handler: 'Waste Facility Staff',
    timestamp: '2025-10-24 12:15',
    location: "King's Disposal Center",
    notes: 'Delivered intact, signed by facility manager',
    status: 'completed',
  },
  {
    id: 'COC-002',
    tripId: 'TRIP-002',
    eventType: 'Transit',
    handler: 'John Driver',
    timestamp: '2025-10-24 11:00',
    location: 'En route to disposal',
    notes: 'In good condition, temperature maintained',
    status: 'completed',
  },
  {
    id: 'COC-003',
    tripId: 'TRIP-002',
    eventType: 'Drop-off',
    handler: 'Waste Facility Staff',
    timestamp: '2025-10-24 12:15',
    location: "King's Disposal Center",
    notes: 'Delivered intact, signed by facility manager',
    status: 'completed',
  },
  {
    id: 'COC-001',
    tripId: 'TRIP-003',
    eventType: 'Pickup',
    handler: 'John Driver',
    timestamp: '2025-10-24 10:30',
    location: 'London Clinic',
    notes: 'Package sealed and labeled',
    status: 'completed',
  },
];

/* ───────────────────────────────
   🔹 Hook Definition
──────────────────────────────── */
export function useCOC() {
  const [selectedTrip, setSelectedTrip] = useState<string>('TRIP-001');
  const [showLogModal, setShowLogModal] = useState(false);
  const [custodyEvents, setCustodyEvents] =
    useState<CustodyEvent[]>(mockCustodyEvents);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CustodyEventFormData>({
    eventType: 'Pickup',
    timestamp: new Date().toISOString().slice(0, 16),
    location: '',
    notes: '',
  });

  const selectedTripData = mockTrips.find((t) => t.id === selectedTrip);
  const tripEvents = custodyEvents.filter((e) => e.tripId === selectedTrip);

  /* ────────────────
     Add Event
  ───────────────── */
  const handleAddEvent = (
    eventData: Omit<CustodyEvent, 'id' | 'tripId' | 'status'>
  ) => {
    const newEvent: CustodyEvent = {
      id: `COC-${String(custodyEvents.length + 1).padStart(3, '0')}`,
      tripId: selectedTrip,
      ...eventData,
      status: 'completed',
    };
    setCustodyEvents((prev) => [...prev, newEvent]);
    setShowLogModal(false);
    toast.success('Custody event logged successfully');
  };

  /* ────────────────
     Refresh
  ───────────────── */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsRefreshing(false);
    toast('Timeline updated with latest events');
  };

  /* ────────────────
     Export
  ───────────────── */
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

  /* ────────────────
     Analytics
  ───────────────── */
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
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData((prev) => ({
              ...prev,
              location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            }));
            setIsLoadingLocation(false);
          },
          () => {
            setIsLoadingLocation(false);
            setFormData((prev) => ({
              ...prev,
              location: 'Location access denied',
            }));
          }
        );
      }
    } catch {
      setIsLoadingLocation(false);
    }
  };

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.location.trim()) {
      toast.error('Please enter or fetch location');
      setIsSubmitting(false);
      return;
    }

    const submitData = {
      eventType: formData.eventType,
      handler: 'John Driver',
      timestamp: new Date(formData.timestamp).toLocaleString(),
      location: formData.location,
      notes: formData.notes,
    };

    handleAddEvent(submitData);
    setIsSubmitting(false);
    setShowLogModal(false);

    // Reset form
    setFormData({
      eventType: 'Pickup',
      timestamp: new Date().toISOString().slice(0, 16),
      location: '',
      notes: '',
    });
  };

  return {
    mockTrips,
    custodyEvents,
    selectedTrip,
    setSelectedTrip,
    showLogModal,
    setShowLogModal,
    isRefreshing,
    selectedTripData,
    tripEvents,
    analytics, // ✅ available to CustodyAnalytics
    handleAddEvent,
    handleRefresh,
    handleExport,
    eventTypes,
    formData,
    setFormData,
    handleGetLocation,
    handleSubmitEvent,
    isLoadingLocation,
    isSubmitting,
  };
}
