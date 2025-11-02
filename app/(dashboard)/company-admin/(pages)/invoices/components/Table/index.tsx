import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useInvoice } from '@/hooks/useInvoice';
import {
  FileText,
  Trash2,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/utils/datetime';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/components/auth';

type InvoicesTableProps = ReturnType<typeof useInvoice>;

export function InvoicesTable({
  loading,
  filteredInvoices,
  paginatedInvoices,
  setInvoiceToDelete,
  totalPages,
  startIndex,
  limit,
  setPage,
  page,
  setInvoiceToUpdate,
}: InvoicesTableProps) {
  const { role } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return (
          <Badge className="bg-[#15941f] !text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'unpiad':
        return (
          <Badge variant="secondary" className="bg-yellow-600 !text-white">
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
        return (
          <Badge variant="outline" className="text-white">
            {status}
          </Badge>
        );
    }
  };

  return (
    <>
      <Card className="dashboard-card">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6">
              <div className="rounded-md border border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-300">
                        Invoice No
                      </TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">
                        Generated On
                      </TableHead>
                      <TableHead className="text-gray-300">Amount</TableHead>
                      {role === 'admin' && (
                        <TableHead className="text-gray-300">Actions</TableHead>
                      )}
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
                          <Skeleton className="h-8 w-20 bg-gray-700" />
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
                No invoices match your current search and filter criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      {/* <TableHead className="text-gray-300">Client</TableHead> */}
                      <TableHead className="text-gray-300">
                        Invoice No
                      </TableHead>
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
                        {/* <TableCell className="text-gray-300">
                        {invoice.client}
                      </TableCell> */}
                        <TableCell className="text-gray-300">
                          {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell className="text-gray-100">
                          {getStatusBadge(invoice.status)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatDateTime(invoice.generatedAt)}
                        </TableCell>
                        <TableCell className="text-white font-semibold flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />£
                          {invoice.amount.toFixed(2)}
                        </TableCell>
                        {role === 'admin' && (
                          <TableCell className="items-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-gray-300 hover:bg-gray-700"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-gray-800 border-gray-700"
                              >
                                <DropdownMenuItem
                                  onClick={() =>
                                    setInvoiceToUpdate({
                                      id: invoice.id,
                                      status: invoice.status,
                                    })
                                  }
                                  className="text-gray-200 hover:bg-gray-700 cursor-pointer"
                                >
                                  <Edit className="h-4 w-4" />
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setInvoiceToDelete(invoice.id)}
                                  className="text-red-400 hover:bg-red-600 hover:text-white cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete Invoice
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 px-6 pb-6">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1}-
                    {Math.min(startIndex + limit, filteredInvoices.length)} of{' '}
                    {filteredInvoices.length}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
