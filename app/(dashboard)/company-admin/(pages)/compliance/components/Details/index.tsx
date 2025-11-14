import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCompliance } from '@/hooks/useCompliance';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ComplianceDetailsProps = ReturnType<typeof useCompliance>;

export function ComplianceDetails({
  showDetailsModal,
  setShowDetailsModal,
  selectedRecord,
}: ComplianceDetailsProps) {
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
    <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {selectedRecord?.organization}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Compliance record details
          </DialogDescription>
        </DialogHeader>

        {selectedRecord && (
          <div className="space-y-6 py-4">
            {/* Header Section */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-400 text-sm">
                  Compliance Score
                </Label>
                <div className="mt-2 flex items-center gap-2">
                  {getScoreBadge(selectedRecord.complianceScore)}
                  <span className="text-gray-300">Health Score</span>
                </div>
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Status</Label>
                <div className="mt-2">
                  {getStatusBadge(selectedRecord.status)}
                </div>
              </div>
            </div>

            {/* Record Information */}
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-white font-semibold mb-4">
                Record Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm">Record ID</Label>
                  <p className="text-white mt-1">{selectedRecord.id}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">
                    Compliance Type
                  </Label>
                  <p className="text-white mt-1">
                    {selectedRecord.complianceType}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Last Audit</Label>
                  <p className="text-gray-300 flex items-center gap-1 mt-1">
                    <Calendar className="h-4 w-4" />
                    {selectedRecord.lastAudit}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Uploaded Date</Label>
                  <p className="text-white mt-1">
                    {selectedRecord.uploadedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-700 pt-4">
              <Label className="text-gray-400 text-sm">Description</Label>
              <div className="bg-gray-700 rounded p-3 border border-gray-600 mt-2">
                <p className="text-gray-300 text-sm">
                  {selectedRecord.description}
                </p>
              </div>
            </div>

            {/* Evidence Files */}
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Documentation / Uploaded Files
              </h3>
              {selectedRecord.evidenceFiles.length > 0 ? (
                <div className="space-y-2">
                  {selectedRecord.evidenceFiles.map((file: any, idx: any) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-700 rounded p-3 border border-gray-600"
                    >
                      <span className="text-gray-300 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {file}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-700 rounded p-3 border border-gray-600 text-center">
                  <p className="text-gray-400 text-sm">
                    No evidence files uploaded yet
                  </p>
                </div>
              )}
            </div>

            {/* Notes */}
            {selectedRecord.notes && (
              <div className="border-t border-gray-700 pt-4">
                <Label className="text-gray-400 text-sm">Notes</Label>
                <div className="bg-gray-700 rounded p-3 border border-gray-600 mt-2">
                  <p className="text-gray-300 text-sm">
                    {selectedRecord.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-800"
          >
            Close
          </Button>
          <Button className="bg-[#15941f] hover:bg-[#0d7314] text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload Evidence
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
