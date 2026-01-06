'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import PickupConfirmForm from './PickupConfirm';

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Missing confirmation token');
      router.replace('/404');
      return;
    }

    toast.success('Token confirmed');
    setValidated(true);
  }, [token, router]);

  if (!validated || !token) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-800">
        Validating pickup token…
      </div>
    );
  }

  return <PickupConfirmForm token={token} />;
}
