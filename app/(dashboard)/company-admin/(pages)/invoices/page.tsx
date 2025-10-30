'use client';

import { PageHeader } from '../../../components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { FileText, Search, Calendar, Filter, Download } from 'lucide-react';
import { useInvoice } from '@/hooks/useInvoice';
import { InvoicesTable } from './components/Table';
// import { InvoiceDetails } from './components/Details';
import { GenerateInvoice } from './components/Generate';
import DateRangeFilter from '@/app/(dashboard)/components/DateRange';
import { useUsers } from '@/hooks/useUsers';

export default function InvoicesPage() {
  const invoiceState = useInvoice();

  const {
    clientId,
    setClientId,
    status,
    setStatus,
    dateRange,
    setDateRange,
    invoiceToDelete,
    setInvoiceToDelete,
    filteredInvoices,
    handleDelete,
    handleExport,
  } = invoiceState;

  const { users } = useUsers();
  const clients = users.filter((user) => user.role === 'client');

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
              <div className="md:flex gap-2">
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="border-gray-600 text-gray-700 my-2 md:my-0 hover:text-gray-300 hover:bg-gray-700"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>

                <GenerateInvoice {...invoiceState} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <Select
                value={clientId || 'all'}
                onValueChange={(v) => setClientId(v === 'all' ? null : v)}
              >
                <SelectTrigger className="w-[200px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Client" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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

        <InvoicesTable {...invoiceState} />
      </main>

      {/* <InvoiceDetails {...invoiceState} /> */}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!invoiceToDelete}
        onOpenChange={() => setInvoiceToDelete(null)}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invoice</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this invoice <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => invoiceToDelete && handleDelete(invoiceToDelete)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Invoice
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
