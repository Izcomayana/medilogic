'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { toast } from 'sonner';

type UpdateDriverResponse = {
  driver: DriverProfile;
  analytics: any | null;
  client_secret: string | null;
  payment_id: string | null;
};

type DriverProfile = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  address: string;
  zip_code: string;
  date_of_birth?: string;
  license_number?: string;
  license_expiry?: string;
  vehicle_type?: string;
  preferred_role?: string;
  experience_years?: number;
  dvla_check_code?: string | null;

  subscription_plan: string;
  subscription_status: string;
  subscription_start?: string | null;
  subscription_end?: string | null;
  cancel_at_period_end?: boolean;

  badge_type: 'none' | 'green' | 'blue';

  can_upload_docs: boolean;
  can_view_analytics: boolean;
  can_see_org_names: boolean;
};

type Subscription = {
  plan: string;
  status: 'active' | 'none' | 'cancelled';
  start: string | null;
  end: string | null;
  cancel_at_period_end: boolean;
};

export default function useMedilogicDriver() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [formData, setFormData] = useState<Partial<DriverProfile>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentClientSecret, setPaymentClientSecret] = useState<string | null>(
    null
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'profile' | 'subscription'>(
    'profile'
  );

  const authorizedRequest = useAuthorizedRequest();

  const normalizeDriver = (data: any): DriverProfile => {
    return 'driver' in data ? data.driver : data;
  };

  const fetchProfile = async () => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.get<DriverProfile>('/Medilogic_drivers/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const driver = normalizeDriver(res.data);
        setProfile(driver);
        setFormData(driver);
      }, 'Failed to load profile');
    } catch {
      toast.error('Unable to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const subscription = profile
    ? {
        plan: profile.subscription_plan,
        status: profile.subscription_status as Subscription['status'],
        start: profile.subscription_start ?? null,
        end: profile.subscription_end ?? null,
        cancel_at_period_end: profile.cancel_at_period_end ?? false,
      }
    : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    try {
      setIsSaving(true);

      const payload: DriverProfile = {
        ...profile,
        ...formData,
        address: formData.address ?? profile.address ?? '',
        state: formData.state ?? profile.state ?? '',
        zip_code: formData.zip_code ?? profile.zip_code ?? '',
        phone_number: formData.phone_number ?? profile.phone_number ?? '',
        country: formData.country ?? profile.country ?? '',
        name: formData.name ?? profile.name ?? '',
      };

      await authorizedRequest(async (token) => {
        const res = await api.put<UpdateDriverResponse>(
          '/Medilogic_drivers/profile/json',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const driver = 'driver' in res.data ? res.data.driver : res.data;
        setProfile(driver);
        setFormData(driver);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      }, 'Profile update failed');
    } finally {
      setIsSaving(false);
    }
  };

  const subscribeToPlan = async (plan: string) => {
    try {
      setIsSaving(true);

      const setupRes = await authorizedRequest(async (token) => {
        const res = await api.post(
          '/Medilogic_drivers/driver/setup-intent',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
      }, 'Failed to initialize payment');

      setSelectedPlan(plan);
      setPaymentClientSecret(setupRes.client_secret);
    } catch {
      toast.error('Unable to start subscription');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePaymentSuccess = async () => {
    toast.success('Payment successful 🎉');
    await fetchProfile();
    setPaymentClientSecret(null);
  };

  const handleChangePlan = async (plan: string) => {
    try {
      setIsSaving(true);

      const payload = new URLSearchParams();
      payload.append('new_plan', plan);
      payload.append('payment_method_id', 'existing'); // temporary fix

      const result = await authorizedRequest(async (token) => {
        const res = await api.put(
          '/Medilogic_drivers/driver/subscription',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        return res.data;
      }, 'Plan update failed');

      setProfile(result.driver);
      setFormData(result.driver);

      await fetchProfile();

      toast.success(`Subscription updated to ${plan}`);
    } catch {
      toast.error('Unable to change subscription');
    } finally {
      setIsSaving(false);
    }
  };

  const cancelSubscription = async (atPeriodEnd: boolean = true) => {
    try {
      setIsSaving(true);

      const result = await authorizedRequest(async (token) => {
        const res = await api.delete(`/Medilogic_drivers/driver/subscription`, {
          params: { at_period_end: atPeriodEnd },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.data;
      }, 'Cancellation failed');

      setProfile(result);
      setFormData(result);

      await fetchProfile();

      toast.success(
        atPeriodEnd
          ? 'Subscription will cancel at period end.'
          : 'Subscription cancelled immediately.'
      );
    } catch {
      toast.error('Unable to cancel subscription');
    } finally {
      setIsSaving(false);
    }
  };

  const resumeSubscription = async () => {
    if (!subscription) {
      toast.error('No subscription found');
      return;
    }

    try {
      setIsSaving(true);

      const payload = new URLSearchParams();
      payload.append('new_plan', subscription.plan);

      const result = await authorizedRequest(async (token) => {
        const res = await api.put(
          '/Medilogic_drivers/driver/subscription',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        return res.data;
      }, 'Resume failed');

      setProfile(result.driver);
      setFormData(result.driver);

      toast.success('Subscription resumed successfully');

      await fetchProfile();
    } catch {
      toast.error('Unable to resume subscription');
    } finally {
      setIsSaving(false);
    }
  };

  const uploadDocuments = async (files: File[]) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    await authorizedRequest(async (token) => {
      await api.put('/Medilogic_drivers/me', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    }, 'Upload failed');

    await fetchProfile();

    toast.success('Documents uploaded successfully');
  };

  return {
    isEditing,
    setIsEditing,
    profile,
    setProfile,
    formData,
    setFormData,
    isSaving,
    setIsSaving,
    loading,
    setLoading,
    activeTab,
    setActiveTab,
    handleInputChange,
    handleSaveProfile,
    handleChangePlan,
    cancelSubscription,
    resumeSubscription,
    subscription,
    subscribeToPlan,
    handlePaymentSuccess,
    paymentClientSecret,
    selectedPlan,
    fetchProfile,
    uploadDocuments,
  };
}
