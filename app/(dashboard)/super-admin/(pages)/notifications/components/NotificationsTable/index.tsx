import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';

type NotificationTableProps = ReturnType<typeof useNotifications>;

export function NotificationsTable({
  selectAllVisible,
  startIndex,
  notificationsPerPage,
  filteredNotifications,
  paginatedNotifications,
  selectedNotifications,
  setSelectedNotifications,
  toggleSelectNotification,
  markAsRead,
  deleteNotification,
  totalPages,
  currentPage,
  setCurrentPage,
}: NotificationTableProps) {
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
              Youre all caught up!
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
                    <TableHead className="text-gray-300">Timestamp</TableHead>
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
                      <TableCell>{getTypeBadge(notification.type)}</TableCell>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{notification.icon}</span>
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
                            onClick={() => deleteNotification(notification.id)}
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
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
  );
}
