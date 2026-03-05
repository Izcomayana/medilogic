// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from '@stripe/react-stripe-js';
// import { useState } from 'react';
// import { toast } from 'sonner';
// import { api } from '@/lib/api';
// import { useAuthorizedRequest } from '@/hooks/useRequest';
// import useMedilogicDriver from '../../hooks/useMeDriver';

// type Props = {
//   clientSecret: string;
//   selectedPlan: string;
//   onSuccess: () => void;
// };

// export function StripePaymentModal({
//   clientSecret,
//   selectedPlan,
//   onSuccess,
// }: Props) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const authorizedRequest = useAuthorizedRequest();
//   const [loading, setLoading] = useState(false);
//   const { fetchProfile } = useMedilogicDriver();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setLoading(true);

//     const { error, setupIntent } = await stripe.confirmSetup({
//       elements,
//       clientSecret,
//       redirect: 'if_required',
//     });

//     if (error) {
//       setLoading(false);
//       toast.error(error.message);
//       return;
//     }

//     const paymentMethodId = setupIntent?.payment_method as string;

//     const payload = new URLSearchParams();
//     payload.append('new_plan', selectedPlan);
//     payload.append('payment_method_id', paymentMethodId);

//     await authorizedRequest(async (token) => {
//       await api.put('/Medilogic_drivers/driver/subscription', payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       });
//     }, 'Subscription failed');

//     await fetchProfile();

//     setLoading(false);
//     onSuccess();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
//         <PaymentElement options={{ layout: 'tabs' }} />
//       </div>

//       <button
//         disabled={!stripe || loading}
//         className="w-full py-2 rounded bg-[#15941f] text-white"
//       >
//         {loading ? 'Processing...' : 'Confirm Payment'}
//       </button>
//     </form>
//   );
// }

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import useMedilogicDriver from '../../hooks/useMeDriver';

type Props = {
  clientSecret: string;
  selectedPlan: string;
  onSuccess: () => void;
};

export function StripePaymentModal({
  clientSecret,
  selectedPlan,
  onSuccess,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const authorizedRequest = useAuthorizedRequest();
  const [loading, setLoading] = useState(false);
  const { fetchProfile } = useMedilogicDriver();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setLoading(false);
      toast.error(error.message);
      return;
    }

    const paymentMethodId = setupIntent.payment_method as string;

    // 🔥 Now call subscription endpoint
    const payload = new URLSearchParams();
    payload.append('new_plan', selectedPlan);
    payload.append('payment_method_id', paymentMethodId);

    await authorizedRequest(async (token) => {
      await api.put('/Medilogic_drivers/driver/subscription', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    }, 'Subscription failed');

    await fetchProfile();

    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#ffffff',
              '::placeholder': {
                color: '#9ca3af',
              },
            },
            invalid: {
              color: '#ef4444',
            },
          },
        }}
        className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
      />

      <button
        disabled={!stripe || loading}
        className="w-full py-2 rounded bg-[#15941f] text-white"
      >
        {loading ? 'Processing...' : 'Confirm Payment'}
      </button>
    </form>
  );
}
