import { Button } from "@/components/ui/button";
import { TabsContent } from "@radix-ui/react-tabs";
import { useSettings } from "@/hooks/useSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuthorizedRequest } from "../../../../../../../hooks/useRequest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Trash2, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useState } from "react";

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
  handleChangePassword,
  isDeleteModalOpen,
}: AccountProps) {
  const authorizedRequest = useAuthorizedRequest();

  // Local state for delete confirmation inputs
  const [deleteReason, setDeleteReason] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  // 🔹 Delete account handler with API integration
  const handleDeleteAccount = async () => {
    try {
      await authorizedRequest(
        async (validToken) => {
          const res = await axios.delete(
            "https://medilogic-backend.onrender.com/users/users/users/me",
            {
              headers: { Authorization: `Bearer ${validToken}` },
              data: {
                reason: deleteReason,
                password: deletePassword,
              },
            }
          );

          if (res.status === 200) {
            console.log("Account deleted successfully");
            // 👉 redirect, clear auth, or show success toast here
          } else {
            console.error("Failed to delete account:", res.data);
          }
        },
        "Failed to delete account"
      );
    } catch (error: unknown) {
      console.error("Error deleting account:", error);
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
      <Dialog
        open={isChangePasswordModalOpen}
        onOpenChange={setIsChangePasswordModalOpen}
      >
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="currentPassword" className="text-gray-300">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
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
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
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
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
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
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleChangePassword} className="primary-button">
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                className="bg-gray-700 border-gray-600 text-white"
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
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
