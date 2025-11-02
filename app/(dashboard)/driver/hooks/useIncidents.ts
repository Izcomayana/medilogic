/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { toast } from 'sonner';

type Incident = {
  id: string;
  tripId: string;
  type: string;
  description: string;
  status: string;
  reportedAt: string;
  timestamp: string;
  photoUrl: string | null;
  adminResponse: string | null;
};

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
    adminResponse:
      'Delay noted. Alternative route recommended for future trips.',
  },
  {
    id: 'INC-979',
    tripId: 'TRIP-003',
    type: 'Safety Concern',
    description: 'Spill detected near loading area',
    status: 'Under Review',
    reportedAt: 'Oct 22, 3:45 PM',
    timestamp: '2025-10-22 15:45',
    photoUrl: null,
    adminResponse: null,
  },
];

const incidentTypes = [
  'Damage',
  'Delay',
  'Safety Concern',
  'Customer Refusal',
  'Location Access Issue',
  'Vehicle Breakdown',
];

const mockTrips = [
  { id: 'TRIP-001', client: 'Acme Corp' },
  { id: 'TRIP-002', client: 'Tech Solutions' },
  { id: 'TRIP-003', client: 'Green Waste Co' },
];

export function useDriverIncidents() {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<
    (typeof mockIncidents)[0] | null
  >(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [formData, setFormData] = useState({
    trip: '',
    type: '',
    description: '',
    photoFile: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      trip: '',
      type: '',
      description: '',
      photoFile: null,
    });
  };

  const handleReportIncident = () => {
    if (!formData.trip || !formData.type || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newIncident: Incident = {
      id: `INC-${String(incidents.length + 1).padStart(3, '0')}`,
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
    };

    setIncidents([newIncident, ...incidents]);

    setShowReportModal(false);
    resetForm();
    toast.success('Incident reported successfully');
  };

  const handleViewDetails = (incident: (typeof mockIncidents)[0]) => {
    setSelectedIncident(incident);
    setShowDetailsModal(true);
  };

  return {
    mockIncidents,
    incidentTypes,
    mockTrips,
    incidents,
    setIncidents,
    showReportModal,
    setShowReportModal,
    setShowDetailsModal,
    selectedIncident,
    setSelectedIncident,
    showDetailsModal,
    formData,
    setFormData,
    handleReportIncident,
    handleViewDetails,
  };
}
