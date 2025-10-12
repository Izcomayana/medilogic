/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button';
import { TabsContent } from '@radix-ui/react-tabs';
import { useSettings } from '@/hooks/useSettings';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { toast } from 'sonner';
import {
  AlertDialog,
  // AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useAuthorizedRequest } from '@/hooks/useRequest';

type AccountProps = ReturnType<typeof useSettings>;

export function AccountsTab({
  setIsChangePasswordModalOpen,
  setIsDeleteModalOpen,
  isChangePasswordModalOpen,
  showCurrentPassword,
  passwordData,
  setPasswordData,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  // handleChangePassword,
  isDeleteModalOpen,
  deleteReason,
  setDeleteReason,
  deletePassword,
  setDeletePassword,
  handleDeleteAccount,
  isDeleting,
}: AccountProps) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const authorizedRequest = useAuthorizedRequest();

  const handleChangePassword = async () => {
    // Client-side validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);

    try {
      // Use authorizedRequest to guarantee a valid token and automatic refresh
      await authorizedRequest(async (token) => {
        const res = await axios.post(
          'https://medilogic-backend.onrender.com/access/change-password',
          {
            current_password: passwordData.currentPassword,
            new_password: passwordData.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Use the response so the linter doesn't flag an unused var
        if (res.status === 200) {
          toast.success('Password changed successfully!');
          setIsChangePasswordModalOpen(false);
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        } else {
          // unexpected but handle gracefully
          toast.error('Failed to change password. Please try again.');
        }
      }, 'Failed to change password');
    } catch (err: unknown) {
      // More precise error handling
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const detail = err.response?.data?.detail ?? err.response?.data;

        // If the API returned an auth error message from token validation
        if (status === 401) {
          // backend sometimes returns: { "detail": "Could not validate credentials" }
          const detailStr =
            typeof detail === 'string'
              ? detail
              : Array.isArray(detail)
                ? detail.map((d: any) => d.msg).join(', ')
                : JSON.stringify(detail);

          if (
            typeof detailStr === 'string' &&
            detailStr.toLowerCase().includes('could not validate')
          ) {
            toast.error('Authentication failed — please log in again.');
            // optional: trigger logout / redirect here if you have that logic
          } else {
            // 401 could also mean wrong current password depending on backend behavior
            toast.error('Incorrect current password.');
          }
        } else if (status === 422) {
          // Validation errors (Pydantic style)
          if (Array.isArray(detail)) {
            const msgs = detail.map((d: any) => d.msg).join('; ');
            toast.error(msgs || 'Validation error changing password.');
          } else {
            toast.error(
              String(detail) || 'Validation error changing password.'
            );
          }
        } else {
          toast.error(err.message || 'Something went wrong. Please try again.');
        }
      } else if (err instanceof Error) {
        toast.error(err.message || 'Something went wrong. Please try again.');
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <>
      <TabsContent value="account" className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Account Management
          </h3>
          <div className="space-y-6">
            {/* Change Password */}
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Password</h4>
                  <p className="text-sm text-gray-400">
                    Change your account password
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsChangePasswordModalOpen(true)}
                  className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700 mt-4 md:mt-0"
                >
                  Change Password
                </Button>
              </div>
            </div>

            {/* Delete Account */}
            <div className="p-4 bg-gray-800 rounded-lg border border-red-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Delete Account
                  </h4>
                  <p className="text-sm text-gray-400">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 mt-4 md:mt-0"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Change Password Modal */}
      <AlertDialog
        open={isChangePasswordModalOpen}
        onOpenChange={setIsChangePasswordModalOpen}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Enter your current password and choose a new one.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="currentPassword" className="text-gray-300">
                Current Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-gray-300">
                New Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm New Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordModalOpen(false)}
              className="text-gray-700 hover:text-gray-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              className="primary-button"
            >
              {isChangingPassword ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-12"></span>
              ) : (
                'Change Password'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              <strong className="text-red-400">Warning:</strong> This action
              cannot be undone. This will permanently delete your account and
              remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Reason + Password fields */}
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="deleteReason" className="text-gray-300">
                Reason for deletion
              </Label>
              <Input
                id="deleteReason"
                type="text"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="Enter your reason"
              />
            </div>
            <div>
              <Label htmlFor="deletePassword" className="text-gray-300">
                Confirm Password
              </Label>
              <Input
                id="deletePassword"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Delete Account'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
