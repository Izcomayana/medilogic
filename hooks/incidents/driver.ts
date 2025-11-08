// useDriverIncidents.ts
import { Incident } from '@/hooks/incidents/type';
import { toast } from 'sonner';
import { useIncidentsBase } from './base';
import { useState } from 'react';

const mockTrips = [
  { id: 'TRIP-001', client: 'Acme Corp' },
  { id: 'TRIP-002', client: 'Tech Solutions' },
  { id: 'TRIP-003', client: 'Green Waste Co' },
];

export function useDriverIncidents() {
  const base = useIncidentsBase([]);

  const { formData, setFormData, reporting, reportIncident } = base;

  return {
    ...base,
    mockTrips,
    formData,
    setFormData,
    reporting,
    reportIncident,
  };
}
