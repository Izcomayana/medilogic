'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { toast } from 'sonner';

interface AvailabilityEntry {
  day: string;
  startTime: string | null;
  endTime: string | null;
  isSet: boolean;
}

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export function useAvailability() {
  const authorizedRequest = useAuthorizedRequest();
  const [availability, setAvailability] = useState<AvailabilityEntry[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        await authorizedRequest(async (token) => {
          const res = await api.get('/availability/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const backendData = res.data as any[];

          // Convert backend data into your frontend structure
          const mappedAvailability: AvailabilityEntry[] = days.map((day) => {
            const match = backendData.find(
              (item) => item.day_of_week.toLowerCase() === day.toLowerCase()
            );

            if (!match) {
              return {
                day,
                startTime: null,
                endTime: null,
                isSet: false,
              };
            }

            // Extract HH:MM from backend time string
            const formatBackendTime = (time: string) => {
              if (!time) return null;
              return time.slice(0, 5); // "09:00:00" → "09:00"
            };

            return {
              day,
              startTime: formatBackendTime(match.start_time),
              endTime: formatBackendTime(match.end_time),
              isSet: true,
            };
          });

          setAvailability(mappedAvailability);
        }, 'Failed to fetch availability');
      } catch (error) {
        toast.error('Unable to load availability');
      }
    };

    fetchAvailability();
  }, []);

  const handleOpenModal = (day?: string) => {
    if (day) {
      const entry = availability.find((a) => a.day === day);
      if (entry) {
        setSelectedDay(day);
        setStartTime(entry.startTime || '');
        setEndTime(entry.endTime || '');
        setIsEditing(true);
      }
    } else {
      setSelectedDay('');
      setStartTime('');
      setEndTime('');
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay('');
    setStartTime('');
    setEndTime('');
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!selectedDay) {
      toast.error('Please select a day');
      return;
    }

    if (!startTime || !endTime) {
      toast.error('Please set both start and end times');
      return;
    }

    if (startTime >= endTime) {
      toast.error('End time must be after start time');
      return;
    }

    setAvailability((prev) =>
      prev.map((a) =>
        a.day === selectedDay ? { ...a, startTime, endTime, isSet: true } : a
      )
    );

    toast.success(`Availability for ${selectedDay} updated`);
    handleCloseModal();
  };

  const handleDelete = async (day: string) => {
    try {
      await authorizedRequest(async (token) => {
        await api.delete(`/availability/day/${day.toLowerCase()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }, 'Failed to delete availability');

      // Update UI only AFTER backend success
      setAvailability((prev) =>
        prev.map((a) =>
          a.day === day
            ? { ...a, startTime: null, endTime: null, isSet: false }
            : a
        )
      );

      toast.success(`Availability for ${day} deleted`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail?.[0]?.msg ??
          'Failed to delete availability'
      );
    }
  };

  const formatTimeWithSeconds = (time: string) => {
    return `${time}:00`;
  };

  const handleSaveAll = async () => {
    const formattedAvailability = availability
      .filter(
        (a): a is AvailabilityEntry & { startTime: string; endTime: string } =>
          a.isSet && !!a.startTime && !!a.endTime
      )
      .map((a) => ({
        day_of_week: a.day.toLowerCase(),
        start_time: formatTimeWithSeconds(a.startTime),
        end_time: formatTimeWithSeconds(a.endTime),
      }));

    if (formattedAvailability.length === 0) {
      toast.error('Please set at least one availability day');
      return;
    }

    try {
      await authorizedRequest(async (token) => {
        await api.post('/availability/', formattedAvailability, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }, 'failed to save changes');

      toast.success('Availability saved successfully 🚀');
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail?.[0]?.msg ?? 'Failed to save availability'
      );
    }
  };

  const totalSetDays = availability.filter((a) => a.isSet).length;

  return {
    days,
    availability,
    isEditing,
    isModalOpen,
    setIsModalOpen,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    handleOpenModal,
    handleCloseModal,
    handleSave,
    handleDelete,
    handleSaveAll,
    totalSetDays,
  };
}
