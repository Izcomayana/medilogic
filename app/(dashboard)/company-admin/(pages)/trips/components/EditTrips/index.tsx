import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TripFormBase } from '@/hooks/trips/mappers';
import { X } from 'lucide-react';
import { EditTripBasics } from './components/EditTripBasics';
import { useEffect, useState } from 'react';
import { LocationSection } from '../Fields/LocationSection';
import { EditTripSchedule } from './components/EditTripSchedule';
import { MetricSection } from '../Fields/MetricSection';
import { EditTripConfig } from './components/EditTripConfig';
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { EditTripCompliance } from './components/EditTripCompliance';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export type EditTripFormData = TripFormBase;

type EditTripProps = {
  isEditModalOpen: any;
  setIsEditModalOpen: any;
  selectedTrip: any;
  loading: any;
  resetForm: any;
  handleUpdateTrip: any;
};

export const createEmptyTripForm = (): TripFormBase => ({
  clientId: '',
  clientName: '',
  driverId: '',
  driverName: '',

  deliveryType: '',
  customDeliveryDescription: '',

  priority: 'normal',

  pickupLocation: '',
  dropoffLocation: '',
  dateTime: '',
  status: 'pending',

  cost: '',
  distanceKm: '',

  vehicleType: '',
  locationZone: '',
  shiftWindow: '',

  complianceFlag: false,
  recurrenceRule: 'none',

  notes: '',
});

export function EditTripModal(props: EditTripProps) {
  const [formData, setFormData] = useState<EditTripFormData>(
    createEmptyTripForm()
  );

  const {
    isEditModalOpen,
    setIsEditModalOpen,
    selectedTrip,
    loading,
    resetForm,
    handleUpdateTrip,
  } = props;

  useEffect(() => {
    if (!selectedTrip) return;

    setFormData({
      ...createEmptyTripForm(),
      ...selectedTrip,
    });
  }, [selectedTrip]);

  const {
    isLoadingVehicleTypes,
    vehicleTypes,
    isLoadingShiftWindows,
    shiftWindows,
    isLoadingZones,
    zones,
  } = useSysConfig();

  return (
    <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl">
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>
              Edit Trip - {selectedTrip?.shortId}
            </AlertDialogTitle>
            <AlertDialogCancel
              className="text-gray-700"
              onClick={() => setIsEditModalOpen(false)}
            >
              <X />
            </AlertDialogCancel>
          </div>

          <AlertDialogDescription className="text-gray-400">
            Update trip information and status.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-6 pt-4 max-h-[70vh] overflow-y-auto pr-1">
          <EditTripBasics formData={formData} setFormData={setFormData} />
          <LocationSection formData={formData} setFormData={setFormData} />
          <EditTripSchedule formData={formData} setFormData={setFormData} />
          <MetricSection formData={formData} setFormData={setFormData} />
          {/* <EditTripCosts {...props} /> */}
          <EditTripConfig
            formData={formData}
            setFormData={setFormData}
            vehicleTypes={vehicleTypes}
            zones={zones}
            isLoadingVehicleTypes={isLoadingVehicleTypes}
            isLoadingZones={isLoadingZones}
            shiftWindows={shiftWindows}
            isLoadingShiftWindows={isLoadingShiftWindows}
          />
          <EditTripCompliance formData={formData} setFormData={setFormData} />
        </div>

        <AlertDialogFooter className="border-t border-gray-700 pt-4 bg-gray-800 sticky z-20">
          <Button
            variant="outline"
            onClick={() => {
              setIsEditModalOpen(false);
              resetForm();
            }}
            className="text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateTrip(formData)}
            disabled={loading}
            className="primary-button"
          >
            {loading ? <Spinner className="mx-8" /> : 'Update Trip'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { useTrips } from '@/hooks/trips/useTrips';
// import { X } from 'lucide-react';
// import { useSysConfig } from '@/hooks/settings/useSysConfg';
// import { useUsers } from '@/hooks/useUsers';
// import { Spinner } from '@/components/ui/spinner';

// type EditTripProps = ReturnType<typeof useTrips>;

// export function EditTripModal({
//   isEditModalOpen,
//   setIsEditModalOpen,
//   selectedTrip,
//   formData,
//   setFormData,
//   loading,
//   resetForm,
//   handleUpdateTrip,
// }: EditTripProps) {
//   const { users, loading: loadingUsers } = useUsers();
//   const drivers = users.filter((user) => user.role === 'driver');
//   const clients = users.filter((user) => user.role === 'client');

//   const {
//     isLoadingPriorityLevels,
//     priorityLevels,
//     isLoadingVehicleTypes,
//     vehicleTypes,
//     shiftWindows,
//     isLoadingShiftWindows,
//     isLoadingZones,
//     zones,
//   } = useSysConfig();

//   return (
//     <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//       <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl ">
//         <AlertDialogHeader>
//           <div className="flex justify-between">
//             <AlertDialogTitle>
//               Edit Trip - {selectedTrip?.shortId}
//             </AlertDialogTitle>
//             <AlertDialogCancel
//               className="text-gray-700"
//               onClick={() => setIsEditModalOpen(false)}
//             >
//               <X />
//             </AlertDialogCancel>
//           </div>

//           <AlertDialogDescription className="text-gray-400">
//             Update trip information and statusnn.
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <div className="grid gap-4 pt-4 max-h-[70vh] overflow-y-auto pr-1">
//           <div className="grid grid-cols-2 gap-4">
//             {/* Driver & Client Name */}
//             <div>
//               <Label htmlFor="client" className="text-gray-300 mb-2">
//                 Client
//               </Label>

//               <Select
//                 value={formData.clientId}
//                 onValueChange={(value) => {
//                   const selectedClient = clients.find((d) => d.id === value);
//                   setFormData({
//                     ...formData,
//                     clientId: value,
//                     clientName: selectedClient ? selectedClient.name : '',
//                   });
//                 }}
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
//                   <SelectValue
//                     placeholder={
//                       loadingUsers ? 'Loading clients...' : 'Select client'
//                     }
//                   />
//                 </SelectTrigger>

//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   {loadingUsers ? (
//                     <div className="p-2 text-gray-400 text-sm">
//                       Loading clients...
//                     </div>
//                   ) : clients.length === 0 ? (
//                     <div className="p-2 text-gray-400 text-sm">
//                       No clients found
//                     </div>
//                   ) : (
//                     clients.map((client) => (
//                       <SelectItem key={client.id} value={client.id}>
//                         {client.name}
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="client" className="text-gray-300">
//                 Client Name
//               </Label>
//               <Input
//                 id="client"
//                 value={formData.clientName}
//                 onChange={(e) =>
//                   setFormData({ ...formData, clientName: e.target.value })
//                 }
//                 placeholder="Enter client name"
//                 className="bg-gray-700 border-gray-600 text-white mt-2"
//               />
//             </div>

//             <div>
//               <Label htmlFor="driverAssigned" className="text-gray-300">
//                 Assign Driver
//               </Label>
//               <Select
//                 value={formData.driverId}
//                 onValueChange={(value) => {
//                   const selectedDriver = drivers.find((d) => d.id === value);
//                   setFormData({
//                     ...formData,
//                     driverId: value,
//                     driverName: selectedDriver ? selectedDriver.name : '',
//                   });
//                 }}
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue
//                     placeholder={
//                       loadingUsers ? 'Loading drivers...' : 'Select driver'
//                     }
//                   />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   {drivers.length > 0 ? (
//                     drivers.map((driver) => (
//                       <SelectItem key={driver.id} value={driver.id}>
//                         {driver.name}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className="text-gray-400 text-sm p-2 italic">
//                       No drivers found <br /> kindly register a driver first.
//                     </div>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="driver" className="text-gray-300">
//                 Driver Name
//               </Label>
//               <Input
//                 id="driver"
//                 value={formData.driverName}
//                 onChange={(e) =>
//                   setFormData({ ...formData, driverName: e.target.value })
//                 }
//                 placeholder="Enter driver name"
//                 className="bg-gray-700 border-gray-600 text-white mt-2"
//               />
//             </div>

//             {/* Delivery Type */}
//             <div className="">
//               <Label className="text-gray-300">Delivery Type</Label>
//               <Select
//                 value={formData.deliveryType}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, deliveryType: value })
//                 }
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue placeholder="Select type of delivery" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   <SelectItem value="clinical_waste">Clinical Waste</SelectItem>
//                   <SelectItem value="documents">Documents</SelectItem>
//                   <SelectItem value="equipment">Equipment</SelectItem>
//                   <SelectItem value="samples">Samples</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>

//               {/* If "Other" → show text area */}
//               {formData.deliveryType === 'other' && (
//                 <div className="mt-3">
//                   <Label className="block text-sm font-medium mb-1">
//                     Custom Delivery Description
//                   </Label>
//                   <Textarea
//                     value={formData.customDeliveryDescription}
//                     onChange={(e) =>
//                       setFormData((prev: any) => ({
//                         ...prev,
//                         customDeliveryDescription: e.target.value,
//                       }))
//                     }
//                     className="bg-gray-700 border-gray-600 text-white mt-2"
//                     rows={2}
//                     placeholder="Enter custom delivery details..."
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Priority */}
//             <div>
//               <Label htmlFor="priority" className="text-gray-300">
//                 Priority
//               </Label>
//               <Select
//                 value={formData.priority}
//                 onValueChange={(value) => {
//                   setFormData({
//                     ...formData,
//                     priority: value.toLowerCase(),
//                   });
//                 }}
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue
//                     placeholder={
//                       isLoadingPriorityLevels
//                         ? 'Loading priorities...'
//                         : 'Select priority'
//                     }
//                   />
//                 </SelectTrigger>

//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   {priorityLevels.length > 0 ? (
//                     priorityLevels.map((priority) => (
//                       <SelectItem
//                         key={priority.id}
//                         value={priority.name.toLowerCase()}
//                       >
//                         {priority.name}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className="text-gray-400 text-sm p-2 italic">
//                       No priority levels found <br /> add one in your System
//                       Config.
//                     </div>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Pickup + Dropoff */}
//           <div>
//             <Label htmlFor="pickup" className="text-gray-300">
//               Pickup Address
//             </Label>
//             <Input
//               id="pickup"
//               value={formData.pickupLocation}
//               onChange={(e) =>
//                 setFormData({ ...formData, pickupLocation: e.target.value })
//               }
//               placeholder="Enter pickup location"
//               className="bg-gray-700 border-gray-600 text-white mt-2"
//             />
//           </div>
//           <div>
//             <Label htmlFor="dropoff" className="text-gray-300">
//               Dropoff Address
//             </Label>
//             <Input
//               id="dropoff"
//               value={formData.dropoffLocation}
//               onChange={(e) =>
//                 setFormData({ ...formData, dropoffLocation: e.target.value })
//               }
//               placeholder="Enter dropoff location"
//               className="bg-gray-700 border-gray-600 text-white mt-2"
//             />
//           </div>

//           {/* DateTime & Status */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="datetime" className="text-gray-300">
//                 Trip Date & Time
//               </Label>
//               <Input
//                 id="datetime"
//                 type="datetime-local"
//                 value={formData.dateTime}
//                 onChange={(e) =>
//                   setFormData({ ...formData, dateTime: e.target.value })
//                 }
//                 className="bg-gray-700 border-gray-600 text-white mt-2"
//               />
//             </div>
//             <div className="">
//               <Label htmlFor="status" className="text-gray-300">
//                 Status
//               </Label>
//               <Select
//                 value={formData.status}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, status: value })
//                 }
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="in_progress">In Progress</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                   <SelectItem value="cancelled">Canceled</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Cost + Distance */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="cost" className="text-gray-300">
//                 Cost
//               </Label>
//               <Input
//                 id="cost"
//                 type="number"
//                 value={formData.cost}
//                 onChange={(e) =>
//                   setFormData({ ...formData, cost: e.target.value })
//                 }
//                 placeholder="Enter cost"
//                 className="bg-gray-700 border-gray-600 text-white mt-2"
//               />
//             </div>

//             <div>
//               <Label htmlFor="distanceKm" className="text-gray-300">
//                 Distance (km)
//               </Label>
//               <Input
//                 id="distanceKm"
//                 type="number"
//                 value={formData.distanceKm}
//                 onChange={(e) =>
//                   setFormData({ ...formData, distanceKm: e.target.value })
//                 }
//                 placeholder="Enter distance in km"
//                 className="bg-gray-700 border-gray-600 text-white mt-2"
//               />
//             </div>
//           </div>

//           {/* Vehicle + Zone */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* Vehicle Type */}
//             <div>
//               <Label htmlFor="vehicleType" className="text-gray-300">
//                 Vehicle Type
//               </Label>
//               <Select
//                 value={formData.vehicleType}
//                 onValueChange={(value) => {
//                   setFormData({
//                     ...formData,
//                     vehicleType: value.toLowerCase(),
//                   });
//                 }}
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue
//                     placeholder={
//                       isLoadingVehicleTypes
//                         ? 'Loading vehicles...'
//                         : 'Select vehicle'
//                     }
//                   />
//                 </SelectTrigger>

//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   {vehicleTypes.length > 0 ? (
//                     vehicleTypes.map((vehicle) => (
//                       <SelectItem
//                         key={vehicle.id}
//                         value={vehicle.name.toLowerCase()}
//                       >
//                         {vehicle.name}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className="text-gray-400 text-sm p-2 italic">
//                       No vehicle types found <br /> add one in your System
//                       Config.
//                     </div>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Location Zone */}
//             <div>
//               <Label htmlFor="locationZone" className="text-gray-300">
//                 Location Zone
//               </Label>
//               <Select
//                 value={formData.locationZone}
//                 onValueChange={(value) => {
//                   setFormData({
//                     ...formData,
//                     locationZone: value,
//                   });
//                 }}
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue
//                     placeholder={
//                       isLoadingZones
//                         ? 'Loading zones...'
//                         : 'Select location zone'
//                     }
//                   />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   {zones.length > 0 ? (
//                     zones.map((zone) => (
//                       <SelectItem key={zone.id} value={zone.name.toLowerCase()}>
//                         {zone.name}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className="text-gray-400 text-sm p-2 italic">
//                       No zones found <br /> add one in your System Config.
//                     </div>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Shift + Compliance + Recurrence */}
//           <div className="grid grid-cols-3 gap-4">
//             {/* Shift Window */}
//             <div>
//               <Label htmlFor="shiftWindow" className="text-gray-300">
//                 Shift Window
//               </Label>
//               <Select
//                 value={formData.shiftWindow}
//                 onValueChange={(value) => {
//                   setFormData({
//                     ...formData,
//                     shiftWindow: value,
//                   });
//                 }}
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue
//                     placeholder={
//                       isLoadingShiftWindows
//                         ? 'Loading shift windows...'
//                         : 'Select shift window'
//                     }
//                   />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   {shiftWindows.length > 0 ? (
//                     shiftWindows.map((window) => (
//                       <SelectItem
//                         key={window.id}
//                         value={window.name.toLowerCase()}
//                       >
//                         {window.name}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className="text-gray-400 text-sm p-2 italic">
//                       No shift windows found <br /> add one in your System
//                       Config.
//                     </div>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="complianceFlag" className="text-gray-300">
//                 Compliance
//               </Label>
//               <Select
//                 value={String(formData.complianceFlag)}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, complianceFlag: value === 'true' })
//                 }
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   <SelectItem value="true">Yes</SelectItem>
//                   <SelectItem value="false">No</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="recurrenceRule" className="text-gray-300">
//                 Recurrence
//               </Label>
//               <Select
//                 value={formData.recurrenceRule}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, recurrenceRule: value })
//                 }
//               >
//                 <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
//                   <SelectValue placeholder="Select recurrence" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700 border-gray-600">
//                   <SelectItem value="none">None</SelectItem>
//                   <SelectItem value="weekly">Weekly</SelectItem>
//                   <SelectItem value="monthly">Monthly</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Notes */}
//           <div>
//             <Label htmlFor="notes" className="text-gray-300">
//               Notes / Special Instructions
//             </Label>
//             <Textarea
//               id="notes"
//               value={formData.notes}
//               onChange={(e) =>
//                 setFormData({ ...formData, notes: e.target.value })
//               }
//               placeholder="Enter any special instructions or notes"
//               className="bg-gray-700 border-gray-600 text-white mt-2"
//               rows={3}
//             />
//           </div>
//         </div>

//         <AlertDialogFooter className="border-t border-gray-700 pt-4 bg-gray-800 sticky z-20">
//           <Button
//             variant="outline"
//             onClick={() => {
//               setIsEditModalOpen(false);
//               resetForm();
//             }}
//             className="text-gray-700"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleUpdateTrip}
//             disabled={loading}
//             className="primary-button"
//           >
//             {loading ? <Spinner className="mx-8" /> : 'Update Trip'}
//           </Button>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
