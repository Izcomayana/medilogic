/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
// import { useAuthorizedRequest } from '@/hooks/useRequest';
// import { useProfile } from '@/hooks/useProfile';
// import { api } from '@/lib/api';

const mockIncidents = [
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

export function useIncidents() {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<
    (typeof mockIncidents)[0] | null
  >(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [driverFilter, setDriverFilter] = useState('all');

  const [modalState, setModalState] = useState({
    newStatus: '',
    internalNote: '',
  });

  const handleViewIncident = (incident: (typeof mockIncidents)[0]) => {
    setSelectedIncident(incident);
    setModalState({
      newStatus: incident.status,
      internalNote: incident.internalNotes || '',
    });
    setShowDetailsModal(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (!selectedIncident) return;

    const updatedIncidents = incidents.map((inc) => {
      if (inc.id === selectedIncident.id) {
        return {
          ...inc,
          status: newStatus,
          auditHistory: [
            ...inc.auditHistory,
            {
              action: `Status Changed to ${newStatus}`,
              timestamp: new Date()
                .toISOString()
                .slice(0, 16)
                .replace('T', ' '),
              by: 'Admin User',
            },
          ],
        };
      }
      return inc;
    });

    setIncidents(updatedIncidents);
    setSelectedIncident(
      updatedIncidents.find((i) => i.id === selectedIncident.id) || null
    );
    toast.success(`Incident status updated to ${newStatus}`);
  };

  const handleAddNote = () => {
    if (!selectedIncident || !modalState.internalNote.trim()) {
      toast.error('Please enter a note');
      return;
    }

    const updatedIncidents = incidents.map((inc) => {
      if (inc.id === selectedIncident.id) {
        return {
          ...inc,
          internalNotes: modalState.internalNote,
          auditHistory: [
            ...inc.auditHistory,
            {
              action: 'Internal Note Added',
              timestamp: new Date()
                .toISOString()
                .slice(0, 16)
                .replace('T', ' '),
              by: 'Admin User',
            },
          ],
        };
      }
      return inc;
    });

    setIncidents(updatedIncidents);
    setSelectedIncident(
      updatedIncidents.find((i) => i.id === selectedIncident.id) || null
    );
    toast.success('Internal note added successfully');
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.tripId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      incident.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesDriver =
      driverFilter === 'all' || incident.driverId === driverFilter;

    return matchesSearch && matchesStatus && matchesDriver;
  });

  const drivers = [
    ...new Set(incidents.map((i) => ({ id: i.driverId, name: i.driver }))),
  ];

  return {
    mockIncidents,
    incidents,
    setIncidents,
    selectedIncident,
    setSelectedIncident,
    showDetailsModal,
    setShowDetailsModal,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    driverFilter,
    setDriverFilter,
    handleViewIncident,
    handleStatusChange,
    handleAddNote,
    filteredIncidents,
    drivers,
    modalState,
    setModalState,
  };
}
