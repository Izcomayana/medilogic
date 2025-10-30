'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';
import { api } from '@/lib/api';
import { DateRangeLocal } from '@/app/(dashboard)/components/DateRange';

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

export interface Invoice {
  issueDate: any;
  id: string;
  invoiceNumber: string;
  client: string;
  organization: string;
  amount: number;
  status: 'paid' | 'unpaid';
  generatedAt: string;
  dueDate: Date | null;
  referenceCode: string;
  startDate: string;
  endDate: string;
  billingNotes: string;
  trips: string[];
}

type InvoiceForm = {
  client: string;
  selectedTrips: string[];
  billingNotes: string;
  status: 'paid' | 'unpaid';
  dueDate: Date | null;
};

export function useInvoice() {
  const [clientTrips, setClientTrips] = useState<any[]>([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState<DateRangeLocal | undefined>(
    undefined
  );
  const [selectedInvoice, setSelectedInvoice] = useState<
    (typeof invoices)[0] | null
  >(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;
  const { user } = useProfile();

  const authorizedRequest = useAuthorizedRequest();

  const [formData, setFormData] = useState<InvoiceForm>({
    client: '',
    selectedTrips: [],
    billingNotes: '',
    status: 'unpaid',
    dueDate: null,
  });

  const resetForm = () => {
    setFormData({
      client: '',
      selectedTrips: [],
      billingNotes: '',
      status: 'unpaid',
      dueDate: null,
    });
  };

  const formatDateOnly = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`;

  useEffect(() => {
    if (!formData.client) {
      setClientTrips([]);
      return;
    }

    setTripsLoading(true);

    authorizedRequest(async (token) => {
      const res = await api.get(
        `/client/trips/client/${formData.client}/trips`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            status: 'completed',
            start_date: dateFilter?.from || undefined,
            end_date: dateFilter?.to || undefined,
          },
        }
      );

      setClientTrips(res.data.assigned_trips || []);
    }, 'fail to get client trips')
      .catch(() => setClientTrips([]))
      .finally(() => setTripsLoading(false));
  }, [formData.client, dateFilter]);

  const handleGenerateInvoice = async () => {
    if (!formData.client) {
      toast.error('Please select a client');
      return;
    }

    if (!dateFilter?.from || !dateFilter?.to) {
      toast.error('Please select a billing date range');
      return;
    }

    try {
      setGenerating(true);
      await authorizedRequest(async (token) => {
        const payload = {
          client_id: formData.client,
          organization_id: user?.organization.id,
          start_date: formatDateOnly(dateFilter.from!),
          end_date: formatDateOnly(dateFilter.to!),
          due_date: formData.dueDate
            ? formData.dueDate.toISOString()
            : undefined,
          status: formData.status,
          generated_at: new Date().toISOString(),
          reference_code: `INV-${Math.floor(Math.random() * 999999)}`,
          trips: formData.selectedTrips,
          notes: formData.billingNotes || '',
        };

        const res = await api.post('/invoices/generate', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const newInvoice: Invoice = {
          id: res.data.id,
          invoiceNumber: res.data.invoice_number,
          client: res.data.client_id,
          organization: res.data.organization_id,
          amount: res.data.amount,
          status: res.data.status,
          generatedAt: res.data.generated_at,
          dueDate: res.data.due_date,
          referenceCode: res.data.reference_code,
          startDate: res.data.start_date,
          endDate: res.data.end_date,
          issueDate: res.data.issueDate,

          // custom local fields (optional, not required by backend)
          billingNotes: formData.billingNotes,
          trips: formData.selectedTrips,
        };

        setInvoicesList((prev) => [newInvoice, ...prev]);
      }, 'fail to generate invoice');

      setIsGenerateModalOpen(false);
      resetForm();
      toast.success('Invoice generated successfully');
    } catch (error) {
      console.error('Generate invoice failed:', error);
      toast.error('Failed to generate invoice');
    } finally {
      setGenerating(false)
    }
  };

  const filteredInvoices = invoicesList.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      invoice.status.toLowerCase() === statusFilter.toLowerCase();

    // const matchesDate =
    //   dateFilter === 'all' || invoice.issueDate.startsWith(dateFilter);

    // return matchesSearch && matchesStatus && matchesDate;
    return matchesSearch && matchesStatus;
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

  const toggleTripSelection = (tripId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTrips: prev.selectedTrips.includes(tripId)
        ? prev.selectedTrips.filter((id) => id !== tripId)
        : [...prev.selectedTrips, tripId],
    }));
  };

  const calculateTotal = () => {
    return clientTrips
      .filter((trip) => formData.selectedTrips.includes(trip.trip_id))
      .reduce((sum, trip) => sum + trip.cost, 0);
  };

  return {
    clientTrips,
    tripsLoading,
    generating,
    invoices,
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
    toggleTripSelection,
    calculateTotal,
  };
}
