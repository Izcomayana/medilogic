import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useState } from 'react';
import { Trash2, Plus, Truck, Flag, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Mock data for system configurations
const initialVehicleTypes = [
  {
    id: 'VT001',
    name: 'Van',
    description: 'Medium capacity delivery vehicle',
    capacity: '1500 kg',
  },
  {
    id: 'VT002',
    name: 'Truck',
    description: 'Large capacity for bulk deliveries',
    capacity: '5000 kg',
  },
  {
    id: 'VT003',
    name: 'Mini',
    description: 'Small compact vehicle for quick deliveries',
    capacity: '500 kg',
  },
  {
    id: 'VT004',
    name: 'Pickup',
    description: 'Versatile open-bed vehicle',
    capacity: '2000 kg',
  },
];

const initialPriorityLevels = [
  {
    id: 'PL001',
    name: 'Low',
    color: 'bg-gray-500',
    description: 'Standard priority',
  },
  {
    id: 'PL002',
    name: 'Medium',
    color: 'bg-yellow-500',
    description: 'Moderate urgency',
  },
  {
    id: 'PL003',
    name: 'High',
    color: 'bg-orange-500',
    description: 'Important deliveries',
  },
  {
    id: 'PL004',
    name: 'Critical',
    color: 'bg-red-500',
    description: 'Urgent, time-sensitive',
  },
];

const initialShiftWindows = [
  {
    id: 'SW001',
    name: 'Morning Shift',
    startTime: '06:00',
    endTime: '14:00',
    zone: 'Central Lagos',
  },
  {
    id: 'SW002',
    name: 'Afternoon Shift',
    startTime: '14:00',
    endTime: '22:00',
    zone: 'Victoria Island',
  },
  {
    id: 'SW003',
    name: 'Night Shift',
    startTime: '22:00',
    endTime: '06:00',
    zone: 'All Zones',
  },
];

const initialZones = [
  {
    id: 'Z001',
    name: 'Central Lagos',
    description: 'Downtown and CBD areas',
    region: 'Lagos Mainland',
  },
  {
    id: 'Z002',
    name: 'Victoria Island',
    description: 'High-end business district',
    region: 'Lagos Island',
  },
  {
    id: 'Z003',
    name: 'Ikeja',
    description: 'Industrial and commercial hub',
    region: 'Lagos Mainland',
  },
  {
    id: 'Z004',
    name: 'Lekki',
    description: 'Residential and leisure areas',
    region: 'Lagos Island',
  },
];

export function SystemConfigTab() {
  const [configTab, setConfigTab] = useState('vehicle-types');

  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{
    open: boolean;
    type: string;
    id: string;
    name: string;
  }>({ open: false, type: '', id: '', name: '' });

  // Config data state
  const [vehicleTypes, setVehicleTypes] = useState(initialVehicleTypes);
  const [priorityLevels, setPriorityLevels] = useState(initialPriorityLevels);
  const [shiftWindows, setShiftWindows] = useState(initialShiftWindows);
  const [zones, setZones] = useState(initialZones);

  // Form state for new entries
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    description: '',
    capacity: '',
  });
  const [newPriority, setNewPriority] = useState({
    name: '',
    color: 'bg-gray-500',
    description: '',
  });
  const [newShift, setNewShift] = useState({
    name: '',
    startTime: '',
    endTime: '',
    zone: '',
  });
  const [newZone, setNewZone] = useState({
    name: '',
    description: '',
    region: '',
  });

  // Config CRUD handlers
  const handleAddVehicle = () => {
    if (!newVehicle.name || !newVehicle.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    const vehicle = {
      id: `VT${String(vehicleTypes.length + 1).padStart(3, '0')}`,
      ...newVehicle,
    };
    setVehicleTypes([...vehicleTypes, vehicle]);
    setNewVehicle({ name: '', description: '', capacity: '' });
    setIsVehicleModalOpen(false);
    toast.success('Vehicle type added successfully');
  };

  const handleAddPriority = () => {
    if (!newPriority.name || !newPriority.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    const priority = {
      id: `PL${String(priorityLevels.length + 1).padStart(3, '0')}`,
      ...newPriority,
    };
    setPriorityLevels([...priorityLevels, priority]);
    setNewPriority({ name: '', color: 'bg-gray-500', description: '' });
    setIsPriorityModalOpen(false);
    toast.success('Priority level added successfully');
  };

  const handleAddShift = () => {
    if (!newShift.name || !newShift.startTime || !newShift.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    const shift = {
      id: `SW${String(shiftWindows.length + 1).padStart(3, '0')}`,
      ...newShift,
    };
    setShiftWindows([...shiftWindows, shift]);
    setNewShift({ name: '', startTime: '', endTime: '', zone: '' });
    setIsShiftModalOpen(false);
    toast.success('Shift window added successfully');
  };

  const handleAddZone = () => {
    if (!newZone.name || !newZone.description || !newZone.region) {
      toast.error('Please fill in all required fields');
      return;
    }
    const zone = {
      id: `Z${String(zones.length + 1).padStart(3, '0')}`,
      ...newZone,
    };
    setZones([...zones, zone]);
    setNewZone({ name: '', description: '', region: '' });
    setIsZoneModalOpen(false);
    toast.success('Zone added successfully');
  };

  const handleDeleteConfig = () => {
    const { type, id, name } = deleteConfirmDialog;
    switch (type) {
      case 'vehicle':
        setVehicleTypes(vehicleTypes.filter((v) => v.id !== id));
        break;
      case 'priority':
        setPriorityLevels(priorityLevels.filter((p) => p.id !== id));
        break;
      case 'shift':
        setShiftWindows(shiftWindows.filter((s) => s.id !== id));
        break;
      case 'zone':
        setZones(zones.filter((z) => z.id !== id));
        break;
    }
    toast.success(`${name} deleted successfully`);
    setDeleteConfirmDialog({ open: false, type: '', id: '', name: '' });
  };

  return (
    <>
      {/* System Configuration Tab */}
      <TabsContent value="system" className="p-6 space-y-6">
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              System Configuration
            </h3>
            <p className="text-sm text-gray-400">
              Manage key operational configurations that affect trips,
              assignments, and logistics workflows
            </p>
          </div>

          <Tabs
            value={configTab}
            onValueChange={setConfigTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 gap-2 bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="vehicle-types"
                className="flex items-center justify-start gap-2 p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white hover:bg-gray-700 transition-all rounded-md"
              >
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Vehicle Types</span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {vehicleTypes.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="priority-levels"
                className="flex items-center gap-2 p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">Priority Levels</span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {priorityLevels.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="shift-windows"
                className="flex items-center gap-2 p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Shift Windows</span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {shiftWindows.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="zones"
                className="flex items-center gap-2 p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Zones</span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {zones.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {/* Vehicle Types */}
            <TabsContent value="vehicle-types" className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-700 pb-1">
                <div>
                  <h4 className="text-white font-medium">Vehicle Types</h4>
                  <p className="text-sm text-gray-400">
                    Manage vehicle categories for your fleet
                  </p>
                </div>
                <Button
                  onClick={() => setIsVehicleModalOpen(true)}
                  className="primary-button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vehicle Type
                </Button>
              </div>

              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">
                        Description
                      </TableHead>
                      <TableHead className="text-gray-300">Capacity</TableHead>
                      <TableHead className="text-gray-300 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicleTypes.map((vehicle) => (
                      <TableRow key={vehicle.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">
                          {vehicle.name}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {vehicle.description}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {vehicle.capacity}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setDeleteConfirmDialog({
                                open: true,
                                type: 'vehicle',
                                id: vehicle.id,
                                name: vehicle.name,
                              })
                            }
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Priority Levels */}
            <TabsContent value="priority-levels" className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-700 pb-1">
                <div>
                  <h4 className="text-white font-medium">Priority Levels</h4>
                  <p className="text-sm text-gray-400">
                    Configure urgency levels for deliveries
                  </p>
                </div>
                <Button
                  onClick={() => setIsPriorityModalOpen(true)}
                  className="primary-button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Priority Level
                </Button>
              </div>

              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">Color</TableHead>
                      <TableHead className="text-gray-300">
                        Description
                      </TableHead>
                      <TableHead className="text-gray-300 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priorityLevels.map((priority) => (
                      <TableRow key={priority.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">
                          {priority.name}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${priority.color} text-white`}>
                            {priority.name}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {priority.description}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setDeleteConfirmDialog({
                                open: true,
                                type: 'priority',
                                id: priority.id,
                                name: priority.name,
                              })
                            }
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Shift Windows */}
            <TabsContent value="shift-windows" className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-700 pb-1">
                <div>
                  <h4 className="text-white font-medium">Shift Windows</h4>
                  <p className="text-sm text-gray-400">
                    Define operational shift times and zones
                  </p>
                </div>
                <Button
                  onClick={() => setIsShiftModalOpen(true)}
                  className="primary-button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shift Window
                </Button>
              </div>

              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">
                        Start Time
                      </TableHead>
                      <TableHead className="text-gray-300">End Time</TableHead>
                      <TableHead className="text-gray-300">Zone</TableHead>
                      <TableHead className="text-gray-300 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shiftWindows.map((shift) => (
                      <TableRow key={shift.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">
                          {shift.name}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {shift.startTime}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {shift.endTime}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {shift.zone}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setDeleteConfirmDialog({
                                open: true,
                                type: 'shift',
                                id: shift.id,
                                name: shift.name,
                              })
                            }
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Zones */}
            <TabsContent value="zones" className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-700 pb-1">
                <div>
                  <h4 className="text-white font-medium">Zones</h4>
                  <p className="text-sm text-gray-400">
                    Manage geographical service areas
                  </p>
                </div>
                <Button
                  onClick={() => setIsZoneModalOpen(true)}
                  className="primary-button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Zone
                </Button>
              </div>

              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">
                        Description
                      </TableHead>
                      <TableHead className="text-gray-300">Region</TableHead>
                      <TableHead className="text-gray-300 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {zones.map((zone) => (
                      <TableRow key={zone.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">
                          {zone.name}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {zone.description}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {zone.region}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setDeleteConfirmDialog({
                                open: true,
                                type: 'zone',
                                id: zone.id,
                                name: zone.name,
                              })
                            }
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </TabsContent>

      {/* Add Vehicle Type Modal */}
      <Dialog open={isVehicleModalOpen} onOpenChange={setIsVehicleModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-[#15941f]" />
              Add Vehicle Type
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new vehicle type for your fleet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="vehicleName" className="text-gray-300 mb-2">
                Name *
              </Label>
              <Input
                id="vehicleName"
                value={newVehicle.name}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, name: e.target.value })
                }
                placeholder="e.g., Van, Truck, Mini"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="vehicleDescription" className="text-gray-300 mb-2">
                Description *
              </Label>
              <Textarea
                id="vehicleDescription"
                value={newVehicle.description}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, description: e.target.value })
                }
                placeholder="Brief description of the vehicle type"
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vehicleCapacity" className="text-gray-300 mb-2">
                Capacity
              </Label>
              <Input
                id="vehicleCapacity"
                value={newVehicle.capacity}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, capacity: e.target.value })
                }
                placeholder="e.g., 1500 kg"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsVehicleModalOpen(false);
                setNewVehicle({ name: '', description: '', capacity: '' });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddVehicle} className="primary-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Priority Level Modal */}
      <Dialog open={isPriorityModalOpen} onOpenChange={setIsPriorityModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-[#15941f]" />
              Add Priority Level
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new priority level for deliveries.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="priorityName" className="text-gray-300 mb-2">
                Name *
              </Label>
              <Input
                id="priorityName"
                value={newPriority.name}
                onChange={(e) =>
                  setNewPriority({ ...newPriority, name: e.target.value })
                }
                placeholder="e.g., Low, Medium, High, Critical"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="priorityColor" className="text-gray-300 mb-2">
                Color *
              </Label>
              <Select
                value={newPriority.color}
                onValueChange={(value) =>
                  setNewPriority({ ...newPriority, color: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="bg-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-500" />
                      Gray
                    </div>
                  </SelectItem>
                  <SelectItem value="bg-blue-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-blue-500" />
                      Blue
                    </div>
                  </SelectItem>
                  <SelectItem value="bg-yellow-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-500" />
                      Yellow
                    </div>
                  </SelectItem>
                  <SelectItem value="bg-orange-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-orange-500" />
                      Orange
                    </div>
                  </SelectItem>
                  <SelectItem value="bg-red-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-500" />
                      Red
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priorityDescription" className="text-gray-300 mb-2">
                Description *
              </Label>
              <Textarea
                id="priorityDescription"
                value={newPriority.description}
                onChange={(e) =>
                  setNewPriority({
                    ...newPriority,
                    description: e.target.value,
                  })
                }
                placeholder="Brief description of the priority level"
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsPriorityModalOpen(false);
                setNewPriority({
                  name: '',
                  color: 'bg-gray-500',
                  description: '',
                });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddPriority} className="primary-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Priority Level
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Shift Window Modal */}
      <Dialog open={isShiftModalOpen} onOpenChange={setIsShiftModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#15941f]" />
              Add Shift Window
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Define a new operational shift window.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="shiftName" className="text-gray-300 mb-2">
                Name *
              </Label>
              <Input
                id="shiftName"
                value={newShift.name}
                onChange={(e) =>
                  setNewShift({ ...newShift, name: e.target.value })
                }
                placeholder="e.g., Morning Shift, Night Shift"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime" className="text-gray-300 mb-2">
                  Start Time *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newShift.startTime}
                  onChange={(e) =>
                    setNewShift({ ...newShift, startTime: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-gray-300 mb-2">
                  End Time *
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newShift.endTime}
                  onChange={(e) =>
                    setNewShift({ ...newShift, endTime: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shiftZone" className="text-gray-300 mb-2">
                Zone (Optional)
              </Label>
              <Input
                id="shiftZone"
                value={newShift.zone}
                onChange={(e) =>
                  setNewShift({ ...newShift, zone: e.target.value })
                }
                placeholder="e.g., Central Lagos, All Zones"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsShiftModalOpen(false);
                setNewShift({ name: '', startTime: '', endTime: '', zone: '' });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddShift} className="primary-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Shift Window
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Zone Modal */}
      <Dialog open={isZoneModalOpen} onOpenChange={setIsZoneModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#15941f]" />
              Add Zone
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new geographical service area.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="zoneName" className="text-gray-300 mb-2">
                Name *
              </Label>
              <Input
                id="zoneName"
                value={newZone.name}
                onChange={(e) =>
                  setNewZone({ ...newZone, name: e.target.value })
                }
                placeholder="e.g., Central Lagos, Victoria Island"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="zoneDescription" className="text-gray-300 mb-2">
                Description *
              </Label>
              <Textarea
                id="zoneDescription"
                value={newZone.description}
                onChange={(e) =>
                  setNewZone({ ...newZone, description: e.target.value })
                }
                placeholder="Brief description of the zone"
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="zoneRegion" className="text-gray-300 mb-2">
                Region *
              </Label>
              <Input
                id="zoneRegion"
                value={newZone.region}
                onChange={(e) =>
                  setNewZone({ ...newZone, region: e.target.value })
                }
                placeholder="e.g., Lagos Mainland, Lagos Island"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsZoneModalOpen(false);
                setNewZone({ name: '', description: '', region: '' });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddZone} className="primary-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
