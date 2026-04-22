'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function BillingModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>

        <BillingContent isOpen={open} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}

function BillingContent({
  onSuccess,
  isOpen,
}: {
  onSuccess: () => void;
  isOpen: boolean;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authorizedRequest = useAuthorizedRequest();

  const init = async () => {
    setLoading(true);
    setError(null);

    const res = await authorizedRequest(async (token) => {
      return await api.post(
        '/billing/setup-intent',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }, 'Failed to load payment form');

    if (!res) {
      setError('Failed to load payment form');
      setLoading(false);
      return;
    }

    setClientSecret(res.data.client_secret);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) init();
  }, [isOpen]);

  if (loading) {
    return (
      <div className="h-24 flex items-center justify-center text-gray-400">
        Preparing payment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-red-400">{error}</p>

        <Button
          onClick={init}
          className="w-full bg-yellow-600 hover:bg-yellow-500"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!clientSecret) {
    return <div className="text-red-400">No client secret</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm clientSecret={clientSecret} onSuccess={onSuccess} />
    </Elements>
  );
}

function PaymentForm({
  clientSecret,
  onSuccess,
}: {
  clientSecret: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const authorizedRequest = useAuthorizedRequest();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      toast.error('Payment system not ready');
      return;
    }

    setLoading(true);

    try {
      // ✅ STEP 1: validate + confirm
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(submitError.message);
        return;
      }

      const { error } = await stripe.confirmSetup({
        elements,
        clientSecret,
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // 🔥 STEP 2: CHECK BILL FIRST
      const billing = await authorizedRequest(async (token) => {
        return await api.get('/billing/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });
      }, 'Failed to fetch billing');

      const total = billing?.data?.monthly_total || 0;

      if (total > 0) {
        // ✅ ONLY subscribe if billable
        await authorizedRequest(async (token) => {
          return await api.post(
            '/subscribe',
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }, 'Subscription failed');

        toast.success('Subscription activated');
      } else {
        toast.info(
          'Card saved. Subscription will start once you add drivers or clients.'
        );
      }

      // toast.success('Card added successfully');
      onSuccess();
    } catch (err: any) {
      console.error('🔥 FULL ERROR:', err);
      toast.error(
        err?.response?.data?.detail || err?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading || !stripe || !elements}
        className="w-full bg-blue-600 hover:bg-blue-500"
      >
        {loading ? 'Processing...' : 'Save & Subscribe'}
      </Button>
    </div>
  );
}
