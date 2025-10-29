'use client';

import { useState } from 'react';
import { toast } from 'sonner';

const invoices = [
  {
    id: 'INV-0231',
    client: "King's Clinic",
    trips: ['TRP001', 'TRP002', 'TRP003'],
    amount: 240.0,
    issueDate: '2025-10-21',
    status: 'Paid',
    billingNotes: 'Monthly waste management services',
    createdBy: 'Admin User',
    createdAt: '2025-10-21 10:30',
    tripDetails: [
      { tripId: 'TRP001', description: 'Medical waste pickup', amount: 80.0 },
      { tripId: 'TRP002', description: 'Hazmat disposal', amount: 85.0 },
      {
        tripId: 'TRP003',
        description: 'General waste collection',
        amount: 75.0,
      },
    ],
  },
  {
    id: 'INV-0230',
    client: 'TechCorp Solutions',
    trips: ['TRP004', 'TRP005'],
    amount: 165.5,
    issueDate: '2025-10-20',
    status: 'Pending',
    billingNotes: 'Electronic waste disposal services',
    createdBy: 'Admin User',
    createdAt: '2025-10-20 14:15',
    tripDetails: [
      { tripId: 'TRP004', description: 'E-waste collection', amount: 90.0 },
      {
        tripId: 'TRP005',
        description: 'Recycling center delivery',
        amount: 75.5,
      },
    ],
  },
  {
    id: 'INV-0229',
    client: 'PharmaCare Industries',
    trips: ['TRP006'],
    amount: 120.0,
    issueDate: '2025-10-19',
    status: 'Overdue',
    billingNotes: 'Pharmaceutical waste management',
    createdBy: 'Admin User',
    createdAt: '2025-10-19 09:00',
    tripDetails: [
      { tripId: 'TRP006', description: 'Pharma waste pickup', amount: 120.0 },
    ],
  },
  {
    id: 'INV-0228',
    client: 'HealthCare Plus',
    trips: ['TRP007', 'TRP008'],
    amount: 195.75,
    issueDate: '2025-10-18',
    status: 'Paid',
    billingNotes: 'Hospital waste collection and disposal',
    createdBy: 'Admin User',
    createdAt: '2025-10-18 11:45',
    tripDetails: [
      { tripId: 'TRP007', description: 'Hospital waste pickup', amount: 100.0 },
      { tripId: 'TRP008', description: 'Biohazard disposal', amount: 95.75 },
    ],
  },
];

const clients = [
  "King's Clinic",
  'TechCorp Solutions',
  'PharmaCare Industries',
  'HealthCare Plus',
  'WasteTech Solutions',
];

const completedTrips = [
  {
    id: 'TRP001',
    client: "King's Clinic",
    description: 'Medical waste pickup',
    amount: 80.0,
  },
  {
    id: 'TRP002',
    client: "King's Clinic",
    description: 'Hazmat disposal',
    amount: 85.0,
  },
  {
    id: 'TRP003',
    client: "King's Clinic",
    description: 'General waste collection',
    amount: 75.0,
  },
  {
    id: 'TRP004',
    client: 'TechCorp Solutions',
    description: 'E-waste collection',
    amount: 90.0,
  },
  {
    id: 'TRP005',
    client: 'TechCorp Solutions',
    description: 'Recycling center delivery',
    amount: 75.5,
  },
  {
    id: 'TRP006',
    client: 'PharmaCare Industries',
    description: 'Pharma waste pickup',
    amount: 120.0,
  },
  {
    id: 'TRP007',
    client: 'HealthCare Plus',
    description: 'Hospital waste pickup',
    amount: 100.0,
  },
  {
    id: 'TRP008',
    client: 'HealthCare Plus',
    description: 'Biohazard disposal',
    amount: 95.75,
  },
];

export function useInvoice() {
  const [invoicesList, setInvoicesList] = useState(invoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<
    (typeof invoices)[0] | null
  >(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  // Form state for generate invoice
  const [formData, setFormData] = useState({
    client: '',
    selectedTrips: [] as string[],
    billingNotes: '',
  });

  const resetForm = () => {
    setFormData({
      client: '',
      selectedTrips: [],
      billingNotes: '',
    });
  };
  const filteredInvoices = invoicesList.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      invoice.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesDate =
      dateFilter === 'all' || invoice.issueDate.startsWith(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
  const startIndex = (currentPage - 1) * invoicesPerPage;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + invoicesPerPage
  );

  const handleViewDetails = (invoice: (typeof invoices)[0]) => {
    setSelectedInvoice(invoice);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (invoiceId: string) => {
    setInvoicesList((prev) =>
      prev.filter((invoice) => invoice.id !== invoiceId)
    );
    setInvoiceToDelete(null);
    toast.success('Invoice deleted successfully');
  };

  const handleGenerateInvoice = () => {
    if (!formData.client || formData.selectedTrips.length === 0) {
      toast.error('Please select a client and at least one trip');
      return;
    }

    // const selectedTripDetails = completedTrips.filter((trip) => formData.selectedTrips.includes(trip.id))
    const selectedTripDetails = completedTrips
      .filter((trip) => formData.selectedTrips.includes(trip.id))
      .map((trip) => ({
        tripId: trip.id, // convert field name
        description: trip.description,
        amount: trip.amount,
      }));
    const totalAmount = selectedTripDetails.reduce(
      (sum, trip) => sum + trip.amount,
      0
    );

    const newInvoice = {
      id: `INV-${String(invoicesList.length + 1).padStart(4, '0')}`,
      client: formData.client,
      trips: formData.selectedTrips,
      amount: totalAmount,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      billingNotes: formData.billingNotes,
      createdBy: 'Admin User',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      tripDetails: selectedTripDetails,
    };

    setInvoicesList((prev) => [newInvoice, ...prev]);
    setIsGenerateModalOpen(false);
    resetForm();
    toast.success('Invoice generated successfully');
  };

  const handleExport = (type: 'csv') => {
    const headers = [
      'Invoice ID',
      'Client',
      'Trips',
      'Amount',
      'Issue Date',
      'Status',
    ];
    const rows = filteredInvoices.map((inv) => [
      inv.id,
      inv.client,
      inv.trips.join(', '),
      `£${inv.amount.toFixed(2)}`,
      inv.issueDate,
      inv.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV export completed');
  };

  const getClientTrips = (client: string) => {
    return completedTrips.filter((trip) => trip.client === client);
  };

  const toggleTripSelection = (tripId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTrips: prev.selectedTrips.includes(tripId)
        ? prev.selectedTrips.filter((id) => id !== tripId)
        : [...prev.selectedTrips, tripId],
    }));
  };

  const calculateTotal = () => {
    return completedTrips
      .filter((trip) => formData.selectedTrips.includes(trip.id))
      .reduce((sum, trip) => sum + trip.amount, 0);
  };

  return {
    invoices,
    clients,
    completedTrips,
    invoicesList,
    setInvoicesList,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    selectedInvoice,
    setSelectedInvoice,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isGenerateModalOpen,
    setIsGenerateModalOpen,
    invoiceToDelete,
    setInvoiceToDelete,
    currentPage,
    setCurrentPage,
    invoicesPerPage,
    formData,
    setFormData,
    filteredInvoices,
    totalPages,
    startIndex,
    paginatedInvoices,
    handleViewDetails,
    handleDelete,
    resetForm,
    handleGenerateInvoice,
    handleExport,
    getClientTrips,
    toggleTripSelection,
    calculateTotal,
  };
}
