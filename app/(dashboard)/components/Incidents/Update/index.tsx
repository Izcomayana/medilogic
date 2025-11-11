/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
// import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/components/auth';
import { getIncidentStatusBadge } from '@/utils/badge';

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  incident: {
    id: string;
    status: string;
    escalated: boolean;
  } | null;
  updateIncidentStatus: (id: string, status: string) => Promise<any>;
  onStatusUpdated?: (newStatus: string) => void;
  toggleIncidentEscalation: (id: string, newState: boolean) => Promise<any>;
  scope?: 'mine' | 'org';
}

export default function UpdateIncident({
  open,
  setOpen,
  incident,
  onStatusUpdated,
  updateIncidentStatus,
  // toggleIncidentEscalation,
  scope = 'mine',
}: Props) {
  const { role } = useAuth();

  const handleChange = async (value: string) => {
    if (!incident) return;
    toast.loading('Updating status...', { id: 'incident-status' });
    try {
      await updateIncidentStatus(incident.id, value);
      toast.success('Status updated successfully', { id: 'incident-status' });
      onStatusUpdated?.(value);
      setOpen(false);
    } catch (err) {
      toast.error('Failed to update status', { id: 'incident-status' });
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  // const handleEscalationToggle = async (checked: boolean) => {
  //   if (!incident) return;
  //   toast.loading('Updating escalation...', { id: 'escalate' });

  //   try {
  //     await toggleIncidentEscalation(incident.id, checked);
  //     toast.success('Escalation updated', { id: 'escalate' });
  //     onStatusUpdated?.(checked ? 'escalated' : 'under_review');
  //     setOpen(false);
  //   } catch (err) {
  //     toast.error('Failed to update escalation', { id: 'escalate' });
  //     console.error(err);
  //   } finally {
  //     setOpen(false);
  //   }
  // };

  // 🔧 Define role/scope-based allowed status transitions
  const statusOptions: Record<string, string[]> = {
    admin_org: ['under_review', 'resolved', 'closed'],
    regulator: ['under_review', 'escalated', 'resolved', 'closed'],
    driver: ['pending', 'on_site'],
  };

  // Determine which list to use
  const key =
    role === 'admin' && scope === 'org'
      ? 'admin_org'
      : role === 'regulator'
        ? 'regulator'
        : role === 'driver'
          ? 'driver'
          : null;

  const options = key ? statusOptions[key] : [];

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Update Incident</AlertDialogTitle>
        </AlertDialogHeader>

        {incident ? (
          <div className="space-y-4 mt-2">
            <div className="flex justify-between">
              <Label className="text-gray-300">Current Status:</Label>
              <p className="text-gray-100 font-medium mt-1 capitalize">
                {getIncidentStatusBadge(incident.status)}
              </p>
            </div>

            {/* ✅ Dynamic Status Dropdown */}
            {options.length > 0 && (
              <div>
                <Label className="text-gray-300 mb-2">New Status</Label>
                <Select onValueChange={handleChange}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {options.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 
            {role === 'admin' && scope === 'mine' && (
              <div className="flex items-center justify-between mt-10">
                <Label className="text-gray-300">Escalate Incident</Label>
                <Switch
                  checked={incident.escalated}
                  onCheckedChange={handleEscalationToggle}
                />
              </div>
            )}*/}
          </div>
        ) : (
          <p className="text-gray-400 text-sm py-8 text-center">
            Loading incident data...
          </p>
        )}

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-gray-700"
          >
            Cancel
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
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogFooter,
// } from '@/components/ui/alert-dialog';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from '@/components/ui/select';
// import { toast } from 'sonner';
// import { Switch } from '@/components/ui/switch';
// import { useAuth } from '@/components/auth';
// import { getIncidentStatusBadge } from '@/utils/badge';

// interface Props {
//   open: boolean;
//   setOpen: (v: boolean) => void;
//   incident: {
//     id: string;
//     status: string;
//     escalated: boolean;
//   } | null;
//   updateIncidentStatus: (id: string, status: string) => Promise<any>;
//   onStatusUpdated?: (newStatus: string) => void;
//   toggleIncidentEscalation: (id: string, newState: boolean) => Promise<any>;
//   scope?: 'mine' | 'org';
// }

// export default function UpdateIncident({
//   open,
//   setOpen,
//   incident,
//   onStatusUpdated,
//   updateIncidentStatus,
//   toggleIncidentEscalation,
//   scope = 'mine',
// }: Props) {
//   const { role } = useAuth();

//   const handleChange = async (value: string) => {
//     if (!incident) return;
//     toast.loading('Updating status...', { id: 'incident-status' });

//     try {
//       await updateIncidentStatus(incident.id, value);
//       toast.success('Status updated successfully', { id: 'incident-status' });
//       onStatusUpdated?.(value);
//       setOpen(false);
//     } catch (err) {
//       toast.error('Failed to update status', { id: 'incident-status' });
//       console.log(err);
//     } finally {
//       setOpen(false);
//     }
//   };

//   const handleEscalationToggle = async (checked: boolean) => {
//     if (!incident) return;
//     toast.loading('Updating escalation...', { id: 'escalate' });

//     try {
//       await toggleIncidentEscalation(incident.id, checked);
//       toast.success('Escalation updated', { id: 'escalate' });
//       onStatusUpdated?.(checked ? 'escalated' : 'under_review');
//       setOpen(false);
//     } catch (err) {
//       toast.error('Failed to update escalation', { id: 'escalate' });
//       console.log(err);
//     } finally {
//       setOpen(false);
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Update Incident</AlertDialogTitle>
//         </AlertDialogHeader>

//         {incident ? (
//           <div className="space-y-4 mt-2">
//             <div className="flex justify-between">
//               <Label className="text-gray-300">Current Status:</Label>
//               <p className="text-gray-100 font-medium mt-1 capitalize">
//                 {getIncidentStatusBadge(incident.status)}
//               </p>
//             </div>

//             {/* ✅ Only show Status Select for regulators or admin org view */}
//             {role === 'admin' && scope === 'org' && (
//               <div>
//                 <Label className="text-gray-300 mb-2">New Status</Label>
//                 <Select onValueChange={handleChange}>
//                   <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-full mt-1">
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-700 border-gray-600">
//                     <SelectItem value="under_review">Under Review</SelectItem>
//                     <SelectItem value="resolved">Resolved</SelectItem>
//                     <SelectItem value="closed">Closed</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             {role === 'regulator' && (
//               <div>
//                 <Label className="text-gray-300 mb-2">New Status</Label>
//                 <Select onValueChange={handleChange}>
//                   <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-full mt-1">
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-700 border-gray-600">
//                     <SelectItem value="under_review">Under Review</SelectItem>
//                     <SelectItem value="escalated">Escalated</SelectItem>
//                     <SelectItem value="resolved">Resolved</SelectItem>
//                     <SelectItem value="closed">Closed</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             {role === 'driver' && (
//               <div>
//                 <Label className="text-gray-300 mb-2">New Status</Label>
//                 <Select onValueChange={handleChange}>
//                   <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-full mt-1">
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-700 border-gray-600">
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="on_site">On Site</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             {/* ✅ Show Escalation only for admin MY incidents */}
//             {role === 'admin' && scope === 'mine' && (
//               <div className="flex items-center justify-between mt-10">
//                 <Label className="text-gray-300">Escalate Incident</Label>
//                 <Switch
//                   checked={incident.escalated}
//                   onCheckedChange={handleEscalationToggle}
//                 />
//               </div>
//             )}
//           </div>
//         ) : (
//           <p className="text-gray-400 text-sm py-8 text-center">
//             Loading incident data...
//           </p>
//         )}

//         <AlertDialogFooter>
//           <Button
//             variant="outline"
//             onClick={() => setOpen(false)}
//             className="text-gray-700"
//           >
//             Cancel
//           </Button>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogFooter,
// } from '@/components/ui/alert-dialog';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from '@/components/ui/select';
// import { toast } from 'sonner';
// import { Switch } from '@/components/ui/switch';
// import { useAuth } from '@/components/auth';
// import { getIncidentStatusBadge } from '@/utils/badge';

// interface Props {
//   open: boolean;
//   setOpen: (v: boolean) => void;
//   incident: {
//     id: string;
//     status: string;
//     escalated: boolean;
//   } | null;
//   updateIncidentStatus: (id: string, status: string) => Promise<any>;
//   onStatusUpdated?: (newStatus: string) => void;
//   toggleIncidentEscalation: (id: string, newState: boolean) => Promise<any>;
// }

// export default function UpdateIncident({
//   open,
//   setOpen,
//   incident,
//   onStatusUpdated,
//   updateIncidentStatus,
//   toggleIncidentEscalation,
// }: Props) {
//   const handleChange = async (value: string) => {
//     if (!incident) return;
//     toast.loading('Updating status...', { id: 'incident-status' });

//     try {
//       await updateIncidentStatus(incident.id, value);
//       toast.success('Status updated successfully', { id: 'incident-status' });
//       onStatusUpdated?.(value);
//       setOpen(false); // close only after success
//     } catch (err: any) {
//       toast.error('Failed to update status', { id: 'incident-status' });
//       console.log(err);
//     } finally {
//       setOpen(false);
//     }
//   };

//   const handleEscalationToggle = async (checked: boolean) => {
//     if (!incident) return;
//     toast.loading('Updating escalation...', { id: 'escalate' });

//     try {
//       await toggleIncidentEscalation(incident.id, checked);
//       toast.success('Escalation updated', { id: 'escalate' });
//       onStatusUpdated?.(checked ? 'escalated' : 'under_review');
//       setOpen(false);
//     } catch (err) {
//       toast.error('Failed to update escalation', { id: 'escalate' });
//       console.log(err);
//     } finally {
//       setOpen(false);
//     }
//   };

//   const { role } = useAuth();
//   console.log('role:', role)

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Update Incident Status</AlertDialogTitle>
//         </AlertDialogHeader>

//         {/* ✅ CONTENT IS ALWAYS RENDERED. SAFELY HANDLE NULL */}
//         {incident ? (
//           <div className="space-y-4 mt-2">
//             <div className="flex justify-between">
//               <Label className="text-gray-300">Current Status:</Label>
//               <p className="text-gray-100 font-medium mt-1 capitalize">
//                 {getIncidentStatusBadge(incident.status)}
//               </p>
//             </div>

// {role === 'regulator' && (
//               <div>
//               <Label className="text-gray-300 mb-2">New Status</Label>
//               <Select onValueChange={handleChange}>
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-full mt-1">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="under_review">Under Review</SelectItem>
//                   <SelectItem value="on_site">On Site</SelectItem>
//                   <SelectItem value="escalated">Escalated</SelectItem>
//                   <SelectItem value="resolved">Resolved</SelectItem>
//                   <SelectItem value="closed">Closed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
// )}

//             {(role === 'admin' || role === 'regulator') && (
//   <div className="flex items-center justify-between mt-10">
//     <Label className="text-gray-300">
//       {role === 'admin' ? 'Escalate Incident' : 'Mark as Escalated'}
//     </Label>
//     <Switch
//       checked={incident.escalated}
//       onCheckedChange={handleEscalationToggle}
//     />
//   </div>
// )}
//           </div>
//         ) : (
//           <p className="text-gray-400 text-sm py-8 text-center">
//             Loading incident data...
//           </p>
//         )}

//         <AlertDialogFooter>
//           <Button
//             variant="outline"
//             onClick={() => setOpen(false)}
//             className="text-gray-700"
//           >
//             Cancel
//           </Button>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
