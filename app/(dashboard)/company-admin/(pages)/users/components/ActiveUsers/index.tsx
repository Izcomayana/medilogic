import { TabsContent } from '@radix-ui/react-tabs';
import { useUsers } from '@/hooks/useUsers';
import {
  Calendar,
  Mail,
  Users,
  Eye,
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
import { formatDate, getRoleBadge, getStatusBadge } from '../../utils';

// ✅ define type properly
type User = ReturnType<typeof useUsers>['activeUsers'][number];

type ActiveUsersTabProps = {
  filteredActiveUsers: User[];
  currentUsers: User[];
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  handleViewDetails: (user: User) => void;
};

export function ActiveUsersTab({
  filteredActiveUsers,
  searchTerm,
  roleFilter,
  statusFilter,
  currentUsers,
  handleViewDetails,
}: ActiveUsersTabProps) {
  return (
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
              {currentUsers?.map((user) => (
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
                        <DropdownMenuItem
                          className="cursor-pointer text-red-400 hover:bg-gray-700"
                          onClick={() => console.log('Deactivate', user.id)}
                        >
                          <Power className="h-4 w-4 mr-2" />
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
  );
}
