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

type ActiveUsersTabProps = {
  currentUsers: ActiveUser[];
  filteredActiveUsers: ActiveUser[];
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  handleViewDetails: (user: ActiveUser) => void;
  deactivateUser: (id: string) => void;
};

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
  );
}
