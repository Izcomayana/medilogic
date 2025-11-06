// useDriverIncidents.ts
import { Incident } from '@/hooks/incidents/type';
import { toast } from 'sonner';
import { useIncidentsBase } from './base';
import { useState } from 'react';

const mockIncidents: Incident[] = [
  {
    id: 'INC-981',
    title: 'TRIP-001',
    incident_type: 'Damage',
    severity: 'low',
    description: 'Container arrived with dent on side',
    status: 'Under Review',
    created_at: 'Today, 2:13 PM',
    timestamp: '2025-10-24 14:13',
    photoUrl: null,
    adminResponse: 'We will inspect the container upon return.',
  },
  {
    id: 'INC-980',
    title: 'TRIP-002',
    incident_type: 'Delay',
    severity: 'low',
    description: 'Traffic congestion on route',
    status: 'Resolved',
    created_at: 'Yesterday, 10:30 AM',
    timestamp: '2025-10-23 10:30',
    photoUrl: null,
    adminResponse: 'Delay noted. Alternative route recommended.',
  },
];

const mockTrips = [
  { id: 'TRIP-001', client: 'Acme Corp' },
  { id: 'TRIP-002', client: 'Tech Solutions' },
  { id: 'TRIP-003', client: 'Green Waste Co' },
];

export function useDriverIncidents() {
  const base = useIncidentsBase(mockIncidents);

  const { formData, setFormData, reporting, reportIncident } = base;

  return {
    ...base,
    mockTrips,
    formData,
    setFormData,
    reporting,
    reportIncident,
    mockIncidents,
  };
}
