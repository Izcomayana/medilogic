/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from 'sonner';
import { Incident } from '@/hooks/incidents/type';
import { useIncidentsBase } from './base';
import { useState } from 'react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';
import { useProfile } from '@/hooks/useProfile';

const mockIncidents: Incident[] = [
  {
    id: 'INC-981',
    driver: 'John Driver',
    driverId: 'DRV-001',
    tripId: 'TRIP-001',
    type: 'Damage',
    description: 'Container arrived with dent on side',
    status: 'Under Review',
    reportedDate: '2025-10-24',
    reportedTime: '14:13',
    photoUrl: null,
    auditHistory: [
      {
        action: 'Incident Reported',
        timestamp: '2025-10-24 14:13',
        by: 'John Driver',
      },
    ],
    internalNotes: null,
  },
  {
    id: 'INC-980',
    driver: 'Sarah Manager',
    driverId: 'DRV-002',
    tripId: 'TRIP-002',
    type: 'Delay',
    description: 'Traffic congestion on route',
    status: 'Resolved',
    reportedDate: '2025-10-23',
    reportedTime: '10:30',
    photoUrl: null,
    auditHistory: [
      {
        action: 'Incident Reported',
        timestamp: '2025-10-23 10:30',
        by: 'Sarah Manager',
      },
      {
        action: 'Status Changed to Resolved',
        timestamp: '2025-10-23 15:45',
        by: 'Admin User',
      },
    ],
    internalNotes: 'Delay noted. Alternative route recommended.',
  },
  {
    id: 'INC-979',
    driver: 'Mike Transport',
    driverId: 'DRV-003',
    tripId: 'TRIP-003',
    type: 'Safety Concern',
    description: 'Spill detected near loading area',
    status: 'Needs Follow-up',
    reportedDate: '2025-10-22',
    reportedTime: '15:45',
    photoUrl: null,
    auditHistory: [
      {
        action: 'Incident Reported',
        timestamp: '2025-10-22 15:45',
        by: 'Mike Transport',
      },
      {
        action: 'Status Changed to Needs Follow-up',
        timestamp: '2025-10-22 16:30',
        by: 'Admin User',
      },
    ],
    internalNotes: null,
  },
];

const mockTrips = [
  { id: 'TRIP-001', client: 'Acme Corp' },
  { id: 'TRIP-002', client: 'Tech Solutions' },
  { id: 'TRIP-003', client: 'Green Waste Co' },
];

const incidentTypes = ['low', 'moderate', 'critical'];

export function useAdminIncidents() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [reporting, setReporting] = useState(false);

  const base = useIncidentsBase(mockIncidents);
  const { setShowReportModal } = base;
  
  const authorizedRequest = useAuthorizedRequest();
  const { user } = useProfile();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [driverFilter, setDriverFilter] = useState('all');

  // Modal form state
  const [modalState, setModalState] = useState({
    newStatus: '',
    internalNote: '',
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    submittedBy: user?.user_id,
    organization: user?.organization.id,
    type: '',
    location: '',
    isVisibleToRegulator: false,
    escalated: false,
    files: [] as File[],
  });

  const resetForm = () =>
    setFormData({
      title: '',
      description: '',
      submittedBy: '',
      organization: '',
      type: '',
      location: '',
      isVisibleToRegulator: false,
      escalated: false,
      files: [],
    });

  const reportIncident = async () => {
    setReporting(true);

    if (!formData.title || !formData.description || !formData.files) {
      toast.error('Please fill all required fields');
      setReporting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('submitted_by_id', formData.submittedBy || '');
      payload.append('organization_id', formData.organization || '');
      payload.append('incident_type', formData.type);
      payload.append('location', formData.location);
      payload.append(
        'is_visible_to_regulator',
        String(formData.isVisibleToRegulator)
      );
      payload.append('escalated', String(formData.escalated));

      // NEW FIELDS
      payload.append(
        'is_visible_to_regulator',
        String(formData.isVisibleToRegulator)
      );
      payload.append('escalated', String(formData.escalated));

      formData.files.forEach((file) => {
        payload.append('files', file);
      });

      await authorizedRequest(async (token) => {
        const response = await api.post('/incidents/submit', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'applicaton/json',
          },
        });

        base.setIncidents([response.data, ...base.incidents]);
      }, 'failed to report incident');

      resetForm();
      toast.success('Incident submitted successfully');
      setShowReportModal(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.detail || 'Unable to submit incident');
      setReporting(false);
    } finally {
      setReporting(false);
    }
  };

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

  const handleViewIncident = (incident: Incident) => {
    base.setSelectedIncident(incident);
    setModalState({
      newStatus: incident.status,
      internalNote: incident.internalNotes || '',
    });
    base.setShowDetailsModal(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (!base.selectedIncident) return;

    const updatedIncidents = base.incidents.map((inc) =>
      inc.id === base.selectedIncident!.id
        ? {
            ...inc,
            status: newStatus,
            auditHistory: [
              ...(inc.auditHistory ?? []),
              {
                action: `Status Changed to ${newStatus}`,
                timestamp: new Date()
                  .toISOString()
                  .slice(0, 16)
                  .replace('T', ' '),
                by: 'Admin User',
              },
            ],
          }
        : inc
    );

    base.setIncidents(updatedIncidents);
    toast.success(`Incident status updated to ${newStatus}`);
  };

  const handleAddNote = () => {
    if (!base.selectedIncident || !modalState.internalNote.trim()) {
      toast.error('Please enter a note');
      return;
    }

    const updatedIncidents = base.incidents.map((inc) =>
      inc.id === base.selectedIncident!.id
        ? {
            ...inc,
            internalNotes: modalState.internalNote,
            auditHistory: [
              ...(inc.auditHistory ?? []),
              {
                action: 'Internal Note Added',
                timestamp: new Date()
                  .toISOString()
                  .slice(0, 16)
                  .replace('T', ' '),
                by: 'Admin User',
              },
            ],
          }
        : inc
    );

    base.setIncidents(updatedIncidents);
    toast.success('Internal note added successfully');
  };

  const filteredIncidents = base.incidents.filter((incident) => {
    const matchesSearch =
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.driver?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.tripId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      incident.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesDriver =
      driverFilter === 'all' || incident.driverId === driverFilter;

    return matchesSearch && matchesStatus && matchesDriver;
  });

  const drivers = [
    ...new Set(base.incidents.map((i) => ({ id: i.driverId, name: i.driver }))),
  ];

  return {
    ...base,
    mockTrips,
    incidentTypes,
    isLoadingLocation,
    reporting,
    formData,
    setFormData,
    reportIncident,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    driverFilter,
    setDriverFilter,
    handleGetLocation,
    formatFileSize,
    handleViewIncident,
    handleStatusChange,
    handleAddNote,
    filteredIncidents,
    drivers,
    modalState,
    setModalState,
  };
}
