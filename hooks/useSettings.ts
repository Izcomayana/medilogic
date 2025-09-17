'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';
import { useAuth } from '@/components/auth';

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

export function useSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { logout } = useAuth();

  const authorizedRequest = useAuthorizedRequest();

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

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await authorizedRequest(async (validToken) => {
        const res = await axios.delete(
          'https://medilogic-backend.onrender.com/users/users/users/me',
          {
            headers: { Authorization: `Bearer ${validToken}` },
            data: {
              reason: deleteReason,
              password: deletePassword,
            },
          }
        );

        console.log('Account deleted successfully');
        toast.success(
          'Account deletion request submitted. You will be logged out shortly.'
        );
        setIsDeleteModalOpen(false);
        logout();
      }, 'Failed to delete account');
    } catch (error: unknown) {
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTerminateSession = (sessionId: string) => {
    toast.success(`Session terminated successfully: ${sessionId}`);
  };

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(is2FAEnabled ? '2FA disabled' : '2FA enabled');
  };

  return {
    loginSessions,
    activeTab,
    setActiveTab,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isChangePasswordModalOpen,
    setIsChangePasswordModalOpen,
    showCurrentPassword,
    setShowCurrentPassword,
    is2FAEnabled,
    deleteReason,
    setDeleteReason,
    deletePassword,
    setDeletePassword,
    isDeleting,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    profileData,
    setProfileData,
    passwordData,
    setPasswordData,
    notificationSettings,
    setNotificationSettings,
    handleUpdateProfile,
    handleChangePassword,
    handleDeleteAccount,
    handleTerminateSession,
    handleToggle2FA,
  };
}
