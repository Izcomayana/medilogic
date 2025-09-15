import { TabsContent } from '@radix-ui/react-tabs';
import { useUsers } from '@/hooks/useUsers';
import {
  Calendar,
  Mail,
  Users,
  Eye,
  User,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  formatDate,
  formatDateTime,
  getRoleBadge,
  getStatusBadge,
} from '../../utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type ActiveUsersProps = ReturnType<typeof useUsers>;

export function ActiveUsersTab({
  filteredActiveUsers,
  searchTerm,
  roleFilter,
  statusFilter,
  paginatedActiveUsers,
  handleViewDetails,
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedUser,
  activeTab,
}: ActiveUsersProps) {
  return (
    <>
      <TabsContent value="active" className="p-0">
        {filteredActiveUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-400">
              {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                ? 'No users match your current search and filter criteria.'
                : 'No users found. Invite or onboard clients and drivers through Trips or Assignments.'}
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">User ID</TableHead>
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Role</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Date Joined</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedActiveUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="font-medium text-white">
                        {user.id}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-gray-300 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-gray-300 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(user.dateJoined)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(user)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </TabsContent>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Details - {selectedUser?.id}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {activeTab === 'active'
                ? 'Active user information'
                : 'Deleted user information'}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 py-4 max-h-96 overflow-y-auto">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400 text-sm">User ID</Label>
                      <p className="text-white font-medium">
                        {selectedUser.id}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">Full Name</Label>
                      <p className="text-white">{selectedUser.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Email Address
                      </Label>
                      <p className="text-white flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {selectedUser.email}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Phone Number
                      </Label>
                      <p className="text-white flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {selectedUser.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Account Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400 text-sm">Role</Label>
                      <div className="mt-1">
                        {getRoleBadge(selectedUser.role)}
                      </div>
                    </div>
                    {activeTab === 'active' && (
                      <div>
                        <Label className="text-gray-400 text-sm">Status</Label>
                        <div className="mt-1">
                          {getStatusBadge(selectedUser.status)}
                        </div>
                      </div>
                    )}
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Organization
                      </Label>
                      <p className="text-white">{selectedUser.organization}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">Location</Label>
                      <p className="text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {selectedUser.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Activity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <Label className="text-gray-400 text-sm">Date Joined</Label>
                    <p className="text-white mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(selectedUser.dateJoined)}
                    </p>
                  </div>
                  {activeTab === 'active' && (
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                      <Label className="text-gray-400 text-sm">
                        Last Active
                      </Label>
                      <p className="text-white mt-1 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatDateTime(selectedUser.lastActive)}
                      </p>
                    </div>
                  )}
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <Label className="text-gray-400 text-sm">Total Trips</Label>
                    <p className="text-white mt-1 text-2xl font-bold">
                      {selectedUser.totalTrips}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deletion Information (for deleted users) */}
              {activeTab === 'deleted' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Deletion Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Deleted At
                      </Label>
                      <p className="text-white flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatDateTime(selectedUser.deletedAt)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Deleted By
                      </Label>
                      <p className="text-white">{selectedUser.deletedBy}</p>
                    </div>
                    {selectedUser.reason && (
                      <div>
                        <Label className="text-gray-400 text-sm">Reason</Label>
                        <div className="bg-gray-700 rounded-lg p-3 border border-gray-600 mt-1">
                          <p className="text-gray-300 text-sm">
                            {selectedUser.reason}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
