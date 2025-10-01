import { TabsContent } from '@radix-ui/react-tabs';
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
import { useUsers } from '@/hooks/useUsers';

type DeletedUserProps = ReturnType<typeof useUsers>;

export function DeletedUsersTab({
  loading,
  deletedUsers,
  handleViewDetails,
  userToRestore,
  setUserToRestore,
  isRestoreModalOpen,
  setIsRestoreModalOpen,
  handleRestoreUser,
}: DeletedUserProps) {
  return (
    <>
      <TabsContent value="deleted" className="p-0">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white my-10"></div>
          </div>
        ) : deletedUsers.length === 0 ? (
          <div className="text-center py-12">
            <UserX className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No deleted users
            </h3>
            <p className="text-gray-400">No deleted users at this time.</p>
          </div>
        ) : (
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Deleted At</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deletedUsers.map((user) => (
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
                    <TableCell className="text-gray-300 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDateTime(user.deleted_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(user)}
                          className="border-gray-600 text-gray-700 hover-text-gray-300 hover:bg-gray-700"
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
      </TabsContent>

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
            <AlertDialogCancel className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                userToRestore &&
                handleRestoreUser(
                  deletedUsers.find((u) => u.id === userToRestore)?.id || ''
                )
              }
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
