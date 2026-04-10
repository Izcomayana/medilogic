'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { toast } from 'sonner';

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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentClientSecret, setPaymentClientSecret] = useState<string | null>(
    null
  );
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [formData, setFormData] = useState<Partial<DriverProfile>>({});
  const [isSaving, setIsSaving] = useState(false);

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

  return {
    selectedPlan,
    loading,
    paymentClientSecret,
    formData,
    isSaving,
    subscribeToPlan,
    handlePaymentSuccess,
    handleChangePlan,
    cancelSubscription,
    resumeSubscription,
  };
}
