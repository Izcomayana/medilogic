'use client';

import { useEffect, useState } from 'react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';
import { toast } from 'sonner';

type Status =
  | 'active'
  | 'expired'
  | 'cancelled'
  | 'none'
  | 'past_due'
  | 'inactive'
  | 'incomplete';

export function useBillingAccess() {
  const [status, setStatus] = useState<Status | null>(null);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [loadingSub, setLoadingSub] = useState(true);
  const [showBillingModal, setShowBillingModal] = useState(false);

  const authorizedRequest = useAuthorizedRequest();

  useEffect(() => {
    const fetchStatus = async () => {
      await authorizedRequest(async (token) => {
        const res = await api.get('/billing/status', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStatus(res.data.subscription_status);
        setHasPaymentMethod(res.data.has_payment_method);
      }, 'Failed to fetch billing status');

      setLoadingSub(false);
    };

    fetchStatus();
  }, []);

  // 🔥 FIXED ACCESS LOGIC
  const canAccess = () => {
    return status === 'active';
  };

  const hasAccess = canAccess();

  const requireAccess = (onAllowed: () => void) => {
    if (hasAccess) {
      onAllowed();
    } else {
      setShowBillingModal(true);
    }
  };

  const showWarningIfNeeded = () => {
    if (!loadingSub && !hasAccess) {
      toast.warning('Active subscription required');
    }
  };

  const getMessage = () => {
    if (!hasPaymentMethod)
      return 'Add a payment method to unlock this feature.';

    switch (status) {
      case 'active':
        return '';
      case 'incomplete':
        return 'Complete your subscription setup.';
      case 'past_due':
        return 'Payment failed. Please update your card.';
      case 'cancelled':
        return 'Your subscription has been cancelled.';
      case 'expired':
        return 'Your subscription has expired.';
      case 'inactive':
        return 'Subscription inactive.';
      case 'none':
        return 'No active subscription.';
      default:
        return 'Billing issue detected.';
    }
  };

  const getCTA = () => {
    if (!hasPaymentMethod) return 'Add Payment Method';
    return 'Manage Subscription';
  };

  return {
    status,
    hasPaymentMethod,
    loadingSub,
    canAccess,
    requireAccess,
    showBillingModal,
    setShowBillingModal,
    showWarningIfNeeded,
    hasAccess,
    getMessage,
    getCTA,
  };
}

// export function useBillingAccess() {
//   const [status, setStatus] = useState<Status | null>(null);
//   const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
//   const [loadingSub, setLoadingSub] = useState(true);
//   const [showBillingModal, setShowBillingModal] = useState(false);

//   const authorizedRequest = useAuthorizedRequest();

//   useEffect(() => {
//     const fetchStatus = async () => {
//       await authorizedRequest(async (token) => {
//         const res = await api.get('/billing/status', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setStatus(res.data.subscription_status);
//         setHasPaymentMethod(res.data.has_payment_method); // ✅ NEW
//       }, 'Failed to fetch billing status');

//       setLoadingSub(false);
//     };

//     fetchStatus();
//   }, []);

//   // ✅ NEW LOGIC (CRITICAL)
//   const canAccess = () => {
//     return hasPaymentMethod; // 🔥 ONLY THIS MATTERS NOW
//   };

//   const hasAccess = canAccess();

//   const requireAccess = (onAllowed: () => void) => {
//     if (hasAccess) {
//       onAllowed();
//     } else {
//       setShowBillingModal(true);
//     }
//   };

//   const showWarningIfNeeded = () => {
//     if (!loadingSub && !hasPaymentMethod) {
//       toast.warning('Payment required to create trips');
//     }
//   };

//   return {
//     status,
//     hasPaymentMethod,
//     loadingSub,
//     canAccess,
//     requireAccess,
//     showBillingModal,
//     setShowBillingModal,
//     showWarningIfNeeded,
//     hasAccess,
//   };
// }
