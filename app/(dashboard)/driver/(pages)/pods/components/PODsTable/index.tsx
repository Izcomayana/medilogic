import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePods } from '@/app/(dashboard)/driver/hooks/usePODs';
import { FileText, File, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
import { useAuth } from '@/components/auth';

type PodsTableProps = ReturnType<typeof usePods>;

export function PodsTable({
  filteredPods,
  paginatedPods,
  dateFilter,
  formatDate,
  handleViewFiles,
  handleViewDetails,
  totalPages,
  startIndex,
  podsPerPage,
  setCurrentPage,
  currentPage,
  loadingPods,
  handleDeletePod,
  open,
  setOpen,
  deleting,
  selectedPod,
  setSelectedPod,
}: PodsTableProps) {
  const { role } = useAuth();

  return (
    <>
      {dateFilter?.from && (
        <p className="text-xs text-gray-400">
          Showing PODs from {dateFilter.from.toLocaleDateString()}
          {dateFilter.to && ` to ${dateFilter.to.toLocaleDateString()}`}
        </p>
      )}
      <Card className="dashboard-card">
        <CardContent className="p-0">
          {/* ✅ Show Skeletons while loading */}
          {loadingPods ? (
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 bg-gray-800">
                    <TableHead className="text-gray-300">
                      Delivered To
                    </TableHead>
                    <TableHead className="text-gray-300">Notes</TableHead>
                    <TableHead className="text-gray-300">Signature</TableHead>
                    <TableHead className="text-gray-300">Uploaded On</TableHead>
                    <TableHead className="text-gray-300">Files</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableRow
                      key={i}
                      className="border-gray-700 hover:bg-gray-800 transition"
                    >
                      <TableCell>
                        <Skeleton className="h-4 w-32 bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-64 bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-10 w-20 rounded bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24 bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16 bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-20 rounded bg-gray-700" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : filteredPods.length === 0 ? (
            // ✅ Your existing empty state
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No proofs of delivery yet
              </h3>
              <p className="text-gray-400">
                {dateFilter
                  ? 'No PODs match your current filters.'
                  : 'Upload a POD after completing your first trip.'}
              </p>
            </div>
          ) : (
            // ✅ Your existing table content
            <>
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800 bg-gray-800">
                      <TableHead className="text-gray-300">
                        Delivered To
                      </TableHead>
                      <TableHead className="text-gray-300">Signature</TableHead>
                      <TableHead className="text-gray-300">
                        Uploaded On
                      </TableHead>
                      <TableHead className="text-gray-300">Files</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPods.map((pod) => (
                      <TableRow
                        key={pod.id}
                        className="border-gray-700 hover:bg-gray-800 transition"
                      >
                        <TableCell className="text-gray-300 font-medium">
                          {pod.deliveredTo || '—'}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {pod.signature ? (
                            <div className="cursor-pointer">
                              <img
                                src={pod.signature}
                                alt="Signature"
                                className="h-10 w-auto rounded border border-gray-600 hover:opacity-80"
                              />
                            </div>
                          ) : (
                            <span className="text-gray-500 text-sm italic">
                              No signature
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatDate(pod.createdAt)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Badge
                            variant="outline"
                            className="border-gray-600 text-gray-300 cursor-pointer hover:bg-gray-700"
                            onClick={() => handleViewFiles(pod)}
                          >
                            <File className="h-3 w-3 mr-1" />
                            {pod.files?.length || 0} file
                            {pod.files?.length !== 1 ? 's' : ''}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {role === 'driver' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPod(pod); // ✅ store the pod to delete
                                  setOpen(true); // ✅ open confirmation dialog
                                }}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(pod)}
                              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:text-white hover:bg-gray-700"
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
                      className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700 disabled:opacity-50"
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
                      className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700 disabled:opacity-50"
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete POD</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this POD? This action cannot be
              undone and will permanently remove all attached files.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleting}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </AlertDialogCancel>

            {/* ✅ FIX HERE: call handleDeletePod with selected pod id */}
            <AlertDialogAction
              onClick={() => handleDeletePod(selectedPod?.id || '')}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? 'Deleting...' : 'Delete POD'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
