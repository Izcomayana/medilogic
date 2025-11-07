// base.ts
import { useEffect, useState } from 'react';
import { Incident } from './type';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';
import { useAuth } from '@/components/auth';

const severity = ['low', 'moderate', 'critical'];

export function useIncidentsBase(initialIncidents: Incident[]) {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [loadingAccidents, setLoadingAccidents] = useState(false);

  const { role } = useAuth();
  const { user } = useProfile();
  const authorizedRequest = useAuthorizedRequest();

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    submittedBy: user?.user_id,
    organization: user?.organization.id,
    type: '',
    severity: '',
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
      severity: '',
      location: '',
      isVisibleToRegulator: false,
      escalated: false,
      files: [],
    });

  const reportIncident = async () => {
    setReporting(true);

    if (
      !formData.title ||
      !formData.description ||
      !formData.files ||
      !formData.severity
    ) {
      toast.error('Please fill all required fields');
      setReporting(false);
      return;
    }

    try {
      const endpoint =
        role === 'admin' ? '/incidents/submit' : '/incidents/incidents/driver';

      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('submitted_by_id', formData.submittedBy || '');
      payload.append('organization_id', formData.organization || '');
      payload.append('incident_type', formData.type);
      payload.append('severity', formData.severity);
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
        const response = await api.post(endpoint, payload, {
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

  const fetchAdminIncidents = async () => {
    setLoadingAccidents(true);

    try {
      let endpoint = '';

      if (role === 'regulator') {
        endpoint = '/incidents/';
      } else if (role === 'admin') {
        endpoint = '/incidents/incidents/admin';
      } else {
        endpoint = '/incidents/user';
      }

      await authorizedRequest(async (token) => {
        const response = await api.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIncidents(response.data);
      }, 'Failed to load incidents');
    } catch (error) {
      console.error('Error fetching accidents:', error);
      toast.error('Failed to load accidents');
    } finally {
      setLoadingAccidents(false);
    }
  };

  useEffect(() => {
    fetchAdminIncidents();
  }, []);

  const filteredIncidents = incidents.filter((incident: any) => {
    const matchesSearch =
      incident.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      severityFilter === 'all' ||
      incident.severity.toLowerCase() === severityFilter.toLowerCase();

    // const matchesDriver =
    //   driverFilter === 'all' || incident.submitted_by_id === driverFilter;

    return matchesSearch && matchesSeverity;
  });

  const handleViewDetails = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowDetailsModal(true);
  };

  return {
    severity,
    incidents,
    setIncidents,
    selectedIncident,
    setSelectedIncident,
    showDetailsModal,
    setShowDetailsModal,
    showReportModal,
    setShowReportModal,
    reporting,
    isLoadingLocation,
    loadingAccidents,
    searchTerm,
    setSearchTerm,
    severityFilter,
    setSeverityFilter,
    formData,
    setFormData,
    resetForm,
    reportIncident,
    handleGetLocation,
    formatFileSize,
    filteredIncidents,
    handleViewDetails,
  };
}
