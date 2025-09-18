'use client';
import { TabsContent } from '@radix-ui/react-tabs';
import { useUsers, ActiveUser } from '@/hooks/useUsers';
import {
  Calendar,
  Mail,
  Eye,
  User,
  UserMinus,
  MoreHorizontal,
  CheckCircle,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate, getRoleBadge, getStatusBadge } from '../../utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type InactiveUsersProps = ReturnType<typeof useUsers> & {
  handleViewDetails: (user: ActiveUser) => void;
  handleActivateUser: (user: ActiveUser) => void;
  isDetailsModalOpen: boolean;
  setIsDetailsModalOpen: (open: boolean) => void;
  selectedUser: ActiveUser | null;
  activeTab: string;
  paginatedInactiveUsers: ActiveUser[];
};

export function InactiveUsersTab({
  filteredInactiveUsers,
  paginatedInactiveUsers, // 👈 for pagination (preferred)
  searchTerm,
  roleFilter,
  statusFilter,
  handleViewDetails,
  handleActivateUser,
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedUser,
  activeTab,
}: InactiveUsersProps) {
  const usersToDisplay = paginatedInactiveUsers ?? filteredInactiveUsers;

  return (
    <>
      <TabsContent value="inactive" className="p-0">
        {usersToDisplay.length === 0 ? (
          <div className="text-center py-12">
            <UserMinus className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No inactive users found
            </h3>
            <p className="text-gray-400">
              {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                ? 'No users match your current search and filter criteria.'
                : 'No inactive users. Accounts appear here if they are temporarily disabled or deactivated.'}
            </p>
          </div>
        ) : (
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
                {usersToDisplay.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell className="font-medium text-white">
                      {user.id}
                    </TableCell>
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
                          className="bg-gray-800 border border-gray-700 text-white"
                        >
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(user)}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-700"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleActivateUser(user)}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-700"
                          >
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            Activate User
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

      {/* User Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Details - {selectedUser?.id}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {activeTab === 'inactive'
                ? 'Inactive user information'
                : 'User information'}
            </DialogDescription>
          </DialogHeader>
          {/* Add detail fields here */}
        </DialogContent>
      </Dialog>
    </>
  );
}
