/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { getIncidentStatusBadge } from '@/utils/badge';

type IncidentDetailsProps = ReturnType<typeof useIncidentsBase>;

export function IncidentDetails({
  showDetailsModal,
  setShowDetailsModal,
  selectedIncident,
}: IncidentDetailsProps) {
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
              <div>
                <Label className="text-gray-400 text-sm">
                  Escalation Status
                </Label>
                <div className="mt-1">
                  {getEscalationBadge(selectedIncident.escalated)}
                </div>
              </div>
              =
              <div>
                <Label className="text-gray-400 text-sm">Current Status</Label>
                <div className="mt-1">
                  {getIncidentStatusBadge(selectedIncident.status)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{selectedIncident.timestamp}</span>
            </div>
          </div>
        )}

        {/* Files Section */}
        {selectedIncident?.files && (
          <div>
            <Label className="text-gray-400 text-sm">Attached Files</Label>
            {selectedIncident.files.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                {selectedIncident.files.map((file: any) => {
                  const fileUrl = `${file.s3_key}`;
                  const isImage = [
                    'jpg',
                    'jpeg',
                    'png',
                    'gif',
                    'webp',
                  ].includes(file.file_type?.toLowerCase());

                  return (
                    <div
                      key={file.id}
                      className="relative border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition"
                    >
                      {isImage ? (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={fileUrl}
                            alt={file.s3_key}
                            className="w-full h-32 object-cover"
                            loading="lazy"
                          />
                        </a>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-32 bg-gray-900 text-gray-400 text-xs">
                          <span className="truncate px-2">
                            {file.file_type.toUpperCase()}
                          </span>
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline mt-2"
                          >
                            View File
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm mt-2 italic">
                No files attached
              </p>
            )}
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
