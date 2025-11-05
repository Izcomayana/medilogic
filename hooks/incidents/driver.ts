// useDriverIncidents.ts
import { Incident } from '@/hooks/incidents/type';
import { toast } from 'sonner';
import { useIncidentsBase } from './base';
import { useState } from 'react';

const mockIncidents: Incident[] = [
  {
    id: 'INC-981',
    tripId: 'TRIP-001',
    type: 'Damage',
    description: 'Container arrived with dent on side',
    status: 'Under Review',
    reportedAt: 'Today, 2:13 PM',
    timestamp: '2025-10-24 14:13',
    photoUrl: null,
    adminResponse: 'We will inspect the container upon return.',
  },
  {
    id: 'INC-980',
    tripId: 'TRIP-002',
    type: 'Delay',
    description: 'Traffic congestion on route',
    status: 'Resolved',
    reportedAt: 'Yesterday, 10:30 AM',
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

const incidentTypes = [
  'Damage',
  'Delay',
  'Safety Concern',
  'Customer Refusal',
  'Location Access Issue',
  'Vehicle Breakdown',
];

export function useDriverIncidents() {
  const base = useIncidentsBase(mockIncidents);

  const [formData, setFormData] = useState({
    trip: '',
    type: '',
    description: '',
    photoFile: null as File | null,
  });

  const resetForm = () =>
    setFormData({ trip: '', type: '', description: '', photoFile: null });

  const reportIncident = () => {
    if (!formData.trip || !formData.type || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }

    const newIncident: Incident = {
      id: `INC-${String(base.incidents.length + 1).padStart(3, '0')}`,
      tripId: formData.trip,
      type: formData.type,
      description: formData.description,
      status: 'New',
      reportedAt: 'Just now',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      photoUrl: formData.photoFile
        ? URL.createObjectURL(formData.photoFile)
        : null,
      adminResponse: null,
      auditHistory: [],
    };

    base.setIncidents([newIncident, ...base.incidents]);
    resetForm();
    toast.success('Incident reported successfully');
  };

  return {
    ...base,
    incidentTypes,
    mockTrips,
    formData,
    setFormData,
    reportIncident,
  };
}
