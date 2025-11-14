import {
  Eye,
  Download,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCompliance } from '@/hooks/useCompliance';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ComplianceFormModal } from '../Update';

type CompTableProps = ReturnType<typeof useCompliance>;

export function ComplianceTable({
  filteredRecords,
  paginatedRecords,
  handleViewRecord,
  setRecordToDelete,
  totalPages,
  startIndex,
  recordsPerPage,
  currentPage,
  setCurrentPage,
  loading,
  updating,
  isEditModalOpen,
  handleEditRecord,
  handleUpdateRecord,
  setIsEditModalOpen,
  formData,
  setFormData,
}: CompTableProps) {
  const renderSkeletonRows = () => (
    <TableBody>
      {[...Array(3)].map((_, i) => (
        <TableRow key={i} className="border-gray-700">
          <TableCell>
            <Skeleton className="h-4 w-24 bg-gray-700" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-36 bg-gray-700" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-8 bg-gray-700" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-12 bg-gray-700" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16 bg-gray-700" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  const getStatusBadge = (status: string) => {
    if (!status)
      return (
        <Badge variant="outline" className="text-gray-400">
          Unknown
        </Badge>
      );

    switch (status.toLowerCase()) {
      case 'compliant':
      case 'resolved':
      case 'closed':
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Compliant
          </Badge>
        );
      case 'non-compliant':
      case 'escalated':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Non-Compliant
          </Badge>
        );
      case 'pending':
        return <Badge className="bg-blue-600 text-white">Pending</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-600 text-white">Under Review</Badge>;
      default:
        return (
          <Badge variant="outline" className="text-gray-400">
            {status}
          </Badge>
        );
    }
  };

  const renderTableRows = () => (
    <TableBody>
      {paginatedRecords.map((record) => (
        <TableRow key={record.id} className="border-gray-700 hover:bg-gray-800">
          <TableCell>{getStatusBadge(record.audit_status)}</TableCell>

          <TableCell className="text-gray-300 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {record.last_audit_date
              ? new Date(record.last_audit_date).toLocaleDateString()
              : '—'}
          </TableCell>

          <TableCell>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              {record.escalation_level || 'none'}
            </Badge>
          </TableCell>

          <TableCell>
            {record.auto_alert_enabled ? (
              <Badge className="bg-green-600 text-white">On</Badge>
            ) : (
              <Badge variant="destructive">Off</Badge>
            )}
          </TableCell>

          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-700"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-gray-700 border-gray-600"
              >
                <DropdownMenuItem
                  className="text-gray-300 hover:bg-gray-600"
                  onClick={() => handleViewRecord(record)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>

                {/* <DropdownMenuItem
                  className="text-gray-300 hover:bg-gray-600"
                  onClick={() =>
                    record.iso_27001_certificate_url &&
                    window.open(record.iso_27001_certificate_url, '_blank')
                  }
                  disabled={!record.iso_27001_certificate_url}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </DropdownMenuItem> */}

                <DropdownMenuItem
                  className="text-gray-300 hover:bg-gray-600"
                  onClick={() => handleEditRecord(record)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Edit Record
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-400 hover:bg-gray-600"
                  onClick={() => setRecordToDelete(record.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <>
      <Card className="dashboard-card">
        <CardContent className="p-0">
          <div className="rounded-md border border-gray-700 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Audit Status</TableHead>
                  <TableHead className="text-gray-300">Last Audit</TableHead>
                  <TableHead className="text-gray-300">
                    Escalation Level
                  </TableHead>
                  <TableHead className="text-gray-300">Auto Alert</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                renderSkeletonRows()
              ) : paginatedRecords.length > 0 ? (
                renderTableRows()
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">
                          No compliance records found
                        </h3>
                        <p className="text-gray-400">
                          No records match your search or filter criteria.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 px-6 pb-6">
              <div className="text-sm text-gray-400">
                Showing {startIndex + 1}–
                {Math.min(startIndex + recordsPerPage, filteredRecords.length)}{' '}
                of {filteredRecords.length}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
        </CardContent>
      </Card>

      <ComplianceFormModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleUpdateRecord}
        submitting={updating}
        mode="update"
      />
    </>
  );
}
