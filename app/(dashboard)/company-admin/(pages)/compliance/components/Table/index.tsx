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
}: CompTableProps) {
  const getScoreBadge = (score: number) => {
    if (score >= 85)
      return <Badge className="bg-green-600 text-white">{score}%</Badge>;
    if (score >= 70)
      return <Badge className="bg-yellow-600 text-white">{score}%</Badge>;
    return <Badge variant="destructive">{score}%</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant':
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Compliant
          </Badge>
        );
      case 'review required':
        return (
          <Badge className="bg-yellow-600 text-white">
            <AlertCircle className="h-3 w-3 mr-1" />
            Review Required
          </Badge>
        );
      case 'non-compliant':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Non-Compliant
          </Badge>
        );
      case 'pending':
        return <Badge className="bg-blue-600 text-white">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardContent className="p-0">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No compliance records found
            </h3>
            <p className="text-gray-400">
              No records match your search and filter criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-gray-700 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">
                      Organization
                    </TableHead>
                    <TableHead className="text-gray-300">Score</TableHead>
                    <TableHead className="text-gray-300">Last Audit</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Alerts</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecords.map((record) => (
                    <TableRow
                      key={record.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="font-medium text-white">
                        {record.organization}
                      </TableCell>
                      <TableCell>
                        {getScoreBadge(record.complianceScore)}
                      </TableCell>
                      <TableCell className="text-gray-300 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {record.lastAudit}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          {record.alerts}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewRecord(record)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button> */}
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
                              <DropdownMenuItem className="text-gray-300 hover:bg-gray-600">
                                <Download className="mr-2 h-4 w-4" />
                                Download Evidence
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
                  {Math.min(
                    startIndex + recordsPerPage,
                    filteredRecords.length
                  )}{' '}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
