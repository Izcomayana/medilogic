/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

export function ComplianceFormModal({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  handleSubmit,
  submitting,
  mode, // "create" | "update"
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  formData: any;
  setFormData: (v: any) => void;
  handleSubmit: () => void;
  submitting: boolean;
  mode: 'create' | 'update';
}) {
  const title =
    mode === 'create' ? 'Create Compliance Record' : 'Update Compliance Record';
  const buttonLabel = submitting ? (
    <Spinner className="mx-10" />
  ) : mode === 'create' ? (
    'Create Record'
  ) : (
    'Update Record'
  );

  const toggle = (field: string) => {
    setFormData((p: any) => ({ ...p, [field]: !p[field] }));
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Manage compliance details for this record.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          {/* Audit Status */}
          <div>
            <Label className="text-gray-300 text-sm">Audit Status</Label>
            <Select
              value={formData.audit_status}
              onValueChange={(v) =>
                setFormData({ ...formData, audit_status: v })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Audit Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add switches for all the booleans */}
          <div className="grid md:grid-cols-2 gap-3 border border-gray-700 p-3 rounded-lg">
            {[
              ['iso_27001_certified', 'ISO 27001 Certified'],
              ['gdpr_policy_uploaded', 'GDPR Policy Uploaded'],
              ['fire_risk_assessment_complete', 'Fire Risk Assessment'],
              ['has_waste_license', 'Has Waste License'],
              ['cyber_essentials_ready', 'Cyber Essentials Ready'],
              ['staff_training_records_uploaded', 'Training Records Uploaded'],
            ].map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="text-gray-300 text-sm">{label}</Label>
                <Switch
                  checked={formData[key]}
                  onCheckedChange={() => toggle(key)}
                />
              </div>
            ))}
          </div>

          {/* Audit remarks */}
          <div>
            <Label className="text-gray-300">Audit Remarks</Label>
            <Textarea
              value={formData.audit_remarks}
              onChange={(e) =>
                setFormData({ ...formData, audit_remarks: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            className="bg-[#15941f] hover:bg-[#0d7314] text-white"
          >
            {buttonLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
