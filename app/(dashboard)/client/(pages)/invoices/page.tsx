/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PageHeader } from '../../../components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Filter } from 'lucide-react';
import { useClientInvoice } from '../../hooks/useInvoice';
import DateRangeFilter from '@/app/(dashboard)/components/DateRange';
import { ClientInvoicesTable } from './components/Table';
import { InvoiceDetails } from './components/Details';

export default function InvoicesPage() {
  const invoiceState = useClientInvoice();

  const { status, setStatus, dateRange, setDateRange, filteredInvoices } =
    invoiceState;
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Invoices"
        subtitle="Manage and track client invoices"
      />

      <main className="flex-1 p-6">
        {/* Filters and Controls */}
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoices Management ({filteredInvoices.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              {/* STATUS FILTER */}
              <Select
                value={status || 'all'}
                onValueChange={(value) =>
                  setStatus(value === 'all' ? null : (value as any))
                }
              >
                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white flex gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <DateRangeFilter value={dateRange} onChange={setDateRange} />
            </div>
          </CardContent>
        </Card>

        <ClientInvoicesTable {...invoiceState} />
      </main>

      <InvoiceDetails {...invoiceState} />
    </div>
  );
}
