import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { useState } from 'react';

type Props = {
  clientSecret: string;
  onSuccess: () => void;
};

export function StripePaymentModal({ clientSecret, onSuccess }: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: { theme: 'night' } }}
    >
      <CheckoutForm onSuccess={onSuccess} />
    </Elements>
  );
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        className="w-full py-2 rounded bg-[#15941f] text-white"
      >
        {loading ? 'Processing...' : 'Confirm Payment'}
      </button>
    </form>
  );
}
