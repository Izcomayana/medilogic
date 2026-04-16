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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const authorizedRequest = useAuthorizedRequest();

  useEffect(() => {
    if (!open) return;

    const init = async () => {
      await authorizedRequest(async (token) => {
        const res = await api.post(
          '/billing/setup-intent',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setClientSecret(res.data.client_secret);
      }, 'Failed to initialize payment');
    };

    init();

    console.log('clientSecret:', clientSecret);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md w-full max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>

        {!clientSecret ? (
          <div className="h-24 flex items-center justify-center text-gray-400">
            Preparing payment...
          </div>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm onSuccess={onSuccess} />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    // Required for PaymentElement
    const { error: submitError } = await elements.submit();

    if (submitError) {
      toast.error(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // ✅ SUCCESS
    toast.success('Card added successfully');

    onSuccess();
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!stripe || !elements || loading}
        className="w-full bg-blue-600 hover:bg-blue-500"
      >
        {loading ? 'Saving card...' : 'Save Payment Method'}
      </Button>
    </div>
  );
}
