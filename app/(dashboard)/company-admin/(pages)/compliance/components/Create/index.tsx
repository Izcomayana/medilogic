/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/components/auth';

type CreateComplianceProps = {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
  formData: any;
  setFormData: (v: any) => void;
  handleCreateRecord: () => void;
  creating: boolean;
};

export function CreateCompliance({
  isCreateModalOpen,
  setIsCreateModalOpen,
  formData,
  setFormData,
  handleCreateRecord,
  creating,
}: CreateComplianceProps) {
  const { role } = useAuth();

  const toggle = (field: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <AlertDialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Create Compliance Record</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            {role === 'admin'
              ? 'Complete the compliance checklist for your organization.'
              : 'Only admins can create compliance records.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4 max-h-[70vh] overflow-auto">
          {/* Organization (only visible to super admin) */}
          {role === 'super_admin' && (
            <div>
              <Label htmlFor="organization" className="text-gray-300">
                Organization ID
              </Label>
              <Input
                id="organization"
                value={formData.organization_id}
                onChange={(e) =>
                  setFormData({ ...formData, organization_id: e.target.value })
                }
                placeholder="Enter organization ID"
                className="bg-gray-700 border-gray-600 text-white mt-1"
              />
            </div>
          )}

          {/* Audit Status */}
          <div>
            <Label className="text-gray-300">Audit Status</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, audit_status: value })
              }
              value={formData.audit_status}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select audit status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white border-gray-600">
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Escalation Level */}
          <div>
            <Label className="text-gray-300">Escalation Level</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, escalation_level: value })
              }
              value={formData.escalation_level}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select escalation level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white border-gray-600">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Compliance switches */}
          <div className="grid md:grid-cols-2 gap-3 border border-gray-700 p-3 rounded-lg">
            {[
              ['iso_27001_certified', 'ISO 27001 Certified'],
              ['gdpr_policy_uploaded', 'GDPR Policy Uploaded'],
              [
                'fire_risk_assessment_complete',
                'Fire Risk Assessment Complete',
              ],
              ['has_waste_license', 'Has Waste License'],
              ['cyber_essentials_ready', 'Cyber Essentials Ready'],
              [
                'staff_training_records_uploaded',
                'Staff Training Records Uploaded',
              ],
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

          {/* URLs (optional) */}
          <div>
            <Label htmlFor="isoUrl" className="text-gray-300">
              ISO 27001 Certificate URL
            </Label>
            <Input
              id="isoUrl"
              value={formData.iso_27001_certificate_url}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  iso_27001_certificate_url: e.target.value,
                })
              }
              placeholder="https://example.com/certificate"
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>

          {/* Audit remarks */}
          <div>
            <Label htmlFor="audit_remarks" className="text-gray-300">
              Audit Remarks
            </Label>
            <Textarea
              id="audit_remarks"
              value={formData.audit_remarks}
              onChange={(e) =>
                setFormData({ ...formData, audit_remarks: e.target.value })
              }
              placeholder="Add any remarks for the compliance review"
              className="bg-gray-700 border-gray-600 text-white mt-1"
              rows={3}
            />
          </div>

          {/* Audit Dates */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <Label className="text-gray-300">Last Audit Date</Label>
              <Input
                type="date"
                value={
                  formData.last_audit_date
                    ? formData.last_audit_date.split('T')[0]
                    : ''
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_audit_date: new Date(e.target.value).toISOString(),
                  })
                }
                className="bg-gray-700 border-gray-600 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-300">Next Audit Due Date</Label>
              <Input
                type="date"
                value={
                  formData.next_audit_due_date
                    ? formData.next_audit_due_date.split('T')[0]
                    : ''
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    next_audit_due_date: new Date(e.target.value).toISOString(),
                  })
                }
                className="bg-gray-700 border-gray-600 text-white mt-1"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid md:grid-cols-2 gap-3 border border-gray-700 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-gray-300 text-sm">
                Auto Alert Enabled
              </Label>
              <Switch
                checked={formData.auto_alert_enabled}
                onCheckedChange={() => toggle('auto_alert_enabled')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-gray-300 text-sm">
                Flag as Non-Compliant
              </Label>
              <Switch
                checked={formData.is_flagged_noncompliant}
                onCheckedChange={() => toggle('is_flagged_noncompliant')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-gray-300 text-sm">
                Visible to Regulator
              </Label>
              <Switch
                checked={formData.is_visible_to_regulator}
                onCheckedChange={() => toggle('is_visible_to_regulator')}
              />
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsCreateModalOpen(false)}
            className="text-gray-700 hover:text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateRecord}
            className="bg-[#15941f] hover:bg-[#0d7314] text-white"
          >
            {creating ? <Spinner className="mx-10" /> : 'Create Record'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Spinner } from '@/components/ui/spinner';
// import { Switch } from '@/components/ui/switch';
// import { useAuth } from '@/components/auth';

// type CreateComplianceProps = {
//   isCreateModalOpen: boolean;
//   setIsCreateModalOpen: (v: boolean) => void;
//   formData: any;
//   setFormData: (v: any) => void;
//   handleCreateRecord: () => void;
//   creating: boolean;
// };

// export function CreateCompliance({
//   isCreateModalOpen,
//   setIsCreateModalOpen,
//   formData,
//   setFormData,
//   handleCreateRecord,
//   creating,
// }: CreateComplianceProps) {
//   const { role, user } = useAuth();

//   // toggle helper
//   const toggle = (field: string) => {
//     setFormData((prev: any) => ({ ...prev, [field]: !prev[field] }));
//   };

//   return (
//     <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//       <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl">
//         <DialogHeader>
//           <DialogTitle>Create Compliance Record</DialogTitle>
//           <DialogDescription className="text-gray-400">
//             {role === 'admin'
//               ? 'Complete the compliance checklist for your organization.'
//               : 'Only admins can create compliance records.'}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           {/* Organization */}
//           {role === 'super_admin' && (
//             <div>
//               <Label htmlFor="organization" className="text-gray-300">
//                 Organization ID
//               </Label>
//               <Input
//                 id="organization"
//                 value={formData.organization_id}
//                 onChange={(e) =>
//                   setFormData({ ...formData, organization_id: e.target.value })
//                 }
//                 placeholder="Enter organization ID"
//                 className="bg-gray-700 border-gray-600 text-white mt-1"
//               />
//             </div>
//           )}

//           {/* Compliance switches */}
//           <div className="grid md:grid-cols-2 gap-3 border border-gray-700 p-3 rounded-lg">
//             <div className="flex items-center justify-between">
//               <Label className="text-gray-300 text-sm">
//                 ISO 27001 Certified
//               </Label>
//               <Switch
//                 checked={formData.iso_27001_certified}
//                 onCheckedChange={() => toggle('iso_27001_certified')}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label className="text-gray-300 text-sm">
//                 GDPR Policy Uploaded
//               </Label>
//               <Switch
//                 checked={formData.gdpr_policy_uploaded}
//                 onCheckedChange={() => toggle('gdpr_policy_uploaded')}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label className="text-gray-300 text-sm">
//                 Fire Risk Assessment Complete
//               </Label>
//               <Switch
//                 checked={formData.fire_risk_assessment_complete}
//                 onCheckedChange={() => toggle('fire_risk_assessment_complete')}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label className="text-gray-300 text-sm">Has Waste License</Label>
//               <Switch
//                 checked={formData.has_waste_license}
//                 onCheckedChange={() => toggle('has_waste_license')}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label className="text-gray-300 text-sm">
//                 Cyber Essentials Ready
//               </Label>
//               <Switch
//                 checked={formData.cyber_essentials_ready}
//                 onCheckedChange={() => toggle('cyber_essentials_ready')}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label className="text-gray-300 text-sm">
//                 Staff Training Records Uploaded
//               </Label>
//               <Switch
//                 checked={formData.staff_training_records_uploaded}
//                 onCheckedChange={() =>
//                   toggle('staff_training_records_uploaded')
//                 }
//               />
//             </div>
//           </div>

//           {/* URLs (optional) */}
//           <div>
//             <Label htmlFor="isoUrl" className="text-gray-300">
//               ISO 27001 Certificate URL
//             </Label>
//             <Input
//               id="isoUrl"
//               value={formData.iso_27001_certificate_url}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   iso_27001_certificate_url: e.target.value,
//                 })
//               }
//               placeholder="https://example.com/certificate"
//               className="bg-gray-700 border-gray-600 text-white mt-1"
//             />
//           </div>

//           {/* Audit remarks */}
//           <div>
//             <Label htmlFor="audit_remarks" className="text-gray-300">
//               Audit Remarks
//             </Label>
//             <Textarea
//               id="audit_remarks"
//               value={formData.audit_remarks}
//               onChange={(e) =>
//                 setFormData({ ...formData, audit_remarks: e.target.value })
//               }
//               placeholder="Add any remarks for the compliance review"
//               className="bg-gray-700 border-gray-600 text-white mt-1"
//               rows={3}
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button
//             variant="outline"
//             onClick={() => setIsCreateModalOpen(false)}
//             className="text-gray-700 hover:text-gray-300 border-gray-600 hover:bg-gray-700"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleCreateRecord}
//             className="bg-[#15941f] hover:bg-[#0d7314] text-white"
//           >
//             {creating ? <Spinner className="mx-10" /> : 'Create Record'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
