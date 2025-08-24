'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { NotificationsDropdown } from '@/components/ui/notifications-dropdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell, Search, Check, Trash2, CheckCheck, Filter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

  const filteredNotifications = notifications.filter((notification) => {
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

  const totalPages = Math.ceil(
    filteredNotifications.length / notificationsPerPage
  );
  const startIndex = (currentPage - 1) * notificationsPerPage;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + notificationsPerPage
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    toast.success('Notification marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    setSelectedNotifications((prev) =>
      prev.filter((selectedId) => selectedId !== id)
    );
    toast.success('Notification deleted');
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    toast.success('All notifications marked as read');
  };

  const bulkMarkAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) =>
        selectedNotifications.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setSelectedNotifications([]);
    toast.success(
      `${selectedNotifications.length} notifications marked as read`
    );
  };

  const bulkDelete = () => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => !selectedNotifications.includes(notification.id)
      )
    );
    setSelectedNotifications([]);
    toast.success(`${selectedNotifications.length} notifications deleted`);
  };

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAllVisible = () => {
    const visibleIds = paginatedNotifications.map((n) => n.id);
    setSelectedNotifications(visibleIds);
  };

  const getStatusBadge = (isRead: boolean) => {
    return isRead ? (
      <Badge variant="outline" className="border-gray-600 text-gray-400">
        Read
      </Badge>
    ) : (
      <Badge className="bg-[#15941f] text-white">Unread</Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'application':
        return (
          <Badge variant="secondary" className="bg-blue-600 text-white">
            Application
          </Badge>
        );
      case 'organization':
        return (
          <Badge variant="secondary" className="bg-purple-600 text-white">
            Organization
          </Badge>
        );
      case 'regulator':
        return (
          <Badge variant="secondary" className="bg-orange-600 text-white">
            Regulator
          </Badge>
        );
      case 'compliance':
        return (
          <Badge variant="secondary" className="bg-green-600 text-white">
            Compliance
          </Badge>
        );
      case 'system':
        return (
          <Badge variant="secondary" className="bg-gray-600 text-white">
            System
          </Badge>
        );
      case 'alert':
        return <Badge variant="destructive">Alert</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-3">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">Notifications</h1>
          <p className="text-sm text-gray-400">
            Stay updated on important system activities. You can mark
            notifications as read or delete them.
          </p>
        </div>
        {/* <Button onClick={markAllAsRead} className="primary-button">
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button> */}
        <NotificationsDropdown />
      </header>

      <main className="flex-1 p-3">
        {/* Tabs and Filters */}
        <Card className="dashboard-card mb-6 py-3">
          <CardHeader className="p-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications ({filteredNotifications.length})
              {unreadCount > 0 && (
                <Badge className="bg-red-600 text-white ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {/* Tabs */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex bg-gray-800 rounded-lg p-1">
                <Button
                  variant={activeTab === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('all')}
                  className={
                    activeTab === 'all'
                      ? 'primary-button'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }
                >
                  All ({notifications.length})
                </Button>
                <Button
                  variant={activeTab === 'unread' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('unread')}
                  className={
                    activeTab === 'unread'
                      ? 'primary-button'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }
                >
                  Unread ({unreadCount})
                </Button>
                <Button
                  variant={activeTab === 'read' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('read')}
                  className={
                    activeTab === 'read'
                      ? 'primary-button'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }
                >
                  Read ({notifications.length - unreadCount})
                </Button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="application">Application</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="regulator">Regulator</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <div className="flex items-center gap-2 mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <span className="text-sm text-gray-300">
                  {selectedNotifications.length} notification(s) selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={bulkMarkAsRead}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark as Read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={bulkDelete}
                  className="border-gray-600 text-red-400 hover:bg-gray-700 bg-transparent"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications Table */}
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Notifications List</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllVisible}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  Select All Visible
                </Button>
                <div className="text-sm text-gray-400">
                  Showing {startIndex + 1}-
                  {Math.min(
                    startIndex + notificationsPerPage,
                    filteredNotifications.length
                  )}{' '}
                  of {filteredNotifications.length}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  You're all caught up!
                </h3>
                <p className="text-gray-400">
                  No notifications available for the selected filters.
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-md border border-gray-700">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={
                              paginatedNotifications.length > 0 &&
                              paginatedNotifications.every((n) =>
                                selectedNotifications.includes(n.id)
                              )
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                selectAllVisible();
                              } else {
                                setSelectedNotifications([]);
                              }
                            }}
                            className="border-gray-600 data-[state=checked]:bg-[#15941f] data-[state=checked]:border-[#15941f]"
                          />
                        </TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Message</TableHead>
                        <TableHead className="text-gray-300">
                          Timestamp
                        </TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedNotifications.map((notification) => (
                        <TableRow
                          key={notification.id}
                          className={`border-gray-700 hover:bg-gray-800 ${
                            !notification.isRead ? 'bg-gray-800/50' : ''
                          }`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedNotifications.includes(
                                notification.id
                              )}
                              onCheckedChange={() =>
                                toggleSelectNotification(notification.id)
                              }
                              className="border-gray-600 data-[state=checked]:bg-[#15941f] data-[state=checked]:border-[#15941f]"
                            />
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(notification.isRead)}
                          </TableCell>
                          <TableCell>
                            {getTypeBadge(notification.type)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-start gap-3">
                              <span className="text-lg">
                                {notification.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium ${
                                    !notification.isRead
                                      ? 'text-white'
                                      : 'text-gray-300'
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300 text-sm">
                            {notification.timestamp}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {!notification.isRead && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Mark as Read
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="border-gray-600 text-red-400 hover:bg-gray-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-400">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
