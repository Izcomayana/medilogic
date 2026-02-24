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

  subscription_plan: string;
  subscription_status: string;
  subscription_start?: string | null;
  subscription_end?: string | null;
};

type Subscription = {
  plan: string;
  status: 'active' | 'none' | 'cancelled';
  start: string | null;
  end: string | null;
};

type SubscribeResponse = {
  driver: DriverProfile;
  client_secret: string | null;
  payment_id: string | null;
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

      const payload = new URLSearchParams();
      payload.append('new_plan', plan);

      const result = await authorizedRequest<DriverProfile>(async (token) => {
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
      }, 'Subscription failed');

      if (!result) {
        throw new Error('Empty subscription response');
      }

      setProfile(result);
      setFormData(result);

      toast.success(`Subscription updated to ${plan}`);
    } catch (e) {
      toast.error('Unable to change subscription');
    } finally {
      setIsSaving(false);
    }
  };

  //   const subscribeToPlan = async (plan: string) => {
  //     try {
  //       setIsSaving(true);

  //       const payload = new FormData();
  //       payload.append('plan', plan);

  //       const result = await authorizedRequest<SubscribeResponse>(
  //         async (token) => {
  //           const res = await api.put<SubscribeResponse>(
  //             '/Medilogic_drivers/me',
  //             payload,
  //             {
  //               headers: { Authorization: `Bearer ${token}` },
  //             }
  //           );
  //           return res.data;
  //         },
  //         'Subscription failed'
  //       );

  //       if (!result) {
  //         throw new Error('Empty subscription response');
  //       }

  //       setProfile(result.driver);
  //       setFormData(result.driver);

  //       if (result.client_secret) {
  //   setPaymentClientSecret(result.client_secret);
  //   toast.info("Complete payment to activate subscription");
  //   return;
  // }

  // toast.success(`Subscribed to ${plan} plan`);

  // console.log("Requested plan:", plan);
  // console.log("Backend returned plan:", result.driver.subscription_plan);

  //       // if (result.client_secret) {
  //       //   setPaymentClientSecret(result.client_secret);
  //       //   return;
  //       // }

  //       toast.success(`Subscribed to ${plan} plan`);
  //     } catch (e) {
  //       toast.error('Unable to subscribe');
  //     } finally {
  //       setIsSaving(false);
  //     }
  //   };

  const handlePaymentSuccess = async () => {
    toast.success('Payment successful 🎉');
    await fetchProfile();
    setPaymentClientSecret(null);
  };

  const handleChangePlan = async (plan: string) => {
    const payload = new FormData();
    payload.append('plan', plan);

    try {
      await authorizedRequest(async (token) => {
        const res = await api.put('/Medilogic_drivers/me', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setProfile(res.data);
        setFormData(res.data);
        toast.success(`Subscription updated to ${plan}`);
      }, 'Plan update failed');
    } catch {
      toast.error('Unable to change subscription');
    }
  };

  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      // setSubscriptionData((prev) => ({ ...prev, status: "cancelled" }))
      toast.success('Subscription cancelled');
    }
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
    handleCancelSubscription,
    subscription,
    subscribeToPlan,
    handlePaymentSuccess,
    paymentClientSecret,
  };
}
