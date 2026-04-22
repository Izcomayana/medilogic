'use client';

import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';

export default function PaymentForm({
  clientSecret,
  onSuccess,
}: {
  clientSecret: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const authorizedRequest = useAuthorizedRequest();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      toast.error(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      clientSecret,
      redirect: 'if_required',
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    await authorizedRequest(async (token) => {
      const statusRes = await api.get('/billing/status', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { has_subscription } = statusRes.data;

      if (!has_subscription) {
        await api.post(
          '/subscribe',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    }, 'Subscription failed');

    // 🔥 CRITICAL: CREATE SUBSCRIPTION
    await authorizedRequest(async (token) => {
      try {
        await api.post(
          '/subscribe',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err: any) {
        if (err.response?.data?.detail !== 'No billable users found') {
          throw err;
        }
      }
    }, 'Subscription failed');

    toast.success('Card added & subscription activated');

    setLoading(false);
    onSuccess();
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500"
      >
        {loading ? 'Processing...' : 'Save & Activate Subscription'}
      </Button>
    </div>
  );
}
