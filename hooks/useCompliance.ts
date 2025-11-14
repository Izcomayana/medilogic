import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useProfile } from './useProfile';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { AlertCircle, CheckCircle, FileText } from 'lucide-react';

export function useCompliance() {
  const [creating, setCreating] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);
  const [updating, setUpdating] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [recordBeingEdited, setRecordBeingEdited] = useState<any | null>(null);
  const [alertsList, setAlertsList] = useState<any[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const { user } = useProfile();
  const authorizedRequest = useAuthorizedRequest();

  const [formData, setFormData] = useState({
    organization_id: user?.organization?.id || '',

    // compliance booleans
    iso_27001_certified: false,
    nhs_dsp_toolkit_complete: false,
    cyber_essentials_ready: false,
    has_waste_license: false,
    fire_risk_assessment_complete: false,
    gdpr_policy_uploaded: false,
    clinical_waste_policy_uploaded: false,
    sharps_policy_uploaded: false,
    staff_training_records_uploaded: false,
    transport_license_valid: false,
    environmental_permit_valid: false,
    data_protection_registration_valid: false,

    // url fields
    iso_27001_certificate_url: '',
    waste_license_certificate_url: '',
    gdpr_certificate_url: '',
    environmental_permit_url: '',
    data_protection_registration_url: '',
    fire_risk_certificate_url: '',

    // audit fields
    audit_status: 'pending',
    audit_remarks: '',
    last_audit_date: '',
    next_audit_due_date: '',

    // metadata
    last_updated_by_user_id: user?.user_id || '',
    is_flagged_noncompliant: false,
    escalation_level: 'none',
    auto_alert_enabled: true,
    is_visible_to_regulator: false,
  });

  const resetForm = () => {
    setFormData({
      organization_id: user?.organization?.id || '',
      iso_27001_certified: false,
      nhs_dsp_toolkit_complete: false,
      cyber_essentials_ready: false,
      has_waste_license: false,
      fire_risk_assessment_complete: false,
      gdpr_policy_uploaded: false,
      clinical_waste_policy_uploaded: false,
      sharps_policy_uploaded: false,
      staff_training_records_uploaded: false,
      transport_license_valid: false,
      environmental_permit_valid: false,
      data_protection_registration_valid: false,
      iso_27001_certificate_url: '',
      waste_license_certificate_url: '',
      gdpr_certificate_url: '',
      environmental_permit_url: '',
      data_protection_registration_url: '',
      fire_risk_certificate_url: '',
      // audit fields
      audit_status: 'pending',
      audit_remarks: '',
      last_audit_date: '',
      next_audit_due_date: '',

      // metadata
      last_updated_by_user_id: user?.user_id || '',
      is_flagged_noncompliant: false,
      escalation_level: 'none',
      auto_alert_enabled: true,
      is_visible_to_regulator: false,
    });
  };

  const handleCreateRecord = async () => {
    if (!user?.organization?.id || !user?.user_id) {
      toast.error('User or organization information is missing');
      return;
    }

    setCreating(true);

    try {
      const payload = {
        organization_id: user.organization.id,

        iso_27001_certified: formData.iso_27001_certified,
        nhs_dsp_toolkit_complete: formData.nhs_dsp_toolkit_complete,
        cyber_essentials_ready: formData.cyber_essentials_ready,
        has_waste_license: formData.has_waste_license,
        fire_risk_assessment_complete: formData.fire_risk_assessment_complete,
        gdpr_policy_uploaded: formData.gdpr_policy_uploaded,
        clinical_waste_policy_uploaded: formData.clinical_waste_policy_uploaded,
        sharps_policy_uploaded: formData.sharps_policy_uploaded,
        staff_training_records_uploaded:
          formData.staff_training_records_uploaded,
        transport_license_valid: formData.transport_license_valid,
        environmental_permit_valid: formData.environmental_permit_valid,
        data_protection_registration_valid:
          formData.data_protection_registration_valid,

        iso_27001_certificate_url: formData.iso_27001_certificate_url || null,
        waste_license_certificate_url:
          formData.waste_license_certificate_url || null,
        gdpr_certificate_url: formData.gdpr_certificate_url || null,
        environmental_permit_url: formData.environmental_permit_url || null,
        data_protection_registration_url:
          formData.data_protection_registration_url || null,
        fire_risk_certificate_url: formData.fire_risk_certificate_url || null,

        audit_status: formData.audit_status,
        audit_remarks: formData.audit_remarks || '',
        last_audit_date: formData.last_audit_date || new Date().toISOString(),
        next_audit_due_date:
          formData.next_audit_due_date || new Date().toISOString(),

        last_updated_by_user_id: user.user_id,
        is_flagged_noncompliant: formData.is_flagged_noncompliant,
        escalation_level: formData.escalation_level,
        auto_alert_enabled: formData.auto_alert_enabled,
        is_visible_to_regulator: formData.is_visible_to_regulator,
      };

      await authorizedRequest(async (token) => {
        const res = await api.post('/compliance/', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('✅ Created compliance:', res.data);
      }, 'Failed to create compliance record');

      toast.success('Compliance record created successfully ✅');
      resetForm();
      setIsCreateModalOpen(false);
      fetchCompliance(); // refresh list
    } catch (error: any) {
      console.error('Error creating compliance record:', error);
      toast.error(
        error?.response?.data?.detail || 'Failed to create compliance record'
      );
    } finally {
      setCreating(false);
    }
  };

  const fetchCompliance = async () => {
    if (!user?.organization?.id) return;

    try {
      await authorizedRequest(async (token) => {
        const res = await api.get(`/compliance/${user.organization.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Depending on API, might return an object or list — normalize
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setRecords(data);
      }, 'Failed to load compliance data');
    } catch (err) {
      console.error('Error fetching compliance:', err);
      toast.error('Failed to load compliance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompliance();
  }, [user?.organization?.id]);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      record.organization_id?.toLowerCase()?.includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      record.audit_status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedRecords = filteredRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const updateCompliance = async (statusId: string, payload: any) => {
    setUpdating(true);
    try {
      const result = await authorizedRequest(async (token) => {
        const res = await api.patch(`/compliance/${statusId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Update local state: replace the updated record
        setRecords((prev) =>
          prev.map((r) => (r.id === statusId ? res.data : r))
        );

        return res.data;
      }, 'Failed to update compliance');
      return result;
    } catch (err) {
      // rethrow so callers can handle
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  const handleEditRecord = (record: any) => {
    setRecordBeingEdited(record);
    setFormData(record);
    setIsEditModalOpen(true);
  };

  // 3) Guard recordBeingEdited before using it, and handle errors
  const handleUpdateRecord = async () => {
    if (!recordBeingEdited || !recordBeingEdited.id) {
      toast.error('No record selected for update');
      return;
    }

    try {
      await updateCompliance(recordBeingEdited.id, {
        organization_id: formData.organization_id,

        iso_27001_certified: formData.iso_27001_certified,
        nhs_dsp_toolkit_complete: formData.nhs_dsp_toolkit_complete,
        cyber_essentials_ready: formData.cyber_essentials_ready,
        has_waste_license: formData.has_waste_license,
        fire_risk_assessment_complete: formData.fire_risk_assessment_complete,
        gdpr_policy_uploaded: formData.gdpr_policy_uploaded,
        clinical_waste_policy_uploaded: formData.clinical_waste_policy_uploaded,
        sharps_policy_uploaded: formData.sharps_policy_uploaded,
        staff_training_records_uploaded:
          formData.staff_training_records_uploaded,
        transport_license_valid: formData.transport_license_valid,
        environmental_permit_valid: formData.environmental_permit_valid,
        data_protection_registration_valid:
          formData.data_protection_registration_valid,

        iso_27001_certificate_url: formData.iso_27001_certificate_url || null,
        waste_license_certificate_url:
          formData.waste_license_certificate_url || null,
        gdpr_certificate_url: formData.gdpr_certificate_url || null,
        environmental_permit_url: formData.environmental_permit_url || null,
        data_protection_registration_url:
          formData.data_protection_registration_url || null,
        fire_risk_certificate_url: formData.fire_risk_certificate_url || null,

        audit_status: formData.audit_status,
        audit_remarks: formData.audit_remarks || '',
        last_audit_date: formData.last_audit_date,
        next_audit_due_date: formData.next_audit_due_date,

        last_updated_by_user_id: user?.user_id,
        is_flagged_noncompliant: formData.is_flagged_noncompliant,
        escalation_level: formData.escalation_level,
        auto_alert_enabled: formData.auto_alert_enabled,
        is_visible_to_regulator: formData.is_visible_to_regulator,
      });

      toast.success('Compliance record updated');
      setIsEditModalOpen(false);
      setRecordBeingEdited(null);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      toast.error(detail || 'Failed to update compliance record');
      console.error(err);
    }
  };

  const fetchAlerts = async () => {
    if (!user?.organization?.id) return;

    setAlertsLoading(true);

    try {
      await authorizedRequest(async (token) => {
        const res = await api.get(
          `/compliance/compliance/${user.organization.id}/alerts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { alerts } = res.data;

        // Convert to UI format
        const formatted = alerts.map((alert: string, index: number) => ({
          id: index + 1,
          alert,
          organization: user.organization.name || 'Organization',
          triggeredOn: new Date().toLocaleString(),
        }));

        setAlertsList(formatted);
      }, 'Failed to load compliance alerts');
    } catch (err) {
      console.error('Error fetching alerts:', err);
      toast.error('Failed to load compliance alerts');
    } finally {
      setAlertsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.organization?.id) {
      fetchAlerts();
    }
  }, [user?.organization?.id]);

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  const handleDelete = (recordId: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== recordId));
    setRecordToDelete(null);
    toast.success('Compliance record deleted successfully');
  };

  const summaryCards = [
    {
      title: 'Total Records',
      value: records.length,
      icon: FileText,
      color: 'bg-blue-600',
    },
    {
      title: 'Pending Audits',
      value: records.filter((r) => r.audit_status === 'pending').length,
      icon: AlertCircle,
      color: 'bg-yellow-600',
    },
    {
      title: 'Passed Audits',
      value: records.filter((r) => r.audit_status === 'passed').length,
      icon: CheckCircle,
      color: 'bg-green-600',
    },
  ];

  return {
    records,
    setRecords,
    selectedRecord,
    setSelectedRecord,
    showDetailsModal,
    setShowDetailsModal,
    isCreateModalOpen,
    setIsCreateModalOpen,
    creating,
    setCreating,
    loading,
    updating,
    isEditModalOpen,
    setIsEditModalOpen,
    updateCompliance,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    recordToDelete,
    setRecordToDelete,
    currentPage,
    setCurrentPage,
    recordsPerPage,
    formData,
    setFormData,
    filteredRecords,
    totalPages,
    startIndex,
    paginatedRecords,
    handleCreateRecord,
    alertsList,
    alertsLoading,
    fetchAlerts,
    handleViewRecord,
    resetForm,
    handleDelete,
    summaryCards,
    fetchCompliance,
    handleEditRecord,
    handleUpdateRecord,
  };
}
