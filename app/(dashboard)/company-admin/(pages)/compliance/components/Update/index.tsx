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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/components/auth';

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
  const { role } = useAuth();

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
    setFormData((prev: any) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            {mode === 'create'
              ? 'Complete the compliance checklist for your organization.'
              : 'Modify compliance details for this record.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4 max-h-[70vh] overflow-auto">
          {/* SUPER ADMIN ONLY: Organization ID */}
          {role === 'super_admin' && (
            <div>
              <Label className="text-gray-300 text-sm">Organization ID</Label>
              <Input
                className="bg-gray-700 border-gray-600 text-white mt-1"
                value={formData.organization_id}
                onChange={(e) =>
                  setFormData({ ...formData, organization_id: e.target.value })
                }
                placeholder="Organization UUID"
              />
            </div>
          )}

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
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Escalation Level */}
          {/* <div>
            <Label className="text-gray-300 text-sm">Escalation Level</Label>
            <Select
              value={formData.escalation_level}
              onValueChange={(v) =>
                setFormData({ ...formData, escalation_level: v })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select escalation level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* BOOLEAN SWITCHES */}
          <div className="grid md:grid-cols-2 gap-3 border border-gray-700 p-3 rounded-lg">
            {[
              ['iso_27001_certified', 'ISO 27001 Certified'],
              ['nhs_dsp_toolkit_complete', 'NHS DSP Toolkit Complete'],
              ['cyber_essentials_ready', 'Cyber Essentials Ready'],
              ['has_waste_license', 'Has Waste License'],
              [
                'fire_risk_assessment_complete',
                'Fire Risk Assessment Complete',
              ],
              ['gdpr_policy_uploaded', 'GDPR Policy Uploaded'],
              [
                'clinical_waste_policy_uploaded',
                'Clinical Waste Policy Uploaded',
              ],
              ['sharps_policy_uploaded', 'Sharps Policy Uploaded'],
              [
                'staff_training_records_uploaded',
                'Staff Training Records Uploaded',
              ],
              ['transport_license_valid', 'Transport License Valid'],
              ['environmental_permit_valid', 'Environmental Permit Valid'],
              [
                'data_protection_registration_valid',
                'Data Protection Registration Valid',
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

          {/* CERTIFICATE URLs */}
          {[
            ['iso_27001_certificate_url', 'ISO 27001 Certificate URL'],
            ['waste_license_certificate_url', 'Waste License Certificate URL'],
            ['gdpr_certificate_url', 'GDPR Certificate URL'],
            ['environmental_permit_url', 'Environmental Permit URL'],
            [
              'data_protection_registration_url',
              'Data Protection Registration URL',
            ],
            ['fire_risk_certificate_url', 'Fire Risk Certificate URL'],
          ].map(([key, label]) => (
            <div key={key}>
              <Label className="text-gray-300 text-sm">{label}</Label>
              <Input
                className="bg-gray-700 border-gray-600 text-white mt-1"
                value={formData[key] || ''}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                placeholder="https://example.com/document"
              />
            </div>
          ))}

          {/* Audit Remarks */}
          <div>
            <Label className="text-gray-300 text-sm">Audit Remarks</Label>
            <Textarea
              className="bg-gray-700 border-gray-600 text-white mt-1"
              value={formData.audit_remarks}
              onChange={(e) =>
                setFormData({ ...formData, audit_remarks: e.target.value })
              }
            />
          </div>

          {/* Audit Dates */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <Label className="text-gray-300 text-sm">Last Audit Date</Label>
              <Input
                type="date"
                className="bg-gray-700 border-gray-600 text-white mt-1"
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
              />
            </div>

            <div>
              <Label className="text-gray-300 text-sm">
                Next Audit Due Date
              </Label>
              <Input
                type="date"
                className="bg-gray-700 border-gray-600 text-white mt-1"
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
              />
            </div>
          </div>

          {/* TOGGLES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-gray-700 p-3 rounded-lg">
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

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Spinner } from '@/components/ui/spinner';

// export function ComplianceFormModal({
//   isOpen,
//   setIsOpen,
//   formData,
//   setFormData,
//   handleSubmit,
//   submitting,
//   mode, // "create" | "update"
// }: {
//   isOpen: boolean;
//   setIsOpen: (v: boolean) => void;
//   formData: any;
//   setFormData: (v: any) => void;
//   handleSubmit: () => void;
//   submitting: boolean;
//   mode: 'create' | 'update';
// }) {
//   const title =
//     mode === 'create' ? 'Create Compliance Record' : 'Update Compliance Record';
//   const buttonLabel = submitting ? (
//     <Spinner className="mx-10" />
//   ) : mode === 'create' ? (
//     'Create Record'
//   ) : (
//     'Update Record'
//   );

//   const toggle = (field: string) => {
//     setFormData((p: any) => ({ ...p, [field]: !p[field] }));
//   };

//   return (
//     <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//       <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl">
//         <AlertDialogHeader>
//           <AlertDialogTitle>{title}</AlertDialogTitle>
//           <AlertDialogDescription className="text-gray-400">
//             Manage compliance details for this record.
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <div className="grid gap-4 py-4">
//           {/* Audit Status */}
//           <div>
//             <Label className="text-gray-300 text-sm">Audit Status</Label>
//             <Select
//               value={formData.audit_status}
//               onValueChange={(v) =>
//                 setFormData({ ...formData, audit_status: v })
//               }
//             >
//               <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
//                 <SelectValue placeholder="Audit Status" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-700 border-gray-600 text-white">
//                 <SelectItem value="pending">Pending</SelectItem>
//                                 <SelectItem value="passed">Passed</SelectItem>
//                                 <SelectItem value="failed">Failed</SelectItem>
//                                 <SelectItem value="escalated">Escalated</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Add switches for all the booleans */}
//           <div className="grid md:grid-cols-2 gap-3 border border-gray-700 p-3 rounded-lg">
//             {[
//   ['iso_27001_certified', 'ISO 27001 Certified'],
//   ['nhs_dsp_toolkit_complete', 'NHS DSP Toolkit Complete'],
//   ['cyber_essentials_ready', 'Cyber Essentials Ready'],
//   ['has_waste_license', 'Has Waste License'],
//   ['fire_risk_assessment_complete', 'Fire Risk Assessment Complete'],
//   ['gdpr_policy_uploaded', 'GDPR Policy Uploaded'],
//   ['clinical_waste_policy_uploaded', 'Clinical Waste Policy Uploaded'],
//   ['sharps_policy_uploaded', 'Sharps Policy Uploaded'],
//   ['staff_training_records_uploaded', 'Staff Training Records Uploaded'],
//   ['transport_license_valid', 'Transport License Valid'],
//   ['environmental_permit_valid', 'Environmental Permit Valid'],
//   [
//     'data_protection_registration_valid',
//     'Data Protection Registration Valid',
//   ],
//             ].map(([key, label]) => (
//               <div key={key} className="flex items-center justify-between">
//                 <Label className="text-gray-300 text-sm">{label}</Label>
//                 <Switch
//                   checked={formData[key]}
//                   onCheckedChange={() => toggle(key)}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Audit remarks */}
//           <div>
//             <Label className="text-gray-300">Audit Remarks</Label>
//             <Textarea
//               value={formData.audit_remarks}
//               onChange={(e) =>
//                 setFormData({ ...formData, audit_remarks: e.target.value })
//               }
//               className="bg-gray-700 border-gray-600 text-white mt-1"
//             />
//           </div>
//         </div>

//         <AlertDialogFooter>
//           <Button
//             variant="outline"
//             onClick={() => setIsOpen(false)}
//             className="text-gray-700 hover:text-gray-300 border-gray-600 hover:bg-gray-700"
//           >
//             Cancel
//           </Button>

//           <Button
//             onClick={handleSubmit}
//             className="bg-[#15941f] hover:bg-[#0d7314] text-white"
//           >
//             {buttonLabel}
//           </Button>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
