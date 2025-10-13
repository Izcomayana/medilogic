'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';
import { useAuth } from '@/components/auth';

const API_BASE_URL = 'https://medilogic-backend.onrender.com';

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

export function useSysConfig() {
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

  return {
    initialPriorityLevels,
    initialVehicleTypes,
    initialShiftWindows,
    initialZones,
    configTab,
    setConfigTab,
    isVehicleModalOpen,
    setIsVehicleModalOpen,
    isPriorityModalOpen,
    setIsPriorityModalOpen,
    isShiftModalOpen,
    setIsShiftModalOpen,
    isZoneModalOpen,
    setIsZoneModalOpen,
    deleteConfirmDialog,
    setDeleteConfirmDialog,
    vehicleTypes,
    setVehicleTypes,
    priorityLevels,
    setPriorityLevels,
    shiftWindows,
    setShiftWindows,
    zones,
    setZones,
    newVehicle,
    setNewVehicle,
    newPriority,
    setNewPriority,
    newShift,
    setNewShift,
    newZone,
    setNewZone,
    handleAddVehicle,
    handleAddPriority,
    handleAddShift,
    handleAddZone,
    handleDeleteConfig,
  };
}
