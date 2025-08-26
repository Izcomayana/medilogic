'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';

export type Notification = {
  id: string;
  type: string;
  icon: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
};

const allNotifications = [
  {
    id: 'N001',
    type: 'application',
    icon: '📥',
    title: 'New Org Application: Clinic ABC',
    message:
      'Regulator John Doe applied for access to review Clinic ABC operations',
    timestamp: '2025-08-22 14:03',
    isRead: false,
  },
  {
    id: 'N002',
    type: 'organization',
    icon: '🏢',
    title: 'Organization Created: TechCorp Solutions',
    message:
      "New organization 'TechCorp Solutions' has been successfully created",
    timestamp: '2025-08-22 12:30',
    isRead: true,
  },
  {
    id: 'N003',
    type: 'regulator',
    icon: '🛡',
    title: 'Regulator Jane Smith approved',
    message:
      'Regulator application for Jane Smith has been approved and activated',
    timestamp: '2025-08-22 11:20',
    isRead: true,
  },
  {
    id: 'N004',
    type: 'alert',
    icon: '⚠️',
    title: 'Driver #45 trip failed',
    message:
      'Trip assignment for Driver #45 failed and requires immediate attention',
    timestamp: '2025-08-21 19:55',
    isRead: false,
  },
  {
    id: 'N005',
    type: 'compliance',
    icon: '🛡',
    title: 'Compliance Report Submitted',
    message: 'Lagos State compliance report has been submitted for review',
    timestamp: '2025-08-21 16:45',
    isRead: false,
  },
  {
    id: 'N006',
    type: 'system',
    icon: '⚙️',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance will occur on Sunday at 2:00 AM',
    timestamp: '2025-08-21 14:20',
    isRead: true,
  },
  {
    id: 'N007',
    type: 'application',
    icon: '📥',
    title: 'New Driver Application',
    message: 'Driver application from Michael Johnson requires approval',
    timestamp: '2025-08-21 10:15',
    isRead: false,
  },
  {
    id: 'N008',
    type: 'organization',
    icon: '🏢',
    title: 'Organization Deactivated',
    message: "Organization 'Inactive Corp Ltd' has been deactivated",
    timestamp: '2025-08-20 15:30',
    isRead: true,
  },
];

export function useNotifications(notificationsPerPage = 10) {
  const [notifications, setNotifications] = useState(allNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);

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

  // --- actions ---
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
