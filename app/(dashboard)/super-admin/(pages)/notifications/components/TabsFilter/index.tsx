import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Bell, Search, Check, Trash2, Filter } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type NotificationProps = ReturnType<typeof useNotifications>;

export function TabsFilter({
  filteredNotifications,
  unreadCount,
  activeTab,
  notifications,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  selectedNotifications,
  bulkMarkAsRead,
  bulkDelete,
}: NotificationProps) {
  return (
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
  );
}
