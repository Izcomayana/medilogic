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
  MoreHorizontal,
  Power,
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
                              onClick={() => console.log('Deactivate', user.id)}
                            >
                              <Power className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="cursor-pointer text-green-400 hover:bg-gray-700"
                              onClick={() => console.log('Activate', user.id)}
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

      {/* Details Modal */}
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

          {/* (rest of your modal stays the same) */}
        </DialogContent>
      </Dialog>
    </>
  );
}
