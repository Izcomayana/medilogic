/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Calendar, Edit, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/utils/datetime';
import { getSeverityBadge } from '@/utils/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useIncidentsBase } from '@/hooks/incidents/base';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, SkipBack, SkipForward } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import UpdateIncident from '../Update';

type IncidentTableProps = ReturnType<typeof useIncidentsBase>;

export function IncidentTable({
  filteredIncidents,
  handleViewDetails,
  loadingAccidents,
  selectedIncident,
  setSelectedIncident,
  updateIncidentStatus,
  showStatusModal,
  setShowStatusModal,
  toggleIncidentEscalation,
  page,
  totalPages,
  nextPage,
  prevPage,
}: IncidentTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge className="bg-blue-600 text-white">Pending</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-600 text-white">Under Review</Badge>;
      case 'escalated':
        return <Badge className="bg-orange-600 text-white">Escalated</Badge>;
      case 'on_site':
        return <Badge className="bg-gray-200 text-white">On Site</Badge>;
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-red-600 text-white">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // ✅ Skeleton Rows Builder
  const renderSkeletonRows = () => {
    return [...Array(10)].map((_, i) => (
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
        <TableCell>
          <Skeleton className="h-2 w-8 bg-gray-700" />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Card className="dashboard-card">
        <CardContent className="p-0">
          <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Severity</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Reported Date</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loadingAccidents ? (
                  renderSkeletonRows()
                ) : filteredIncidents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">
                        No incidents found
                      </h3>
                      <p className="text-gray-400">
                        No incidents match your search and filter criteria
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIncidents.map((incident) => (
                    <TableRow
                      key={incident.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="text-gray-300">
                        {incident.title}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {incident.incident_type}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {getSeverityBadge(incident.severity)}
                      </TableCell>
                      <TableCell>{getStatusBadge(incident.status)}</TableCell>
                      <TableCell className="text-gray-300 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDateTime(incident.created_at || '')}
                        </div>
                      </TableCell>
                      <TableCell>
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
                              onClick={() => {
                                setSelectedIncident(incident); // ✅ select the row data
                                setShowStatusModal(true); // ✅ now open modal
                              }}
                              className="text-gray-200 hover:bg-gray-700 cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                              Update
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleViewDetails(incident)}
                              className="text-gray-200 hover:bg-gray-700 cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="flex justify-center items-center gap-4 my-6">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={page === 1}
                className="p-2 bg-gray-700 rounded-lg flex disabled:opacity-50"
              >
                <SkipBack />
                Prev
              </Button>

              <span className="text-white">
                Page {page} of {totalPages || 1}
              </span>

              <Button
                onClick={nextPage}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-gray-700 rounded-lg flex disabled:opacity-50"
              >
                Next
                <SkipForward />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <UpdateIncident
        open={showStatusModal}
        setOpen={setShowStatusModal}
        incident={selectedIncident}
        updateIncidentStatus={updateIncidentStatus}
        toggleIncidentEscalation={toggleIncidentEscalation}
        onStatusUpdated={(newStatus) =>
          setSelectedIncident((prev: any) => ({ ...prev, status: newStatus }))
        }
      />
    </>
  );
}
