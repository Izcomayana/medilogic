'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';
import { useAuth } from '@/components/auth';
import { useProfile } from '../useProfile';

const API_BASE_URL = 'https://medilogic-backend.onrender.com';

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
  const [isLoading, setIsLoading] = useState(false);

  const { user, loading: userLoading } = useProfile();
  const { logout } = useAuth();
  const authorizedRequest = useAuthorizedRequest();

  const [userProfileData, setUserProfileData] = useState({
    name: '',
    email: '',
  });

  const [orgProfileData, setOrgProfileData] = useState({
    id: '',
    name: '',
    is_active: true,
    invite_code: '',
    ico_registered: true,
    email: '',
    phone_number: '',
    address_line: '',
    country: '',
    region: '',
    state: '',
    postal_code: '',
    license_number: '',
    data_retention_years: '',
    ico_registration_number: '',
    license_expiry: '',
    supported_waste_types: [] as string[],
    user_count: '',
    trip_count: '',
    waste_processing_capability: '',
    delivery_capacity: 0,
    contact_person_name: '',
    contact_person_role: '',
    latitude: 0,
    longitude: 0,
  });

  const [initialUserProfile, setInitialUserProfile] = useState(userProfileData);
  const [initialOrgProfile, setInitialOrgProfile] = useState(orgProfileData);

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
    systemUpdates: false,
  });

  useEffect(() => {
    setIsLoading(true);
    if (user && !userLoading) {
      const profile = { name: user.name || '', email: user.email || '' };
      setUserProfileData(profile);
      setInitialUserProfile(profile);
    }
    setIsLoading(false);
  }, [user, userLoading]);

  useEffect(() => {
    // Only run once when we have a valid org ID and not already loaded
    if (userLoading || !user?.organization?.id) return;

    let isFetched = false;

    const fetchOrganizationDetails = async () => {
      if (isFetched) return;
      isFetched = true;

      toast('Loading organization info.');
      setIsLoading(true);
      try {
        await authorizedRequest(async (token) => {
          const res = await axios.get(
            `${API_BASE_URL}/super/${user.organization.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const org = res.data.organization;
          const orgData = {
            id: org.id || '',
            name: org.name || '',
            invite_code: org.invite_code || '',
            is_active: org.is_active ?? true,
            email: org.email || '',
            phone_number: org.phone_number || '',
            address_line: org.address_line || '',
            country: org.country || '',
            region: org.region || '',
            state: org.state || '',
            postal_code: org.postal_code || '',
            license_number: org.license_number || '',
            ico_registered: org.ico_registered ?? false,
            data_retention_years: org.data_retention_years?.toString() || '',
            license_expiry: org.license_expiry || '',
            supported_waste_types: org.supported_waste_types || [],
            ico_registration_number: org.ico_registration_number || '',
            user_count: res.data.user_count?.toString() || '',
            trip_count: res.data.trip_count?.toString() || '',
            waste_processing_capability:
              res.data.waste_processing_capability || '',
            delivery_capacity: res.data.delivery_capacity || 0,
            contact_person_name: res.data.contact_person_name || '',
            contact_person_role: res.data.contact_person_role || '',
            latitude: res.data.latitude || 0,
            longitude: res.data.longitude || 0,
          };

          setOrgProfileData(orgData);
          console.log('data:', orgProfileData);
          setInitialOrgProfile(orgData);
        }, 'Failed to fetch organization details');
      } catch (err) {
        console.error('Failed to fetch organization details:', err);
        toast.error('Unable to load organization info.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizationDetails();

    // ✅ Cleanup function ensures no re-runs
    return () => {
      isFetched = true;
    };
  }, [user?.organization?.id]); // only depend on org ID

  const isUserProfileChanged =
    JSON.stringify(userProfileData) !== JSON.stringify(initialUserProfile);
  const isOrgProfileChanged =
    JSON.stringify(orgProfileData) !== JSON.stringify(initialOrgProfile);

  const handleUpdateUserProfile = async () => {
    setIsLoading(true);
    try {
      await authorizedRequest(async (token) => {
        const payload = {
          email: userProfileData.email,
          name: userProfileData.name,
        };

        await axios.put(`${API_BASE_URL}/users/users/update`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        toast.success('Personal account updated successfully');
      }, 'Failed to update user profile');
    } catch (error: any) {
      console.error('Error updating user profile:', error);
      if (error.response?.data?.detail) {
        toast.error(
          `Update failed: ${JSON.stringify(error.response.data.detail)}`
        );
      } else {
        toast.error('Failed to update account.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrgProfile = async () => {
    if (!user?.organization?.id) {
      toast.error('Organization ID not found.');
      return;
    }

    setIsLoading(true);
    try {
      await authorizedRequest(async (token) => {
        await axios.patch(
          `${API_BASE_URL}/super/${user.organization.id}`,
          orgProfileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Organization profile updated successfully');
      }, 'Failed to update organization profile');
    } catch (error) {
      console.error('Error updating organization profile:', error);
      toast.error('Failed to update organization profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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
        await axios.delete(`${API_BASE_URL}/users/users/users/me`, {
          headers: { Authorization: `Bearer ${validToken}` },
          data: { reason: deleteReason, password: deletePassword },
        });
        toast.success('Account deletion request submitted.');
        setIsDeleteModalOpen(false);
        logout();
      }, 'Failed to delete account');
    } catch (error) {
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
    passwordData,
    setPasswordData,
    handleChangePassword,
    handleDeleteAccount,
    handleTerminateSession,
    handleToggle2FA,
    notificationSettings,
    setNotificationSettings,

    // Profiles
    userProfileData,
    setUserProfileData,
    orgProfileData,
    setOrgProfileData,
    isUserProfileChanged,
    isOrgProfileChanged,

    // Update handlers
    handleUpdateUserProfile,
    handleUpdateOrgProfile,

    isLoading,
  };
}
