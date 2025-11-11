import { AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const mockComplianceRecords = [
  {
    id: 'COMP-001',
    organization: 'Meditrans Ltd',
    complianceScore: 92,
    lastAudit: '14 days ago',
    status: 'Compliant',
    alerts: 0,
    complianceType: 'Document Audit',
    description: 'Annual waste management compliance review completed',
    uploadedDate: '2025-10-21',
    evidenceFiles: ['audit_report_2025.pdf', 'certificate_of_compliance.pdf'],
    notes: 'All systems compliant. Next audit scheduled for Q1 2026.',
  },
  {
    id: 'COMP-002',
    organization: 'St. Mary Clinic',
    complianceScore: 74,
    lastAudit: '2 days ago',
    status: 'Review Required',
    alerts: 2,
    complianceType: 'Safety Audit',
    description: 'Safety training certificates need renewal',
    uploadedDate: '2025-10-24',
    evidenceFiles: ['training_checklist.pdf'],
    notes:
      '2 staff members need updated certifications. Action plan in progress.',
  },
  {
    id: 'COMP-003',
    organization: 'Northshire Trust',
    complianceScore: 55,
    lastAudit: '28 days ago',
    status: 'Non-Compliant',
    alerts: 4,
    complianceType: 'Shipment Breach',
    description: 'Missing disposal certificates for Q3 shipments',
    uploadedDate: '2025-09-20',
    evidenceFiles: [],
    notes:
      'Critical: 3 shipments without proper documentation. Immediate corrective action required.',
  },
  {
    id: 'COMP-004',
    organization: 'HealthCare Plus',
    complianceScore: 88,
    lastAudit: '10 days ago',
    status: 'Compliant',
    alerts: 0,
    complianceType: 'Document Audit',
    description: 'Quarterly compliance check passed',
    uploadedDate: '2025-10-20',
    evidenceFiles: ['quarterly_report.pdf'],
    notes: 'All protocols followed. System working efficiently.',
  },
];

const alertsList = [
  {
    id: 'ALR-001',
    alert: 'Waste training expired',
    organization: 'Northshire Trust',
    triggeredOn: 'Jan 12',
  },
  {
    id: 'ALR-002',
    alert: 'Missing disposal certificates',
    organization: 'St. Mary Clinic',
    triggeredOn: 'Jan 10',
  },
];

export function useCompliance() {
  const [records, setRecords] = useState(mockComplianceRecords);
  const [selectedRecord, setSelectedRecord] = useState<
    (typeof mockComplianceRecords)[0] | null
  >(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [formData, setFormData] = useState({
    organization: '',
    complianceType: '',
    description: '',
    status: 'Pending',
    notes: '',
  });

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.organization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      record.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedRecords = filteredRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handleViewRecord = (record: (typeof mockComplianceRecords)[0]) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  const handleCreateRecord = () => {
    if (!formData.organization || !formData.complianceType) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newRecord = {
      id: `COMP-${String(records.length + 1).padStart(3, '0')}`,
      organization: formData.organization,
      complianceType: formData.complianceType,
      description: formData.description,
      status: formData.status as
        | 'Pending'
        | 'Compliant'
        | 'Non-Compliant'
        | 'Review Required',
      uploadedDate: new Date().toISOString().split('T')[0],
      complianceScore:
        formData.status === 'Compliant'
          ? 90
          : formData.status === 'Review Required'
            ? 70
            : 50,
      lastAudit: 'Today',
      alerts:
        formData.status === 'Non-Compliant'
          ? 3
          : formData.status === 'Review Required'
            ? 1
            : 0,
      evidenceFiles: [],
      notes: formData.notes,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setIsCreateModalOpen(false);
    resetForm();
    toast.success('Compliance record created successfully');
  };

  const resetForm = () => {
    setFormData({
      organization: '',
      complianceType: '',
      description: '',
      status: 'Pending',
      notes: '',
    });
  };

  const handleDelete = (recordId: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== recordId));
    setRecordToDelete(null);
    toast.success('Compliance record deleted successfully');
  };

  const summaryCards = [
    {
      title: 'Total Compliance Issues',
      value: records.length,
      icon: FileText,
      color: 'bg-blue-600',
    },
    {
      title: 'Open Issues',
      value: records.filter((r) => r.status !== 'Compliant').length,
      icon: AlertCircle,
      color: 'bg-yellow-600',
    },
    {
      title: 'Resolved This Month',
      value: records.filter((r) => r.status === 'Compliant').length,
      icon: CheckCircle,
      color: 'bg-green-600',
    },
    {
      title: 'Alerts Triggered',
      value: alertsList.length,
      icon: AlertCircle,
      color: 'bg-red-600',
    },
  ];

  return {
    mockComplianceRecords,
    alertsList,
    records,
    setRecords,
    selectedRecord,
    setSelectedRecord,
    showDetailsModal,
    setShowDetailsModal,
    isCreateModalOpen,
    setIsCreateModalOpen,
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
    handleViewRecord,
    resetForm,
    handleDelete,
    summaryCards,
  };
}
