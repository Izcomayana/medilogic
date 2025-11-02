/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/utils/datetime';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type Props = {
  loading: boolean;
  paginatedInvoices: any[];
  filteredInvoices: any[];
  totalPages: number;
  startIndex: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
  handleViewDetails: any;
  selectedInvoice: any;
  handleDownloadInvoice: any;
};

export function ClientInvoicesTable({
  loading,
  filteredInvoices,
  paginatedInvoices,
  totalPages,
  startIndex,
  limit,
  setPage,
  page,
  handleViewDetails,
  handleDownloadInvoice,
}: Props) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return (
          <Badge className="bg-[#15941f] !text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'unpaid':
        return (
          <Badge className="bg-yellow-600 !text-white">
            <Clock className="h-3 w-3 mr-1" />
            Unpaid
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardContent className="p-0">
        {loading ? (
          <div className="p-6">
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Invoice No</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">
                      Generated On
                    </TableHead>
                    <TableHead className="text-gray-300">Amount</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableRow
                      key={i}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell>
                        <Skeleton className="h-4 w-32 bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20 bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-36 bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24 bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 bg-gray-700" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No invoices found
            </h3>
            <p className="text-gray-400">
              No invoices match your current filter.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Invoice No</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">
                      Generated On
                    </TableHead>
                    <TableHead className="text-gray-300">Amount</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInvoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="text-gray-300">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {getStatusBadge(invoice.status)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDateTime(invoice.generatedAt)}
                      </TableCell>
                      <TableCell className="text-white font-semibold flex items-center gap-1">
                        £{invoice.amount.toFixed(2)}
                      </TableCell>

                      <TableCell className="">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleViewDetails(invoice.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 px-6 pb-6">
                <div className="text-sm text-gray-400">
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + limit, filteredInvoices.length)} of{' '}
                  {filteredInvoices.length}
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="text-gray-300 hover:text-white"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="text-gray-300 hover:text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
