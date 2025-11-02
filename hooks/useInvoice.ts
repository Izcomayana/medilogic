'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';
import { api } from '@/lib/api';
import { DateRangeLocal } from '@/app/(dashboard)/components/DateRange';

export interface Invoice {
  issueDate: any;
  id: string;
  invoiceNumber: string;
  client: string;
  organization: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
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
  status: 'paid' | 'unpaid' | 'overdue';
  dueDate: Date | null;
};

export function useInvoice() {
  const [clientTrips, setClientTrips] = useState<any[]>([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [status, setStatus] = useState<'paid' | 'unpaid' | 'overdue' | null>(
    null
  );
  const [dateRange, setDateRange] = useState<DateRangeLocal | undefined>();
  const [dateFilter, setDateFilter] = useState<DateRangeLocal | undefined>(
    undefined
  );
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  const [invoiceToUpdate, setInvoiceToUpdate] = useState<{
    id: string;
    status: string;
  } | null>(null);

  const { user } = useProfile();

  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

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
      setGenerating(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      await authorizedRequest(async (token) => {
        const res = await api.get('/invoices/admin', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            client_id: clientId || undefined,
            status: status || undefined,
            due_date_from: dateRange?.from
              ? dateRange.from.toISOString()
              : undefined,
            due_date_to: dateRange?.to ? dateRange.to.toISOString() : undefined,
            skip,
            limit,
          },
        });
        const formatted = res.data.map(
          (inv: any): Invoice => ({
            id: inv.id,
            invoiceNumber: inv.invoice_number,
            client: inv.client_id,
            organization: inv.organization_id,
            status: inv.status,
            generatedAt: inv.generated_at,
            dueDate: inv.due_date ? new Date(inv.due_date) : null,
            referenceCode: inv.reference_code,
            startDate: inv.start_date,
            endDate: inv.end_date,
            amount: inv.amount,
            issueDate: inv.issue_date,
            billingNotes: inv.billing_notes,
            trips: inv.trips,
          })
        );

        setInvoicesList(formatted);
      }, 'fail to get invoices');
    } catch (err: any) {
      console.log(err?.response?.data?.message || 'Failed to load invoices.');
      toast.error('Failed to get invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [clientId, status, page]);

  const filteredInvoices = invoicesList.filter((invoice) => {
    const matchesStatus = status === null || invoice.status === status;
    const matchesClient = clientId === null || invoice.client === clientId;

    const matchesDate =
      (!dateRange?.from ||
        (invoice.dueDate && invoice.dueDate >= dateRange.from)) &&
      (!dateRange?.to || (invoice.dueDate && invoice.dueDate <= dateRange.to));

    return matchesStatus && matchesClient && matchesDate;
  });

  const totalPages = Math.ceil(filteredInvoices.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + limit
  );

  const handleDelete = async (invoiceId: string) => {
    try {
      // Call the backend
      await authorizedRequest(async (token) => {
        await api.delete(`/invoices/${invoiceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }, 'fail to delete');

      // Update UI
      setInvoicesList((prev) =>
        prev.filter((invoice) => invoice.id !== invoiceId)
      );
      setInvoiceToDelete(null);
      toast.success('Invoice deleted successfully');
    } catch (error) {
      toast.error('Something went wrong while deleting');
      console.error(error);
    }
  };

  const handleExport = async () => {
    toast.loading('Preparing export...', { id: 'export' });

    try {
      await authorizedRequest(async (token) => {
        const response = await api.get(`/invoices/export`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            client_id: clientId || undefined,
            status: status || undefined,
          },
          responseType: 'blob',
          validateStatus: () => true, // ✅ prevents auto throwing, so we can inspect status
        });

        if (response.status === 404) {
          toast.error('No invoices available to export', { id: 'export' });
          return;
        }

        if (response.status !== 200) {
          toast.error('Failed to export invoices', { id: 'export' });
          return;
        }

        // ✅ Successful export
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success('Invoices exported successfully', { id: 'export' });
      }, 'fail to export');
    } catch (error) {
      toast.error('Failed to export invoices', { id: 'export' });
      console.error(error);
    }
  };

  const updateInvoiceStatus = async (invoiceId: string, newStatus: string) => {
    try {
      toast.loading('Updating status...', { id: 'status-update' });

      await authorizedRequest(async (token) => {
        const res = await api.patch(
          `/invoices/${invoiceId}/update-status`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update the invoice list state
        setInvoicesList((prev) =>
          prev.map((inv) =>
            inv.id === invoiceId ? { ...inv, status: res.data.status } : inv
          )
        );
      }, 'Failed to update invoice status');

      toast.success('Status updated successfully ✅', { id: 'status-update' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status', { id: 'status-update' });
    }
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
    loading,
    invoicesList,
    setInvoicesList,
    status,
    setStatus,
    clientId,
    setClientId,
    dateRange,
    setDateRange,
    dateFilter,
    setDateFilter,
    selectedInvoice,
    setSelectedInvoice,
    isGenerateModalOpen,
    setIsGenerateModalOpen,
    invoiceToDelete,
    setInvoiceToDelete,
    invoiceToUpdate,
    setInvoiceToUpdate,
    page,
    setPage,
    limit,
    formData,
    setFormData,
    filteredInvoices,
    totalPages,
    startIndex,
    paginatedInvoices,
    handleDelete,
    resetForm,
    handleGenerateInvoice,
    handleExport,
    updateInvoiceStatus,
    toggleTripSelection,
    calculateTotal,
  };
}
