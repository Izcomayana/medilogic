import { TabsContent } from '@radix-ui/react-tabs';
import { useUsers } from '@/hooks/useUsers';
import {
  Calendar,
  Mail,
  Users,
  Eye,
  MoreHorizontal,
  Power,
  Clock3,
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
import { UsersTableSkeleton } from './userSekeleton';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { formatTime } from '@/utils/datetime';

type ActiveUsersProps = ReturnType<typeof useUsers>;

interface DriverAvailability {
  driver_id: string;
  driver_name: string;
  availability: AvailabilitySlot[];
}

interface AvailabilitySlot {
  day_of_week: string;
  start_time: string;
  end_time: string;
}

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
  const [driverAvailability, setDriverAvailability] = useState<
    DriverAvailability[]
  >([]);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [selectedDriverAvailability, setSelectedDriverAvailability] = useState<
    AvailabilitySlot[]
  >([]);

  const authorizedRequest = useAuthorizedRequest();

  useEffect(() => {
    const fetchAvailability = async () => {
      await authorizedRequest(async (token) => {
        const res = await api.get('/availability/all/grouped', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDriverAvailability(res.data);
      }, 'Failed to fetch availability');
    };

    fetchAvailability();
  }, []);

  const handleViewAvailability = (user: any) => {
    const driver = driverAvailability.find((d) => d.driver_id === user.id);

    if (!driver) {
      toast.error('No availability set for this driver');
      return;
    }

    setSelectedDriverAvailability(driver.availability);
    setIsAvailabilityModalOpen(true);
  };

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
                          {user.role === 'driver' && (
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-gray-700"
                              onClick={() => handleViewAvailability(user)}
                            >
                              <Clock3 className="h-4 w-4 mr-2" />
                              Availability
                            </DropdownMenuItem>
                          )}
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
      <AlertDialog
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      >
        <AlertDialogContent className="bg-gray-800 border border-gray-700 text-white max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>User Details</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Information about the selected user
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedUser ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">ID:</p>
                <p className="text-base font-medium">{selectedUser.short_id}</p>
              </div>
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

          <AlertDialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDetailsModalOpen(false)}
              className="bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Availability modal */}
      <AlertDialog
        open={isAvailabilityModalOpen}
        onOpenChange={setIsAvailabilityModalOpen}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Driver Availability</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-3">
            {selectedDriverAvailability.length === 0 ? (
              <p className="text-gray-400">No availability set.</p>
            ) : (
              selectedDriverAvailability.map((slot) => (
                <div
                  key={slot.day_of_week}
                  className="flex justify-between bg-gray-700 p-2 rounded"
                >
                  <span className="capitalize">{slot.day_of_week}</span>
                  <span>
                    {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                  </span>
                </div>
              ))
            )}
          </div>
          <AlertDialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsAvailabilityModalOpen(false)}
              className="bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
