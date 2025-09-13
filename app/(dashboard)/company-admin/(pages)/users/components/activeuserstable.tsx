'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, Calendar, Eye, MoreVertical } from 'lucide-react';
import { ActiveUser } from '../page';
import { getRoleBadge, getStatusBadge, formatDate } from './helpers/userUtil';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ConfirmActionModal from './ConfirmActionModal';

type UserStatus = 'active' | 'suspended';

type ActiveUsersTableProps = {
  users: ActiveUser[];
  onViewDetails: (user: ActiveUser) => void;
};

export default function ActiveUsersTable({
  users,
  onViewDetails,
}: ActiveUsersTableProps) {
  const [userList, setUserList] = useState<ActiveUser[]>(users);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    id: string | number;
    status: UserStatus;
    name: string;
  } | null>(null);

  const updateUserStatus = (id: string | number, newStatus: UserStatus) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
    setConfirmOpen(false);
    setPendingAction(null);
  };

  return (
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
            {userList.map((user) => (
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
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-gray-800 text-gray-200 border border-gray-700"
                    >
                      <DropdownMenuItem onClick={() => onViewDetails(user)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setPendingAction({
                            id: user.id,
                            status: 'active',
                            name: user.name,
                          });
                          setConfirmOpen(true);
                        }}
                      >
                        Activate User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setPendingAction({
                            id: user.id,
                            status: 'suspended',
                            name: user.name,
                          });
                          setConfirmOpen(true);
                        }}
                      >
                        Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Reusable Modal */}
      <ConfirmActionModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        pendingAction={pendingAction}
        onConfirm={() => {
          if (pendingAction) {
            updateUserStatus(pendingAction.id, pendingAction.status);
          }
        }}
      />
    </>
  );
}
