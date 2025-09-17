'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import {
  Settings,
  User,
  Shield,
  Bell,
  Trash2,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  AlertTriangle,
  Mail,
  Phone,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';

// Mock data for login sessions
const loginSessions = [
  {
    id: 'SES001',
    device: 'Chrome on Windows',
    location: 'Lagos, Nigeria',
    ipAddress: '192.168.1.100',
    lastActive: '2025-08-23 14:30',
    current: true,
  },
  {
    id: 'SES002',
    device: 'Safari on iPhone',
    location: 'Abuja, Nigeria',
    ipAddress: '192.168.1.101',
    lastActive: '2025-08-22 09:15',
    current: false,
  },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@logistics.com',
    phone: '+234 123 456 7890',
    bio: 'Logistics administrator managing waste collection operations.',
    organization: 'Logistics Admin',
    role: 'Admin',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
    systemUpdates: false,
  });

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    toast.success('Password changed successfully');
    setIsChangePasswordModalOpen(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleDeleteAccount = () => {
    toast.success(
      'Account deletion request submitted. You will be logged out shortly.'
    );
    setIsDeleteModalOpen(false);
  };

  const handleTerminateSession = (sessionId: string) => {
    toast.success(`Session terminated successfully: ${sessionId}`);
  };

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(is2FAEnabled ? '2FA disabled' : '2FA enabled');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return (
          <Badge variant="secondary" className="bg-blue-600 text-white">
            Admin
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Settings"
        subtitle="Manage your account, security, and preferences"
      />

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b border-gray-700">
                <TabsList className="grid w-full grid-cols-4 bg-transparent h-auto p-0">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden md:block">Profile</span>
                    {/* Profile */}
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:block">Account</span>
                    {/* Account */}
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <Shield className="h-4 w-4" />
                    <span className="hidden md:block">Security</span>
                    {/* Security */}
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="hidden md:block">Notifications</span>
                    {/* Notifications */}
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Profile Tab */}
              <TabsContent value="profile" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Profile Information
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-300">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            })
                          }
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-300">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              lastName: e.target.value,
                            })
                          }
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-300">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="organization" className="text-gray-300">
                          Organization
                        </Label>
                        <Input
                          id="organization"
                          value={profileData.organization}
                          disabled
                          className="bg-gray-700 border-gray-600 text-gray-400 mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role" className="text-gray-300">
                          Role
                        </Label>
                        <div className="mt-2">
                          {getRoleBadge(profileData.role)}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio" className="text-gray-300 mt-2">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              bio: e.target.value,
                            })
                          }
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleUpdateProfile}
                      className="primary-button"
                    >
                      Update Profile
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Account Tab */}
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
                            Permanently delete your account and all associated
                            data
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

              {/* Security Tab */}
              <TabsContent value="security" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Security Settings
                  </h3>
                  <div className="space-y-6">
                    {/* Two-Factor Authentication */}
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Two-Factor Authentication
                          </h4>
                          <p className="text-sm text-gray-400">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                          <Badge
                            className={
                              is2FAEnabled
                                ? 'bg-[#15941f] text-white'
                                : 'bg-gray-600 text-gray-300'
                            }
                          >
                            {is2FAEnabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                          <Switch
                            checked={is2FAEnabled}
                            onCheckedChange={handleToggle2FA}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Login Sessions */}
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">
                        Active Login Sessions
                      </h4>
                      <div className="space-y-3">
                        {loginSessions.map((session) => (
                          <div
                            key={session.id}
                            className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <Monitor className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-medium">
                                    {session.device}
                                  </span>
                                  {session.current && (
                                    <Badge className="bg-[#15941f] text-white text-xs">
                                      Current
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-400">
                                  {session.location} • {session.ipAddress}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Last active: {session.lastActive}
                                </p>
                              </div>
                            </div>
                            {!session.current && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleTerminateSession(session.id)
                                }
                                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                              >
                                Terminate
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">
                        Communication Preferences
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                              <span className="text-white">
                                Email Notifications
                              </span>
                              <p className="text-sm text-gray-400">
                                Receive notifications via email
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                emailNotifications: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-gray-400" />
                            <div>
                              <span className="text-white">
                                Push Notifications
                              </span>
                              <p className="text-sm text-gray-400">
                                Receive browser push notifications
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                pushNotifications: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <div>
                              <span className="text-white">
                                SMS Notifications
                              </span>
                              <p className="text-sm text-gray-400">
                                Receive notifications via SMS
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.smsNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                smsNotifications: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-medium">
                        Content Preferences
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <span className="text-white">Weekly Reports</span>
                            <p className="text-sm text-gray-400">
                              Receive weekly activity summaries
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.weeklyReports}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                weeklyReports: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <span className="text-white">Security Alerts</span>
                            <p className="text-sm text-gray-400">
                              Important security notifications
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.securityAlerts}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                securityAlerts: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <span className="text-white">System Updates</span>
                            <p className="text-sm text-gray-400">
                              Notifications about system maintenance
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.systemUpdates}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                systemUpdates: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

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
              <div className="relative">
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
              <div className="relative">
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
              <br />
              <br />
              Are you absolutely sure you want to delete your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
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
    </div>
  );
}
