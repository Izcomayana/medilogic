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
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>

        <BillingContent onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}

function BillingContent({ onSuccess }: { onSuccess: () => void }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authorizedRequest = useAuthorizedRequest();

  const init = async () => {
    setLoading(true);
    setError(null);

    await authorizedRequest(async (token) => {
      const res = await api.post(
        '/billing/setup-intent',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setClientSecret(res.data.client_secret);
    }, 'Failed to load payment form').catch(() => {
      setError('Failed to load payment form');
    });

    setLoading(false);
  };

  useEffect(() => {
    if (open()) init();
  }, []);

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
    if (!stripe || !elements) return;

    setLoading(true);

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

    // 🔥 auto subscribe
    await authorizedRequest(async (token) => {
      await api.post(
        '/subscribe',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }, 'Subscription failed');

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
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500"
      >
        {loading ? 'Processing...' : 'Save & Subscribe'}
      </Button>
    </div>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { useAuthorizedRequest } from '@/hooks/useRequest';
// import { api } from '@/lib/api';
// import PaymentForm from './PaymentForm';

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// export function BillingModal({
//   open,
//   onClose,
//   onSuccess,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }) {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const authorizedRequest = useAuthorizedRequest();

//   useEffect(() => {
//     if (!open) return;

//     const init = async () => {
//       setLoading(true);

//       await authorizedRequest(async (token) => {
//         const res = await api.post(
//           '/billing/setup-intent',
//           {},
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setClientSecret(res.data.client_secret);
//       }, 'Failed to initialize payment');

//       setLoading(false);
//     };

//     init();
//   }, [open]);

//   ('use client');

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Add Payment Method</DialogTitle>
//         </DialogHeader>

//         {loading && (
//           <div className="text-center text-gray-400">Preparing payment...</div>
//         )}

//         {!loading && clientSecret && (
//           <Elements
//             stripe={stripePromise}
//             options={{ clientSecret }} // 🔥 REQUIRED
//           >
//             <PaymentForm clientSecret={clientSecret} onSuccess={onSuccess} />
//           </Elements>
//         )}

//         {!loading && !clientSecret && (
//           <div className="text-red-400">Failed to load payment form</div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
