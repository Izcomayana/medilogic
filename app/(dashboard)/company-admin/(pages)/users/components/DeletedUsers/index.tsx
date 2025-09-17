import { TabsContent } from '@radix-ui/react-tabs';
import { useUsers } from '@/hooks/useUsers';
import { Mail, Eye, UserX, Clock, RotateCcw } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatDateTime, getRoleBadge } from '../../utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import axios from 'axios';
import { useAuthorizedRequest } from '../../../../../../../hooks/useRequest';
import { useState } from 'react';

type DeletedUsersProps = ReturnType<typeof useUsers>;

export function DeletedUsersTab({
  filteredDeletedUsers,
  searchTerm,
  roleFilter,
  paginatedDeletedUsers,
  handleViewDetails,
  setUserToRestore,
  setIsRestoreModalOpen,
  isRestoreModalOpen,
  userToRestore,
}: DeletedUsersProps) {
  // Error state for restore action
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const authorizedRequest = useAuthorizedRequest();

  const handleRestoreUser = async (user_id: string) => {
    try {
      await authorizedRequest(async (validToken) => {
        const res = await axios.patch(
          `https://medilogic-backend.onrender.com/users/users/users/${user_id}/restore`,
          {},
          { headers: { Authorization: `Bearer ${validToken}` } }
        );

        if (res.status === 200) {
          console.log('User restored successfully');
          setErrorMsg(null);
          // refreshUsers?.(); // uncomment when hook exposes refresh
        }
      }, 'Failed to restore user');
    } catch (err: unknown) {
      let message = 'Failed to restore user';

      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data as { msg?: string; detail?: string })?.msg ||
          (err.response?.data as { msg?: string; detail?: string })?.detail ||
          err.message ||
          message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setErrorMsg(message);
      console.error('Error restoring user:', message);
    } finally {
      setIsRestoreModalOpen(false);
    }
  };

  return (
    <>
      <TabsContent value="deleted" className="p-0">
        {filteredDeletedUsers.length === 0 ? (
          <div className="text-center py-12">
            <UserX className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No deleted users
            </h3>
            <p className="text-gray-400">
              {searchTerm || roleFilter !== 'all'
                ? 'No deleted users match your current search criteria.'
                : 'No deleted users at this time.'}
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
                  <TableHead className="text-gray-300">Deleted At</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDeletedUsers.map((user) => (
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
                    <TableCell className="text-gray-300 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDateTime(user.deletedAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(user)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setUserToRestore(user.id);
                            setIsRestoreModalOpen(true);
                          }}
                          className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Restore
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Error message UI */}
        {errorMsg && (
          <div className="mt-4 text-red-400 text-sm">{errorMsg}</div>
        )}
      </TabsContent>

      {/* Restore User Confirmation */}
      <AlertDialog
        open={isRestoreModalOpen}
        onOpenChange={setIsRestoreModalOpen}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-green-400">
              <RotateCcw className="h-5 w-5" />
              Restore User
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to restore this user? They will regain
              access to their account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToRestore && handleRestoreUser(userToRestore)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restore User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
