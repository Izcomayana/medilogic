'use client';

import { TabsContent } from '@radix-ui/react-tabs';
import { ActiveUser } from '@/hooks/useUsers';
import { Calendar, Mail, Eye, MoreHorizontal, Power } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate, getRoleBadge, getStatusBadge } from '../../utils';
import { UsersTableSkeleton } from './userSekeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

type ActiveUsersTabProps = {
  currentUsers: ActiveUser[];
  filteredActiveUsers: ActiveUser[];
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  handleViewDetails: (user: ActiveUser) => void;
  deactivateUser: (id: string) => void;
};

<<<<<<< HEAD:app/(dashboard)/company-admin/(pages)/users/components/ActiveUsers/index.tsx
export function ActiveUsersTab({
  currentUsers,
  filteredActiveUsers,
  searchTerm,
  roleFilter,
  statusFilter,
  handleViewDetails,
  deactivateUser,
}: ActiveUsersTabProps) {
  // Remove duplicates by id before rendering
  const uniqueUsers = Array.from(
    new Map(currentUsers.map((u) => [u.id, u])).values()
  );

  return (
    <TabsContent value="active" className="p-0">
      {filteredActiveUsers.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-400">
            {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
              ? 'No users match your current search and filter criteria.'
              : 'No users found. Invite or onboard clients and drivers.'}
          </p>
        </div>
      ) : (
        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                {/* Removed User ID */}
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Date Joined</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uniqueUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  {/* Removed User ID cell */}
                  <TableCell className="text-gray-300">{user.name}</TableCell>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-300 hover:bg-gray-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-800 border-gray-700 text-white"
                      >
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(user)}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-700"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deactivateUser(user.id)}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 text-red-400"
                        >
                          <Power className="h-4 w-4" />
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </TabsContent>
=======
export function UsersTab({
  loading,
  filteredUsers,
  searchTerm,
  roleFilter,
  statusFilter,
  paginatedUsers,
  handleViewDetails,
  handleDeactivateUser,
  handleActivateUser,
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedUser,
}: ActiveUsersProps) {
  return (
    <>
      <TabsContent value="users" className="p-0">
        {loading ? (
          <UsersTableSkeleton />
        ) : filteredUsers.length === 0 ? (
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
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Date Joined</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell className="text-gray-300">{user.name}</TableCell>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-300 hover:bg-gray-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="bg-gray-800 border-gray-700 text-white"
                          align="end"
                        >
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-700"
                            onClick={() => handleViewDetails(user)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          {user.status === 'active' ? (
                            <DropdownMenuItem
                              className="cursor-pointer text-red-400 hover:bg-gray-700"
                              onClick={() => handleDeactivateUser(user.id)}
                            >
                              <Power className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="cursor-pointer text-green-400 hover:bg-gray-700"
                              onClick={() => handleActivateUser(user.id)}
                            >
                              <Power className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </TabsContent>

      {/* User Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-gray-800 border border-gray-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Information about the selected user
            </DialogDescription>
          </DialogHeader>

          {selectedUser ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-base font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-base font-medium flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {selectedUser.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Role</p>
                {getRoleBadge(selectedUser.role)}
              </div>
              {selectedUser.status && (
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  {getStatusBadge(selectedUser.status)}
                </div>
              )}

              {selectedUser.dateJoined && (
                <div>
                  <p className="text-sm text-gray-400">Date Joined</p>
                  <p>{formatDate(selectedUser.dateJoined)}</p>
                </div>
              )}

              {selectedUser.deleted_at && (
                <div>
                  <p className="text-sm text-gray-400">Deleted Date</p>
                  <p>{formatDate(selectedUser.deleted_at)}</p>
                </div>
              )}

              {selectedUser.deletion_reason && (
                <div>
                  <p className="text-sm text-gray-400">Deletion Reason</p>
                  <p>{selectedUser.deletion_reason}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p>{selectedUser.location || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Active</p>
                <p>{selectedUser.lastActive || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Trips</p>
                <Badge>{selectedUser.totalTrips ?? 0}</Badge>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No user selected</p>
          )}

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDetailsModalOpen(false)}
              className="bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
>>>>>>> f20f29997bd514c9e0ca836336fd7ae4a86ebb43:app/(dashboard)/company-admin/(pages)/users/components/Users/index.tsx
  );
}
