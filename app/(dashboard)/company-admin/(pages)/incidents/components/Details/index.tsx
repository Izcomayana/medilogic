import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAdminIncidents } from '@/hooks/incidents/adminIncidents';
import { AlertCircle, Calendar, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type IncidentDetailsProps = ReturnType<typeof useAdminIncidents>;

export function IncidentDetails({
  showDetailsModal,
  setShowDetailsModal,
  selectedIncident,
  handleStatusChange,
  modalState,
  setModalState,
  handleAddNote,
}: IncidentDetailsProps) {
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
            {/* Incident Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-400 text-sm">Driver</Label>
                <p className="text-white font-medium mt-1">
                  {selectedIncident.severity}
                </p>
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Trip</Label>
                <p className="text-white font-medium mt-1">
                  {selectedIncident.title}
                </p>
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Type</Label>
                <p className="text-white font-medium mt-1">
                  {selectedIncident.incident_type}
                </p>
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Current Status</Label>
                <div className="mt-1">
                  {getStatusBadge(selectedIncident.status)}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-gray-400 text-sm">Description</Label>
              <div className="bg-gray-700 rounded p-3 border border-gray-600 mt-1">
                <p className="text-gray-300 text-sm">
                  {selectedIncident.description}
                </p>
              </div>
            </div>

            {/* Timestamp */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{selectedIncident.timestamp}</span>
            </div>

            {/* Status Change Section */}
            <div className="border-t border-gray-700 pt-4 mt-4">
              <Label className="text-gray-300 text-sm mb-3 block">
                Change Status
              </Label>
              <div className="flex gap-2">
                <Select
                  value={modalState.newStatus}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Needs Follow-up">
                      Needs Follow-up
                    </SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Internal Notes Section */}
            <div className="border-t border-gray-700 pt-4 mt-4">
              <Label className="text-gray-300 text-sm mb-2 block flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Internal Notes
              </Label>
              <Textarea
                value={modalState.internalNote}
                onChange={(e) =>
                  setModalState({
                    ...modalState,
                    internalNote: e.target.value,
                  })
                }
                placeholder="Add internal notes about this incident..."
                className="bg-gray-700 border-gray-600 text-white mb-2"
                rows={3}
              />
              <Button
                onClick={handleAddNote}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                Save Note
              </Button>
            </div>

            {/* Audit History */}
            <div className="border-t border-gray-700 pt-4 mt-4">
              <Label className="text-gray-300 text-sm mb-3 block">
                Audit History
              </Label>
              <div className="space-y-2">
                {selectedIncident?.auditHistory?.map((entry, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700 rounded p-3 border border-gray-600 text-sm"
                  >
                    <p className="text-white font-medium">{entry.action}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {entry.timestamp} by {entry.by}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
