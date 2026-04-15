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
        setHasPaymentMethod(res.data.has_payment_method); // ✅ NEW
      }, 'Failed to fetch billing status');

      setLoadingSub(false);
    };

    fetchStatus();
  }, []);

  // ✅ NEW LOGIC (CRITICAL)
  const canAccess = () => {
    return hasPaymentMethod; // 🔥 ONLY THIS MATTERS NOW
  };

  const requireAccess = (onAllowed: () => void) => {
    if (canAccess()) {
      onAllowed();
    } else {
      setShowBillingModal(true);
    }
  };

  const showWarningIfNeeded = () => {
    if (!loadingSub && !hasPaymentMethod) {
      toast.warning('Payment required to create trips');
    }
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
  };
}
