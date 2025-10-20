import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePods } from '@/app/(dashboard)/driver/hooks/usePODs';
import { FileText, File, Eye, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type PodsTableProps = ReturnType<typeof usePods>;

export function PodsTable({
  filteredPods,
  searchTerm,
  paginatedPods,
  clientFilter,
  statusFilter,
  dateFilter,
  formatDate,
  handleViewFiles,
  handleViewDetails,
  totalPages,
  startIndex,
  podsPerPage,
  setCurrentPage,
  currentPage,
}: PodsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <Badge className="bg-[#15941f] text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Delivered
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="secondary" className="bg-yellow-600 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card className="dashboard-card">
        <CardContent className="p-0">
          {filteredPods.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No proofs of delivery yet
              </h3>
              <p className="text-gray-400">
                {searchTerm ||
                clientFilter !== 'all' ||
                statusFilter !== 'all' ||
                dateFilter !== 'all'
                  ? 'No PODs match your current filters.'
                  : 'Upload a POD after completing your first trip.'}
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800 bg-gray-800">
                      <TableHead className="text-gray-300">POD ID</TableHead>
                      <TableHead className="text-gray-300">Trip ID</TableHead>
                      <TableHead className="text-gray-300">Client</TableHead>
                      <TableHead className="text-gray-300">
                        Delivery Date
                      </TableHead>
                      <TableHead className="text-gray-300">Files</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPods.map((pod) => (
                      <TableRow
                        key={pod.id}
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        <TableCell className="font-medium text-white">
                          {pod.id}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {pod.tripId}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {pod.client}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatDate(pod.deliveryDate)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Badge
                            variant="outline"
                            className="border-gray-600 text-gray-300 cursor-pointer hover:bg-gray-700"
                            onClick={() => handleViewFiles(pod)}
                          >
                            <File className="h-3 w-3 mr-1" />
                            {pod.files.length} file
                            {pod.files.length !== 1 ? 's' : ''}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(pod.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(pod)}
                              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </TableCell>
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
                    {Math.min(startIndex + podsPerPage, filteredPods.length)} of{' '}
                    {filteredPods.length}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
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
