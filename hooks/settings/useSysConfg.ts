'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';

const API_BASE_URL = 'https://medilogic-backend.onrender.com';

export function useSysConfig() {
  const [configTab, setConfigTab] = useState('vehicle-types');
  const [isLoadingVehicleTypes, setIsLoadingVehicleTypes] = useState(true);
  const [isLoadingPriorityLevels, setIsLoadingPriorityLevels] = useState(true);
  const [isLoadingShiftWindows, setIsLoadingShiftWindows] = useState(true);
  const [isLoadingZones, setIsLoadingZones] = useState(true);
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
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  const [priorityLevels, setPriorityLevels] = useState<any[]>([]);
  const [shiftWindows, setShiftWindows] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);

  const [newVehicle, setNewVehicle] = useState({
    name: '',
  });

  const [newPriority, setNewPriority] = useState({
    name: '',
  });

  const [newShift, setNewShift] = useState({
    name: '',
  });

  const [newZone, setNewZone] = useState({
    name: '',
  });

  const authorizedRequest = useAuthorizedRequest();

  // vehicle types
  useEffect(() => {
    const fetchVehicleTypes = async () => {
      setIsLoadingVehicleTypes(true);
      try {
        await authorizedRequest(async (token) => {
          const response = await axios.get(
            `${API_BASE_URL}/config/vehicle-types/`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setVehicleTypes(response.data || []);
        }, 'Failed to fetch vehicle types');
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
        toast.error('Failed to fetch vehicle types');
      } finally {
        setIsLoadingVehicleTypes(false);
      }
    };

    fetchVehicleTypes();
  }, [authorizedRequest]);

  const handleAddVehicle = async () => {
    if (!newVehicle.name) {
      toast.error('Please enter a vehicle type name');
      return;
    }

    setNewVehicle({ name: '' });
    try {
      await authorizedRequest(async (token) => {
        const response = await axios.post(
          `${API_BASE_URL}/config/vehicle-types/`,
          { name: newVehicle.name },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const createdVehicle = response.data;

        const vehicle = {
          ...createdVehicle,
        };

        setVehicleTypes((prev) => [...prev, vehicle]);
        setNewVehicle({ name: '' });
        setIsVehicleModalOpen(false);

        toast.success(`Vehicle type "${vehicle.name}" added successfully`);
      }, 'Failed to add vehicle type');
    } catch (error: any) {
      console.error('Error adding vehicle type:', error);
      toast.error('Failed to add vehicle type — using mock data');

      // 🧩 Fallback to local mock update
      const fallbackVehicle = {
        id: `VT${String(vehicleTypes.length + 1).padStart(3, '0')}`,
        ...newVehicle,
      };
      setVehicleTypes((prev) => [...prev, fallbackVehicle]);
      setNewVehicle({ name: '' });
      setIsVehicleModalOpen(false);
    }
  };

  // priority levels
  useEffect(() => {
    const fetchPriorityLevels = async () => {
      setIsLoadingPriorityLevels(true);
      try {
        await authorizedRequest(async (token) => {
          const response = await axios.get(
            `${API_BASE_URL}/config/priority-levels`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setPriorityLevels(response.data || []);
        }, 'Failed to fetch priority lebel s');
      } catch (error) {
        console.error('Error fetching priority lebel s:', error);
        toast.error('Failed to fetch priority lebel s');
      } finally {
        setIsLoadingPriorityLevels(false);
      }
    };

    fetchPriorityLevels();
  }, [authorizedRequest]);

  const handleAddPriority = async () => {
    if (!newPriority.name) {
      toast.error('Please enter a priority level name');
      return;
    }

    setNewPriority({ name: '' });
    try {
      await authorizedRequest(async (token) => {
        const response = await axios.post(
          `${API_BASE_URL}/config/priority-levels`,
          { name: newPriority.name },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const createdPriorityLevel = response.data;

        const priorityLevel = {
          ...createdPriorityLevel,
        };

        setPriorityLevels((prev) => [...prev, priorityLevel]);
        setIsPriorityModalOpen(false);

        toast.success(
          `Priority level "${priorityLevel.name}" added successfully`
        );
      }, 'Failed to add Priority level');
    } catch (error: any) {
      console.error('Error adding Priority level:', error);
      toast.error('Failed to add Priority level — using mock data');

      // 🧩 Fallback to local mock update
      const fallbackPriorityLevel = {
        id: `VT${String(priorityLevels.length + 1).padStart(3, '0')}`,
        ...newPriority,
      };
      setPriorityLevels((prev) => [...prev, fallbackPriorityLevel]);
      setNewPriority({ name: '' });
      setIsPriorityModalOpen(false);
    }
  };

  // shift window
  useEffect(() => {
    const fetchShiftWindows = async () => {
      setIsLoadingShiftWindows(true);
      try {
        await authorizedRequest(async (token) => {
          const response = await axios.get(
            `${API_BASE_URL}/config/shift-windows`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setShiftWindows(response.data || []);
        }, 'Failed to fetch shift windows');
      } catch (error) {
        console.error('Error fetching shift windows:', error);
        toast.error('Failed to fetch shift windows');
      } finally {
        setIsLoadingShiftWindows(false);
      }
    };

    fetchShiftWindows();
  }, [authorizedRequest]);

  const handleAddShift = async () => {
    if (!newShift.name) {
      toast.error('Please enter a shift window name');
      return;
    }

    try {
      await authorizedRequest(async (token) => {
        const response = await axios.post(
          `${API_BASE_URL}/config/shift-windows`,
          { name: newShift.name },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const createdShiftWindow = response.data;

        const shiftWindow = {
          ...createdShiftWindow,
        };

        setShiftWindows((prev) => [...prev, shiftWindow]);
        setNewShift({ name: '' });
        setIsShiftModalOpen(false);

        toast.success(`Shift window "${shiftWindow.name}" added successfully`);
      }, 'Failed to add Shift window');
    } catch (error: any) {
      console.error('Error adding Shift window:', error);
      toast.error('Failed to add Shift window — using mock data');

      // 🧩 Fallback to local mock update
      const fallbackShiftWindow = {
        id: `VT${String(shiftWindows.length + 1).padStart(3, '0')}`,
        ...newShift,
      };
      setShiftWindows((prev) => [...prev, fallbackShiftWindow]);
      setNewShift({ name: '' });
      setIsShiftModalOpen(false);
    }
    const shift = {
      id: `SW${String(shiftWindows.length + 1).padStart(3, '0')}`,
      ...newShift,
    };
    setShiftWindows([...shiftWindows, shift]);
    setNewShift({ name: '' });
    setIsShiftModalOpen(false);
    toast.success('Shift window added successfully');
  };

  // zones
  useEffect(() => {
    const fetchZones = async () => {
      setIsLoadingZones(true);
      try {
        await authorizedRequest(async (token) => {
          const response = await axios.get(`${API_BASE_URL}/config/zones`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setZones(response.data || []);
        }, 'Failed to fetch zones');
      } catch (error) {
        console.error('Error fetching zones:', error);
        toast.error('Failed to fetch zones');
      } finally {
        setIsLoadingZones(false);
      }
    };

    fetchZones();
  }, [authorizedRequest]);

  const handleAddZone = async () => {
    if (!newZone.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await authorizedRequest(async (token) => {
        const response = await axios.post(
          `${API_BASE_URL}/config/zones`,
          { name: newZone.name },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const createdZone = response.data;

        const zone = {
          ...createdZone,
        };

        setZones((prev) => [...prev, zone]);
        setNewShift({ name: '' });
        setIsZoneModalOpen(false);

        toast.success(`Zone "${zone.name}" added successfully`);
      }, 'Failed to add Zone');
    } catch (error: any) {
      console.error('Error adding Zone:', error);
      toast.error('Failed to add Zone — using mock data');

      // 🧩 Fallback to local mock update
      const fallbackZone = {
        id: `VT${String(zones.length + 1).padStart(3, '0')}`,
        ...newZone,
      };
      setZones((prev) => [...prev, fallbackZone]);
      setNewZone({ name: '' });
      setIsZoneModalOpen(false);
    }
    const zone = {
      id: `SW${String(zones.length + 1).padStart(3, '0')}`,
      ...newZone,
    };
    setZones([...zones, zone]);
    setNewShift({ name: '' });
    setIsZoneModalOpen(false);
    toast.success('Zone added successfully');
  };

  const handleDeleteConfig = async () => {
    const { type, id, name } = deleteConfirmDialog;

    try {
      if (type === 'vehicle') {
        await authorizedRequest(async (token) => {
          await axios.delete(`${API_BASE_URL}/config/vehicle-types/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }, 'Failed to delete vehicle type');

        setVehicleTypes((prev) => prev.filter((v) => v.id !== id));
        toast.success(`Vehicle type "${name}" deleted successfully`);
      } else if (type === 'priority') {
        await authorizedRequest(async (token) => {
          await axios.delete(`${API_BASE_URL}/config/priority-levels/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }, 'Failed to delete priority level');

        setPriorityLevels((prev) => prev.filter((v) => v.id !== id));
        toast.success(`Priority level "${name}" deleted successfully`);
      } else if (type === 'shift') {
        await authorizedRequest(async (token) => {
          await axios.delete(`${API_BASE_URL}/config/shift-windows/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }, 'Failed to delete shift window');

        setShiftWindows((prev) => prev.filter((v) => v.id !== id));
        toast.success(`Shift window "${name}" deleted successfully`);
      } else if (type === 'zone') {
        await authorizedRequest(async (token) => {
          await axios.delete(`${API_BASE_URL}/config/zones/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }, 'Failed to delete zone');

        setZones((prev) => prev.filter((v) => v.id !== id));
        toast.success(`Zone "${name}" deleted successfully`);
      }
    } catch (error: any) {
      console.error('Error deleting configuration:', error);
      toast.error(
        error.response?.data?.detail || 'Failed to delete configuration'
      );
    } finally {
      setDeleteConfirmDialog({ open: false, type: '', id: '', name: '' });
    }
  };

  return {
    configTab,
    isLoadingVehicleTypes,
    isLoadingPriorityLevels,
    isLoadingShiftWindows,
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
