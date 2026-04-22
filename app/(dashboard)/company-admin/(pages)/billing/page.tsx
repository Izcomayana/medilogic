'use client';

import { useEffect, useState } from 'react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { api } from '@/lib/api';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

type BillingSummary = {
  drivers: number;
  clients: number;
  monthly_total: number;
  subscription_status: string;
  next_billing_date: string | null;
};

export default function BillingPage() {
  const [data, setData] = useState<BillingSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const authorizedRequest = useAuthorizedRequest();

  const isCancelable = data?.subscription_status === 'active';

  const fetchData = async () => {
    setLoading(true);

    await authorizedRequest(async (token) => {
      const res = await api.get('/billing/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data);
    }, 'Failed to load billing');

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleCancel = async () => {
  //   await authorizedRequest(async (token) => {
  //     await api.post(
  //       '/billing/cancel',
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //   }, 'Cancel failed');

  //   toast.success('Subscription will cancel at period end');
  //   fetchData();
  // };

  const handleSync = async () => {
    await authorizedRequest(async (token) => {
      await api.post(
        '/billing/sync',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }, 'Sync failed');

    toast.success('Subscription synced');
    fetchData();
  };

  const handleManagePayment = async () => {
    const newTab = window.open('', '_blank'); // open immediately

    await authorizedRequest(async (token) => {
      const res = await api.post(
        '/billing/portal',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (newTab) newTab.location.href = res.data.url;
    }, 'Failed to open billing portal');
  };

  if (loading) {
    return <div className="p-6 text-gray-400">Loading billing...</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-400">Failed to load billing</div>;
  }

  function BillingStatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
      active: 'bg-green-600',
      incomplete: 'bg-yellow-500',
      past_due: 'bg-red-600',
      cancelled: 'bg-gray-500',
      expired: 'bg-gray-500',
      inactive: 'bg-gray-500',
      none: 'bg-gray-500',
    };

    const color = map[status] || 'bg-gray-500';

    return (
      <Badge className={`${color} text-white capitalize`}>
        {status.replace('_', ' ')}
      </Badge>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader title="Billing" subtitle="Manage subscription and payments" />

      <main className="flex-1 p-6">
        <Card className="bg-gray-800 border-gray-700 text-white max-w-xl">
          <CardContent className="space-y-4 p-6">
            <div>
              <p className="text-gray-400 text-sm">Subscription Status</p>
              <p className="text-xl font-semibold capitalize">
                <BillingStatusBadge status={data.subscription_status} />
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Next Billing Date</p>
              <p>
                {data.next_billing_date
                  ? new Date(data.next_billing_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400 text-sm">Usage</p>
              <p>Drivers: {data.drivers}</p>
              <p>Clients: {data.clients}</p>
              <p className="font-bold mt-2">
                Monthly Total: £{data.monthly_total}
              </p>
            </div>

            <div className="">
              {data.monthly_total === 0 && (
                <p className="text-yellow-400 text-sm">
                  Add drivers or clients to activate billing.
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSync}
                className="bg-blue-600 hover:bg-blue-500"
              >
                Sync
              </Button>

              <Button
                onClick={handleManagePayment}
                className="bg-purple-600 hover:bg-purple-500"
              >
                Manage Payment Method
              </Button>

              {/* <Button
                onClick={handleCancel}
                disabled={!isCancelable}
                className={`${
                  isCancelable
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Cancel Subscription
              </Button> */}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
