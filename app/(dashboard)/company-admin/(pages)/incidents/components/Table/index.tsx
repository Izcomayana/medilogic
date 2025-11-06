import { Card, CardContent } from '@/components/ui/card';
import { useAdminIncidents } from '@/hooks/incidents/adminIncidents';
import { AlertCircle, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/utils/datetime';
import { getSeverityBadge } from '@/utils/badge';
import { Skeleton } from '@/components/ui/skeleton';

type IncidentTableProps = ReturnType<typeof useAdminIncidents>;

export function IncidentTable({
  filteredIncidents,
  // handleViewIncident,
  loadingAccidents,
}: IncidentTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return <Badge className="bg-blue-600 text-white">New</Badge>;
      case 'under review':
        return <Badge className="bg-yellow-600 text-white">Under Review</Badge>;
      case 'needs follow-up':
        return (
          <Badge className="bg-orange-600 text-white">Needs Follow-up</Badge>
        );
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // ✅ Skeleton Rows Builder
  const renderSkeletonRows = () => {
    return [...Array(5)].map((_, i) => (
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
        {/* <TableCell><Skeleton className="h-8 w-20 bg-gray-700" /></TableCell> */}
      </TableRow>
    ));
  };

  return (
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
                {/* <TableHead className="text-gray-300">Actions</TableHead> */}
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
                    {/* <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewIncident(incident)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
