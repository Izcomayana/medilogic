// base.ts
import { useState } from 'react';
import { Incident } from './type';

export function useIncidentsBase(initialIncidents: Incident[]) {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleViewDetails = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowDetailsModal(true);
  };

  return {
    incidents,
    setIncidents,
    selectedIncident,
    setSelectedIncident,
    showDetailsModal,
    setShowDetailsModal,
    showReportModal,
    setShowReportModal,
    handleViewDetails,
  };
}
