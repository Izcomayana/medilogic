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
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // or make this adjustable
  const [totalCount, setTotalCount] = useState(0);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const { role } = useAuth();
  const { user } = useProfile();
  const authorizedRequest = useAuthorizedRequest();

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [scope, setScope] = useState<'all' | 'mine' | 'org'>('all');

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

  const fetchIncidents = async () => {
    setLoadingAccidents(true);

    try {
      let endpoint = '';

      if (role === 'admin') {
        // choose endpoint based on scope
        if (scope === 'mine') endpoint = '/incidents/my-submissions';
        else endpoint = '/incidents/incidents/admin';
      } else if (role === 'regulator') {
        endpoint = '/incidents/regulator';
      } else {
        endpoint = '/incidents/driver/my-submissions';
      }

      await authorizedRequest(async (token) => {
        const skip = (page - 1) * limit;
        const response = await api.get(endpoint, {
          params: { skip, limit },
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        if (Array.isArray(data)) {
          setIncidents(response.data);
          setTotalCount(data.length);
        } else {
          setIncidents(response.data.items || []);
          setTotalCount(response.data.total || 0);
        }
      }, 'Failed to load incidents');
    } catch (error) {
      console.error('Error fetching accidents:', error);
      toast.error('Failed to load accidents');
    } finally {
      setLoadingAccidents(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [page, scope]);

  const totalPages = Math.ceil(totalCount / limit);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const filteredIncidents = incidents.filter((incident: any) => {
    const matchesSearch =
      incident.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      severityFilter === 'all' ||
      incident.severity.toLowerCase() === severityFilter.toLowerCase();

    return matchesSearch && matchesSeverity;
  });

  const fetchIncidentDetails = async (incidentId: string) => {
    try {
      setSelectedIncident(null);
      toast('Loading incident details...');

      await authorizedRequest(async (token) => {
        const response = await api.get(`/incidents/${incidentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSelectedIncident(response.data);
        setShowDetailsModal(true);
      }, 'Failed to load incident details');
    } catch (error) {
      console.error('Error loading incident details:', error);
      toast.error('Unable to load incident details');
    }
  };

  const handleViewDetails = (incident: Incident) => {
    if (!incident?.id) {
      toast.error('Invalid incident');
      return;
    }
    fetchIncidentDetails(incident.id);
  };

  const updateIncidentStatus = async (
    incidentId: string,
    newStatus: string
  ) => {
    try {
      await authorizedRequest(async (token) => {
        const response = await api.patch(
          `/incidents/${incidentId}/status`,
          { status: newStatus }, // body
          { headers: { Authorization: `Bearer ${token}` } } // ✅ correct placement
        );
        return response.data;
      }, 'fail to update status');
    } catch (err: any) {
      console.error('Error updating status:', err?.response?.data || err);
      throw err;
    }
  };

  const toggleIncidentEscalation = async (
    incidentId: string,
    currentEscalated: boolean
  ) => {
    try {
      await authorizedRequest(async (token) => {
        const response = await api.patch(
          `/incidents/${incidentId}/toggle-escalation`,
          { escalated: !currentEscalated }, // body
          { headers: { Authorization: `Bearer ${token}` } } // ✅ correct placement
        );
        return response.data;
      }, 'fail to update status');
    } catch (error: any) {
      console.error(
        'Error toggling escalation:',
        error?.response?.data || error
      );
      throw error;
    }
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
    page,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    showStatusModal,
    setShowStatusModal,
    searchTerm,
    setSearchTerm,
    severityFilter,
    setSeverityFilter,
    scope,
    setScope,
    formData,
    setFormData,
    resetForm,
    reportIncident,
    handleGetLocation,
    formatFileSize,
    filteredIncidents,
    fetchIncidentDetails,
    handleViewDetails,
    updateIncidentStatus,
    toggleIncidentEscalation,
  };
}
