/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useIncidentsBase } from './base';
import { Incident } from '@/hooks/incidents/type';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';

export function useAdminIncidents() {
  const base = useIncidentsBase([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [driverFilter, setDriverFilter] = useState('all');

  // Modal form state
  const [modalState, setModalState] = useState({
    newStatus: '',
    internalNote: '',
  });

  const authorizedRequest = useAuthorizedRequest();
  // ✅ Fetch incidents for admin
  const fetchAdminIncidents = async () => {
    await authorizedRequest(async (token) => {
      const response = await api.get('/incidents/incidents/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Backend returns correct incident structure already
      base.setIncidents(response.data);
    }, 'Failed to load incidents');
  };

  // Load on mount
  useEffect(() => {
    fetchAdminIncidents();
  }, []);

  const handleViewIncident = (incident: Incident) => {
    base.setSelectedIncident(incident);
    setModalState({
      newStatus: incident.status,
      internalNote: (incident as any).internalNotes || '',
    });
    base.setShowDetailsModal(true);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!base.selectedIncident) return;

    try {
      // Optional: send update to backend later

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
    } catch {
      toast.error('Failed to update status');
    }
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
    toast.success('Internal note added');
  };

  // Filtering logic stays the same
  const filteredIncidents = base.incidents.filter((incident: any) => {
    const matchesSearch =
      incident.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      incident.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesDriver =
      driverFilter === 'all' || incident.submitted_by_id === driverFilter;

    return matchesSearch && matchesStatus && matchesDriver;
  });

  // Build driver list from submitters
  const drivers = [
    ...new Set(
      base.incidents.map((i: any) => ({
        id: i.submitted_by_id,
        name: i.submitted_by_id, // You’ll replace this when you have user names
      }))
    ),
  ];

  return {
    ...base,
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
