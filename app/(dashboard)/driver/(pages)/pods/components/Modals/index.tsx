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
  AlertCircle,
  Loader2,
  Eye,
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
import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';
import Image from 'next/image';
import { PodFile } from '@/app/(dashboard)/driver/hooks/typePod';

type PODialogsProps = ReturnType<typeof usePods>;

{
  /* Create POD Modal */
}
export function CreatePOD({
  isCreateModalOpen,
  setIsCreateModalOpen,
  formData,
  setFormData,
  formatFileSize,
  handleCreatePod,
  loadingTrips,
  driverTrips,
  driverID,
  loadingPods,
}: PODialogsProps) {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  return (
    <AlertDialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl max-h-[90vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-[#15941f]" />
            Create New Proof of Delivery
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Upload a new proof of delivery for a completed trip.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Scrollable content */}
        <div className="space-y-4 py-4 pr-2 overflow-y-auto flex-1">
          <div className="space-y-4 py-4">
            {/* Trip Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tripId" className="text-gray-300 mb-2">
                  Trip ID *
                </Label>
                <Select
                  value={formData.tripId}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      tripId: value,
                    });
                  }}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue
                      placeholder={
                        loadingTrips
                          ? 'Loading trips...'
                          : 'Select completed trip'
                      }
                    />
                  </SelectTrigger>

                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    {driverTrips.length > 0 ? (
                      driverTrips.map((trip) => {
                        const formattedType =
                          trip.delivery_type
                            ?.replaceAll('_', ' ')
                            .replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
                          'Unknown Type';

                        const formattedTime = trip.scheduled_time
                          ? new Date(trip.scheduled_time).toLocaleString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                              }
                            )
                          : 'No time set';

                        return (
                          <SelectItem key={trip.trip_id} value={trip.trip_id}>
                            {`${trip.client_name || 'Unknown Client'} — ${formattedType} — ${formattedTime}`}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <div className="text-gray-400 text-sm p-2">
                        No trips assigned yet
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Delivered To */}
            <div>
              <Label htmlFor="deliveredTo" className="text-gray-300 mb-2">
                Delivered To *
              </Label>
              <Input
                id="deliveredTo"
                value={formData.deliveredTo}
                onChange={(e) =>
                  setFormData({ ...formData, deliveredTo: e.target.value })
                }
                placeholder="Enter recipient name or department"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* Signature */}
            <div>
              <Label htmlFor="signature" className="text-gray-300 mb-2">
                Signature (Drawn) *
              </Label>

              <div className="border border-gray-600 bg-gray-700 rounded-lg p-2">
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="white"
                  backgroundColor="#374151" // matches gray-700
                  canvasProps={{
                    className: 'rounded-lg w-full h-40', // adjustable height
                  }}
                  onEnd={() => {
                    const data = sigCanvas.current?.toDataURL() || '';
                    setFormData({ ...formData, signature: data });
                  }}
                />
              </div>

              <div className="flex justify-between mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="text-gray-700 hover:text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white text-sm"
                  onClick={() => {
                    sigCanvas.current?.clear();
                    setFormData({ ...formData, signature: '' });
                  }}
                >
                  Clear Signature
                </Button>
                {formData.signature && (
                  <span className="text-xs text-green-400">
                    Signature captured ✓
                  </span>
                )}
              </div>
            </div>

            {/* Notes */}
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

            {/* File Upload */}
            <div>
              <Label htmlFor="file" className="text-gray-300 mb-2">
                Upload File (PDF, Image, or Document) *
              </Label>
              <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700/50 hover:bg-gray-700 transition">
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData((prev) => ({
                      ...prev,
                      files,
                    }));
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div>
                  <File className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  {formData.files && formData.files.length > 0 ? (
                    <div className="space-y-1">
                      {formData.files.map((file, i) => (
                        <div key={i} className="text-sm text-white font-medium">
                          <p>{file.name}</p>
                          <p className="text-xs text-gray-400">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-300">
                        Click or drag to upload files
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PDF, JPG, PNG, DOC up to 10MB each
                      </p>
                    </>
                  )}

                  {formData.files && formData.files.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, files: [] })}
                      className="mt-3 text-gray-700"
                    >
                      Clear files
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed footer */}
        <AlertDialogFooter className="border-t border-gray-700 mt-2 pt-4 bg-gray-800 sticky">
          <Button
            variant="outline"
            onClick={() => {
              setIsCreateModalOpen(false);
              setFormData({
                id: '',
                driver_id: driverID,
                tripId: '',
                signature: '',
                notes: '',
                deliveredTo: '',
                files: [],
              });
            }}
            className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreatePod}
            className="primary-button"
            disabled={!formData.tripId || !formData.signature}
          >
            {loadingPods ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <span className="flex items-center gap-3">
                <Plus className="h-4 w-4 mr-2" />
                Upload POD
              </span>
            )}
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
  loadingPods,
  handleDownloadFile,
}: PODialogsProps) {
  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#15941f]" />
            POD Details
          </DialogTitle>
        </DialogHeader>

        {loadingPods ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 text-[#15941f] animate-spin" />
            <p className="ml-3 text-gray-400">Loading POD details...</p>
          </div>
        ) : selectedPod ? (
          <div className="space-y-6 py-4">
            {/* POD Info Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 text-sm">POD ID</Label>
                  <p className="text-white font-medium mt-1">
                    {selectedPod.id}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Trip ID</Label>
                  <p className="text-white mt-1">
                    {selectedPod.tripId || null}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Delivered To</Label>
                  <p className="text-white mt-1">
                    {selectedPod.deliveredTo || '—'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 text-sm">Driver ID</Label>
                  <p className="text-white mt-1">{selectedPod.driverId}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Created At</Label>
                  <p className="text-white mt-1">
                    {formatDate(selectedPod.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedPod.notes && (
              <div>
                <Label className="text-gray-400 text-sm">Delivery Notes</Label>
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600 mt-2">
                  <p className="text-gray-300 text-sm">{selectedPod.notes}</p>
                </div>
              </div>
            )}

            {/* Signature */}
            <div>
              <Label className="text-gray-400 text-sm mb-2 block">
                Signature
              </Label>
              {selectedPod.signature ? (
                <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 flex justify-center">
                  <Image
                    src={selectedPod.signature}
                    alt="Signature"
                    width={300}
                    height={150}
                    className="rounded-md object-contain border border-gray-600"
                  />
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">No signature</p>
              )}
            </div>

            {/* Files */}
            <div>
              <Label className="text-gray-400 text-sm mb-2 block">
                Files Attached
              </Label>

              {selectedPod.files && selectedPod.files.length > 0 ? (
                <div className="space-y-2">
                  {selectedPod.files.map((file: PodFile, idx: number) => (
                    <div
                      key={file.id ?? idx}
                      className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600"
                    >
                      <div className="flex items-center gap-3">
                        <File className="h-4 w-4 text-[#15941f]" />
                        <div>
                          <p className="text-white text-sm font-medium">
                            {`File ${idx + 1}`}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {file.type ? (
                              <span className="">
                                {file.type.replaceAll('_', ' ')}
                              </span>
                            ) : (
                              <span className="italic">Unknown type</span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadFile(file)}
                          className="text-[#15941f] hover:text-[#15941f]/80"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {/* optional: preview inline for images/PDFs */}
                        {file.url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(file.url, '_blank')}
                            className="border-gray-600 text-gray-300"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No files attached</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-6">
            No POD details found.
          </p>
        )}

        <DialogFooter className='border-t border-gray-700 mt-2 pt-4 bg-gray-800 sticky"'>
          <Button
            variant="outline"
            onClick={() => setIsDetailsModalOpen(false)}
            className="border-gray-600 text-gray-700 hover:text-gray-300 hover:text-white hover:bg-gray-700"
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
  loadingFiles,
  podFiles,
}: PODialogsProps) {
  return (
    <Dialog open={isFilesModalOpen} onOpenChange={setIsFilesModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <File className="h-5 w-5 text-[#15941f]" />
            Files – <span className="text-xs">{selectedPod?.id}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            All files attached to this proof of delivery
          </DialogDescription>
        </DialogHeader>
        {loadingFiles ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-6 w-6 text-[#15941f] animate-spin mb-3" />
            <p className="text-gray-400">Loading files...</p>
          </div>
        ) : podFiles.length > 0 ? (
          <div className="space-y-3 py-4">
            {podFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition"
              >
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-[#15941f]" />
                  <div>
                    <p className="text-gray-300 font-medium">{`File ${idx + 1}`}</p>
                    <p className="text-gray-100 text-xs">{file.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadFile(file)}
                    className="text-[#15941f] hover:text-[#15941f]/80"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {/* optional: preview inline for images/PDFs */}
                  {file.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                      className="border-gray-600 text-gray-300"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-400">No files attached to this POD</p>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsFilesModalOpen(false)}
            className="border-gray-600 text-gray-700 hover:text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
