'use client';

import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';

export type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  user_id?: string;
};

export function useNotifications(notificationsPerPage = 10) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);

  const authorizedRequest = useAuthorizedRequest();

  // --- Fetch notifications from backend ---
  useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);

      const data = await authorizedRequest(async (validToken) => {
        const res = await axios.get(
          `https://medilogic-backend.onrender.com/notifications`,
          {
            headers: { Authorization: `Bearer ${validToken}` },
            // params: { skip: 0, limit: 50 }, // pagination if needed
          }
        );

        const arr: any[] = Array.isArray(res.data) ? res.data : [];

        const mapped: Notification[] = arr.map((n: any, idx: number) => ({
          id: n.id || `${idx}`,
          type: n.type || 'system',
          title: n.title || 'No Title',
          message: n.message || '',
          isRead: n.is_read ?? false,
          timestamp: n.created_at || new Date().toISOString(),
          user_id: n.user_id,
        }));

        return mapped;
      }, 'Failed to load notifications');

      if (isMounted) {
        if (data) setNotifications(data);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  // --- derived values ---
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'unread' && !notification.isRead) ||
        (activeTab === 'read' && notification.isRead);
      const matchesType =
        typeFilter === 'all' || notification.type === typeFilter;
      return matchesSearch && matchesTab && matchesType;
    });
  }, [notifications, searchTerm, activeTab, typeFilter]);

  const totalPages = Math.ceil(
    filteredNotifications.length / notificationsPerPage
  );
  const startIndex = (currentPage - 1) * notificationsPerPage;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + notificationsPerPage
  );

  // --- actions (UI only) ---
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    toast.success('Notification marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedNotifications((prev) => prev.filter((sid) => sid !== id));
    toast.success('Notification deleted');
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const bulkMarkAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n
      )
    );
    setSelectedNotifications([]);
    toast.success(
      `${selectedNotifications.length} notifications marked as read`
    );
  };

  const bulkDelete = () => {
    setNotifications((prev) =>
      prev.filter((n) => !selectedNotifications.includes(n.id))
    );
    setSelectedNotifications([]);
    toast.success(`${selectedNotifications.length} notifications deleted`);
  };

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAllVisible = () => {
    const visibleIds = paginatedNotifications.map((n) => n.id);
    setSelectedNotifications(visibleIds);
  };

  return {
    notifications,
    loading,
    error,

    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    typeFilter,
    setTypeFilter,
    selectedNotifications,
    setSelectedNotifications,
    currentPage,
    setCurrentPage,

    unreadCount,
    filteredNotifications,
    paginatedNotifications,
    totalPages,
    startIndex,

    markAsRead,
    deleteNotification,
    markAllAsRead,
    bulkMarkAsRead,
    bulkDelete,
    toggleSelectNotification,
    selectAllVisible,
    notificationsPerPage,
  };
}
