"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Types
type ProfileData = {
  name: string;
  email: string;
};

type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type LoginSession = {
  id: string;
  device: string;
  location: string;
  lastActive: string;
};

export default function AdminSettingsPage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "admin@example.com",
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loginSessions, setLoginSessions] = useState<LoginSession[]>([]);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ✅ Fetch login sessions from API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("/api/admin/sessions");
        if (!res.ok) throw new Error("Failed to load sessions");
        const data = await res.json();
        setLoginSessions(data);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    fetchSessions();
  }, []);

  // ✅ Update profile
  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // ✅ Change password
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      });

      if (!res.ok) throw new Error("Failed to change password");
      toast.success("Password changed successfully");
      setIsChangePasswordModalOpen(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // ✅ Delete account
  const handleDeleteAccount = async () => {
    try {
      const res = await fetch("/api/admin/account", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");
      toast.success("Account deletion request submitted. You will be logged out shortly.");
      setIsDeleteModalOpen(false);

      // redirect to login
      window.location.href = "/login";
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // ✅ Terminate a session
  const handleTerminateSession = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/admin/sessions/${sessionId}/terminate`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to terminate session");
      toast.success(`Session terminated: ${sessionId}`);
      // Optionally refresh sessions
      setLoginSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // ✅ Toggle 2FA
  const handleToggle2FA = async () => {
    try {
      const res = await fetch("/api/admin/2fa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !is2FAEnabled }),
      });

      if (!res.ok) throw new Error("Failed to update 2FA");
      setIs2FAEnabled(!is2FAEnabled);
      toast.success(!is2FAEnabled ? "2FA enabled" : "2FA disabled");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
          </div>
          <Button onClick={handleUpdateProfile}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Two-Factor Authentication (2FA)</span>
            <Switch checked={is2FAEnabled} onCheckedChange={handleToggle2FA} />
          </div>
          <Button variant="secondary" onClick={() => setIsChangePasswordModalOpen(true)}>
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Login Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Login Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {loginSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <p className="font-medium">{session.device}</p>
                <p className="text-sm text-gray-500">
                  {session.location} – Last active: {session.lastActive}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleTerminateSession(session.id)}
              >
                Terminate
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* Change Password Modal */}
      <Dialog open={isChangePasswordModalOpen} onOpenChange={setIsChangePasswordModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleChangePassword}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
