import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCompliance } from '@/hooks/useCompliance';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type CreateComplianceProps = ReturnType<typeof useCompliance>;

export function CreateCompliance({
  isCreateModalOpen,
  setIsCreateModalOpen,
  formData,
  setFormData,
  handleCreateRecord,
}: CreateComplianceProps) {
  return (
    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Compliance Record</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new compliance record for an organization.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="organization" className="text-gray-300">
              Organization
            </Label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              placeholder="Enter organization name"
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>

          <div>
            <Label htmlFor="complianceType" className="text-gray-300">
              Compliance Type
            </Label>
            <Select
              value={formData.complianceType}
              onValueChange={(value) =>
                setFormData({ ...formData, complianceType: value })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select compliance type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="Document Audit">Document Audit</SelectItem>
                <SelectItem value="Safety Audit">Safety Audit</SelectItem>
                <SelectItem value="Shipment Breach">Shipment Breach</SelectItem>
                <SelectItem value="Training Compliance">
                  Training Compliance
                </SelectItem>
                <SelectItem value="Environmental">Environmental</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the compliance record"
              className="bg-gray-700 border-gray-600 text-white mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-gray-300">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Compliant">Compliant</SelectItem>
                <SelectItem value="Review Required">Review Required</SelectItem>
                <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes" className="text-gray-300">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Add any additional notes"
              className="bg-gray-700 border-gray-600 text-white mt-1"
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateRecord}
            className="bg-[#15941f] hover:bg-[#0d7314] text-white"
          >
            Create Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
