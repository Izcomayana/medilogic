'use client';

import { useEffect, useState } from 'react';
import { useBillingAccess } from '@/hooks/useBillingAccess';
import { BillingModal } from '@/app/(dashboard)/components/Billing';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

export function BillingLock({ children }: { children: React.ReactNode }) {
  const { hasAccess, hasPaymentMethod, loadingSub } = useBillingAccess();
  const [showBillingModal, setShowBillingModal] = useState(false);

  if (loadingSub) return null;

  // ✅ ACCESS GRANTED
  if (hasAccess) return <>{children}</>;

  // ❌ LOCKED VIEW
  return (
    <div className="relative">
      {/* 🔒 Blurred content */}
      <div className="pointer-events-none opacity-40 blur-sm">{children}</div>

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md text-center space-y-4 shadow-xl">
          <CreditCard className="mx-auto text-blue-400" size={32} />

          <h2 className="text-xl font-semibold text-white">Payment Required</h2>

          <p className="text-gray-400 text-sm">
            {hasPaymentMethod
              ? 'Activate your subscription to access this feature.'
              : 'Add a payment method to unlock this feature.'}
          </p>

          <Button
            onClick={() => setShowBillingModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-500"
          >
            {hasPaymentMethod ? 'Activate Subscription' : 'Add Payment Method'}
          </Button>
        </div>
      </div>

      {/* 💳 Billing Modal */}
      {showBillingModal && (
        <BillingModal
          open={showBillingModal}
          onClose={() => setShowBillingModal(false)}
          onSuccess={() => {
            setShowBillingModal(false);
            window.location.reload(); // refresh access
          }}
        />
      )}
    </div>
  );
}
