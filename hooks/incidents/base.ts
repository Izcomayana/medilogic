// base.ts
import { useState } from 'react';
import { Incident } from './type';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';

export function useIncidentsBase(initialIncidents: Incident[]) {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reporting, setReporting] = useState(false);

  const { user } = useProfile();
  const authorizedRequest = useAuthorizedRequest();

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

        setIncidents([response.data, ...incidents]);
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
    reporting,
    formData,
    setFormData,
    resetForm,
    reportIncident,
    handleViewDetails,
  };
}
