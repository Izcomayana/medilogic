'use client';

import { useState } from 'react';
import { Bell, Check, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { toast } from 'sonner';

const notifications = [
  {
    id: 'N001',
    type: 'application',
    icon: '📥',
    message: 'Regulator John Doe applied for access',
    timestamp: '2h ago',
    isRead: false,
  },
  {
    id: 'N002',
    type: 'organization',
    icon: '🏢',
    message: "New organization 'Clinic ABC' created",
    timestamp: '4h ago',
    isRead: false,
  },
  {
    id: 'N003',
    type: 'compliance',
    icon: '🛡',
    message: 'Compliance report submitted for Lagos State',
    timestamp: '6h ago',
    isRead: true,
  },
  {
    id: 'N004',
    type: 'alert',
    icon: '⚠️',
    message: 'Driver #45 trip failed - requires attention',
    timestamp: '8h ago',
    isRead: false,
  },
  {
    id: 'N005',
    type: 'approval',
    icon: '✅',
    message: 'Regulator Jane Smith approved',
    timestamp: '1d ago',
    isRead: true,
  },
];

export function NotificationsDropdown() {
  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    toast.success('Notification marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotificationList((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    toast.success('Notification deleted');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative text-white hover:bg-gray-800"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-xs text-white flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-gray-800 border-gray-700 text-white"
      >
        <div className="p-3 border-b border-gray-700">
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-400">{unreadCount} unread</p>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notificationList.slice(0, 8).map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                !notification.isRead ? 'bg-gray-750' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{notification.icon}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${!notification.isRead ? 'text-white font-medium' : 'text-gray-300'}`}
                  >
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.timestamp}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-[#15941f] rounded-full mt-1"></div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {!notification.isRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="h-6 px-2 text-xs text-gray-400 hover:text-white hover:bg-gray-600"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark as Read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  className="h-6 px-2 text-xs text-gray-400 hover:text-red-400 hover:bg-gray-600"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
        <div className="p-3">
          <Link href="/notifications">
            <Button
              variant="ghost"
              className="w-full justify-center text-[#15941f] hover:bg-gray-700"
            >
              View all notifications
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
