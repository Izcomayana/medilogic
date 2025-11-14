import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { MessageCircleWarning, MapPin, FileUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Checkbox } from '@/components/ui/checkbox';
import { useIncidents } from '@/hooks/incidents/base';
import { useAuth } from '@/components/auth';

type ReportIncidentProps = ReturnType<typeof useIncidents>;

export function ReportIncident({
  showReportModal,
  setShowReportModal,
  formData,
  setFormData,
  reportIncident,
  isLoadingLocation,
  severity,
  handleGetLocation,
  formatFileSize,
  reporting,
}: ReportIncidentProps) {
  const { role } = useAuth();

  return (
    <AlertDialog open={showReportModal} onOpenChange={setShowReportModal}>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white lg:max-w-2xl">
          <MessageCircleWarning className="h-4 w-4" />
          Report Incident
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>Report Incident</AlertDialogTitle>
            <AlertDialogCancel className="text-gray-800">X</AlertDialogCancel>
          </div>

          <AlertDialogDescription className="text-gray-400">
            Report an issue that occurred during your trip
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-5 py-4 pr-2 max-h-[70vh] overflow-y-auto">
          <div>
            <Label htmlFor="title" className="text-gray-300 mb-2">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-300">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Describe the incident in detail"
              className="bg-gray-700 border-gray-600 text-white mt-1"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-gray-300 mb-2">
              Incident Type <span className="text-red-500">*</span>
            </Label>
            <Input
              id="type"
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-gray-300">
              Severity <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.severity}
              onValueChange={(value) =>
                setFormData({ ...formData, severity: value })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {severity.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-300 text-sm mb-2">Location</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter or use GPS"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="bg-gray-700 border-gray-600 text-white flex-1"
              />
              <Button
                type="button"
                onClick={handleGetLocation}
                disabled={isLoadingLocation}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 bg-transparent"
              >
                {isLoadingLocation ? (
                  <Spinner />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {role === 'admin' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isVisibleToRegulator"
                checked={formData.isVisibleToRegulator}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isVisibleToRegulator: Boolean(checked),
                  }))
                }
              />
              <Label htmlFor="isVisibleToRegulator" className="text-gray-300">
                Visible to Regulator
              </Label>
            </div>
          )}

          {/* escalated */}
          {/* <div className="flex items-center space-x-2">
            <Checkbox
              id="escalated"
              checked={formData.escalated}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  escalated: Boolean(checked),
                }))
              }
            />
            <Label htmlFor="escalated" className="text-gray-300">
              Escalate Incident
            </Label>
          </div> */}

          <div>
            <Label className="text-gray-300 text-sm mb-2">Upload files</Label>

            <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700/50 hover:bg-gray-700 transition">
              {/* The actual file input */}
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files || []);
                  setFormData((prev) => {
                    const existing = prev.files || [];
                    const uniqueFiles = newFiles.filter(
                      (file) =>
                        !existing.some(
                          (f) => f.name === file.name && f.size === file.size
                        )
                    );
                    return {
                      ...prev,
                      files: [...existing, ...uniqueFiles],
                    };
                  });
                }}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              <div className="relative z-0 pointer-events-none">
                <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />

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
              </div>
            </div>

            {/* Move Clear Button OUTSIDE so it's clickable */}
            {formData.files && formData.files.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFormData({ ...formData, files: [] })}
                className="mt-3 text-gray-700 border-gray-600 hover:text-white hover:bg-gray-700"
              >
                Clear files
              </Button>
            )}
          </div>
          <div className="bg-gray-700 rounded p-3 border border-gray-600">
            <p className="text-sm text-gray-300">
              <strong>Timestamp:</strong>{' '}
              {new Date().toISOString().slice(0, 16).replace('T', ' ')}
            </p>
          </div>
        </div>

        <AlertDialogFooter className="sticky">
          <Button
            variant="outline"
            onClick={() => setShowReportModal(false)}
            className="text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={reportIncident}
            disabled={reporting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {reporting ? <Spinner className="mx-12" /> : 'Submit Incident'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
