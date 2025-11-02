/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function useClientInvoice() {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeLocal | undefined>();
  const [status, setStatus] = useState<'paid' | 'unpaid' | 'overdue' | null>(
    null
  );
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const authorizedRequest = useAuthorizedRequest();

  const { user } = useProfile();
  const clientId = user?.user_id || undefined;

  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      await authorizedRequest(async (token) => {
        const res = await api.get(`/invoices/client/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
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
    if (!clientId) return;
    fetchInvoices();
  }, [clientId, status, page]);

  const filteredInvoices = invoicesList.filter((invoice) => {
    const matchesStatus = status === null || invoice.status === status;

    const matchesDate =
      (!dateRange?.from ||
        (invoice.dueDate && invoice.dueDate >= dateRange.from)) &&
      (!dateRange?.to || (invoice.dueDate && invoice.dueDate <= dateRange.to));

    return matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredInvoices.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + limit
  );

  const handleViewDetails = async (invoiceId: string) => {
    try {
      setLoading(true);
      await authorizedRequest(async (token) => {
        const res = await api.get(`/invoices/${invoiceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const inv = res.data;

        setSelectedInvoice({
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
        });

        setIsDetailsModalOpen(true);
      }, 'Failed to load invoice details');
    } catch (err: any) {
      toast.error('Unable to load invoice details');
      console.log('error:', err)
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (
    invoiceId: string,
    invoiceNumber?: string
  ) => {
    toast.loading('Preparing invoice download...', { id: 'download' });

    try {
      await authorizedRequest(async (token) => {
        const response = await api.get(`/invoices/${invoiceId}/download`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
          validateStatus: () => true,
        });

        if (response.status === 404) {
          toast.error('Invoice not found', { id: 'download' });
          return;
        }

        if (response.status !== 200) {
          toast.error('Failed to download invoice', { id: 'download' });
          return;
        }

        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `${invoiceNumber || invoiceId}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success('Invoice downloaded successfully', { id: 'download' });
      }, 'failed to download invoice');
    } catch (error) {
      toast.error('Failed to download invoice', { id: 'download' });
      console.error(error);
    }
  };

  return {
    loading,
    status,
    setStatus,
    dateRange,
    setDateRange,
    filteredInvoices,
    paginatedInvoices,
    totalPages,
    startIndex,
    limit,
    page,
    setPage,
    selectedInvoice,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    handleViewDetails,
    handleDownloadInvoice,
  };
}
