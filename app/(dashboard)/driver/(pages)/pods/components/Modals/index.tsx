import { usePods } from '@/app/(dashboard)/driver/hooks/usePODs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  File,
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type PODialogsProps = ReturnType<typeof usePods>;

{
  /* Create POD Modal */
}
export function CreatePOD({
  isCreateModalOpen,
  setIsCreateModalOpen,
  formData,
  setFormData,
  completedTrips,
  formatFileSize,
  handleCreatePod,
}: PODialogsProps) {
  return (
    <AlertDialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-[#15941f]" />
            Create New Proof of Delivery
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Upload a new proof of delivery for a completed trip.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tripId" className="text-gray-300 mb-2">
                Trip ID *
              </Label>
              <Select
                value={formData.tripId}
                onValueChange={(value) => {
                  const trip = completedTrips.find((t) => t.id === value);
                  setFormData({
                    ...formData,
                    tripId: value,
                    client: trip?.client || '',
                  });
                }}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select completed trip" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {completedTrips.map((trip) => (
                    <SelectItem key={trip.id} value={trip.id}>
                      {trip.id} - {trip.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deliveryDate" className="text-gray-300 mb-2">
                Delivery Date *
              </Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryDate: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="client" className="text-gray-300 mb-2">
              Client / Organization
            </Label>
            <Input
              id="client"
              value={formData.client}
              disabled
              className="bg-gray-700 border-gray-600 text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-gray-300 mb-2">
              Delivery Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Any additional notes about the delivery..."
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="file" className="text-gray-300 mb-2">
              Upload File (PDF, Image, or Document) *
            </Label>
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700/50 hover:bg-gray-700 transition">
              <input
                id="file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    file: e.target.files?.[0] || null,
                  })
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div>
                <File className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                {formData.file ? (
                  <>
                    <p className="text-sm text-white font-medium">
                      {formData.file.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatFileSize(formData.file.size)}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-300">
                      Click or drag to upload file
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, JPG, PNG, DOC up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsCreateModalOpen(false);
              setFormData({
                tripId: '',
                client: '',
                deliveryDate: new Date().toISOString().split('T')[0],
                notes: '',
                file: null,
              });
            }}
            className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button onClick={handleCreatePod} className="primary-button">
            <Plus className="h-4 w-4 mr-2" />
            Upload POD
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

{
  /* View POD Details Modal */
}
export function ViewPOD({
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedPod,
  formatDate,
  handleDownloadFile,
}: PODialogsProps) {
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
    <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-[90vh] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#15941f]" />
            POD Details - {selectedPod?.id}
          </DialogTitle>
        </DialogHeader>

        {selectedPod && (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 text-sm">POD ID</Label>
                  <p className="text-white font-medium mt-1">
                    {selectedPod.id}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Trip ID</Label>
                  <p className="text-white mt-1">{selectedPod.tripId}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Client</Label>
                  <p className="text-white mt-1">{selectedPod.client}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 text-sm">Delivery Date</Label>
                  <p className="text-white mt-1">
                    {formatDate(selectedPod.deliveryDate)}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Uploaded At</Label>
                  <p className="text-white mt-1">{selectedPod.uploadedAt}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedPod.status)}
                  </div>
                </div>
              </div>
            </div>

            {selectedPod.notes && (
              <div>
                <Label className="text-gray-400 text-sm">Delivery Notes</Label>
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600 mt-2">
                  <p className="text-gray-300 text-sm">{selectedPod.notes}</p>
                </div>
              </div>
            )}

            <div>
              <Label className="text-gray-400 text-sm mb-2 block">
                Files Attached
              </Label>
              {selectedPod.files.length > 0 ? (
                <div className="space-y-2">
                  {selectedPod.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600"
                    >
                      <div className="flex items-center gap-3">
                        <File className="h-4 w-4 text-[#15941f]" />
                        <div>
                          <p className="text-white text-sm font-medium">
                            {file.name}
                          </p>
                          <p className="text-gray-400 text-xs">{file.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadFile(file.name)}
                        className="text-[#15941f] hover:text-[#15941f]/80"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No files attached</p>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDetailsModalOpen(false)}
            className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

{
  /* View Files Modal */
}
export function ViewPODFile({
  isFilesModalOpen,
  setIsFilesModalOpen,
  handleDownloadFile,
  selectedPod,
}: PODialogsProps) {
  return (
    <Dialog open={isFilesModalOpen} onOpenChange={setIsFilesModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <File className="h-5 w-5 text-[#15941f]" />
            Files - {selectedPod?.id}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            All files attached to this proof of delivery
          </DialogDescription>
        </DialogHeader>

        {selectedPod && (
          <div className="space-y-3 py-4">
            {selectedPod.files.length > 0 ? (
              selectedPod.files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition"
                >
                  <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-[#15941f]" />
                    <div>
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-gray-400 text-xs">{file.size}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDownloadFile(file.name)}
                    className="bg-[#15941f] hover:bg-[#15941f]/80 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">No files attached to this POD</p>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsFilesModalOpen(false)}
            className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
