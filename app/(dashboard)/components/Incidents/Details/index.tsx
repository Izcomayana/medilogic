// src/components/IncidentDetails.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/utils/datetime';
import { getSeverityBadge } from '@/utils/badge';
import { useIncidentsBase } from '@/hooks/incidents/base';
import { useAuth } from '@/components/auth';

type IncidentDetailsProps = ReturnType<typeof useIncidentsBase>;

export function IncidentDetails({
  showDetailsModal,
  setShowDetailsModal,
  selectedIncident,
}: IncidentDetailsProps) {
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

  const getEscalationBadge = (isEscalated: boolean) => {
    return isEscalated ? (
      <div className="flex items-center gap-2">
        <ArrowUpCircle className="text-orange-500 w-4 h-4" />
        <Badge className="bg-orange-600 text-white">Escalated</Badge>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <ArrowDownCircle className="text-gray-400 w-4 h-4" />
        <Badge variant="outline" className="text-gray-300 border-gray-600">
          Not Escalated
        </Badge>
      </div>
    );
  };

  const { role } = useAuth();

  return (
    <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {selectedIncident?.id}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Review and manage incident details
          </DialogDescription>
        </DialogHeader>

        {selectedIncident && (
          <div className="space-y-6 py-4">
            <div className="flex flex-col gap-4">
              <div>
                <Label className="text-gray-400 text-sm">Title</Label>
                <p className="text-white font-medium mt-1">
                  {selectedIncident.title}
                </p>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">Description</Label>
                <p className="text-gray-300 text-sm mt-1">
                  {selectedIncident.description}
                </p>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">Type</Label>
                <p className="text-white font-medium mt-1">
                  {selectedIncident.incident_type}
                </p>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">Severity</Label>
                <p className="text-white font-medium mt-1">
                  {getSeverityBadge(selectedIncident.severity)}
                </p>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">Location</Label>
                <p className="text-white font-medium mt-1">
                  {selectedIncident.location}
                </p>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">Created At</Label>
                <p className="text-white font-medium mt-1">
                  {formatDateTime(selectedIncident.created_at || '')}
                </p>
              </div>


              {role === 'admin' ||
                (role === 'regulator' && (
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Escalation Status
                    </Label>
                    <div className="mt-1">
                      {getEscalationBadge(selectedIncident.escalated)}
                    </div>
                  </div>
                ))}

              <div>
                <Label className="text-gray-400 text-sm">Current Status</Label>
                <div className="mt-1">
                  {getStatusBadge(selectedIncident.status)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{selectedIncident.timestamp}</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
