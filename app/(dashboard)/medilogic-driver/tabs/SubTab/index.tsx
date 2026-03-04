import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  Calendar,
  Crown,
  Loader2,
  ArrowUpCircle,
  ArrowDownCircle,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import useMedilogicDriver from '../../hooks/useMeDriver';

type SubTabProps = ReturnType<typeof useMedilogicDriver>;

export default function SubscriptionTab({
  subscription,
  subscribeToPlan,
  handleChangePlan,
  cancelSubscription,
  resumeSubscription,
  isSaving,
}: SubTabProps) {
  if (!subscription) return null;

  const isActive = subscription.status === 'active';
  const isCancelled = subscription.status === 'cancelled';
  const isFree = subscription.plan === 'free';
  const isCancelling = subscription.cancel_at_period_end === true;

  const formatDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString() : '—';

  const PLANS = [
    {
      id: 'free',
      label: 'Free',
      price: '£0',
      description: 'Basic access',
      tier: 0,
    },
    {
      id: 'green',
      label: 'Green',
      price: '£19/mo',
      description: 'More jobs',
      tier: 1,
    },
    {
      id: 'blue',
      label: 'Blue',
      price: '£39/mo',
      description: 'Unlimited access',
      tier: 2,
    },
  ];

  const currentTier = PLANS.find((p) => p.id === subscription.plan)?.tier ?? 0;

  const subscriptionState = (() => {
    if (isCancelling)
      return { label: 'Cancelling', className: 'bg-orange-600' };
    if (isActive) return { label: 'Active', className: 'bg-green-600' };
    if (isCancelled) return { label: 'Cancelled', className: 'bg-yellow-600' };
    return { label: 'Inactive', className: 'bg-gray-600 text-gray-200' };
  })();

  const canCancel = !isFree && isActive && !isCancelling;
  const canResume = !isFree && isActive && isCancelling;

  return (
    <div className="max-w-3xl space-y-6">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <CreditCard className="h-5 w-5" />
            Subscription
          </CardTitle>

          <Badge className={subscriptionState.className}>
            {subscriptionState.label}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((plan) => {
              const active = subscription.plan === plan.id;
              const isUpgrade = plan.tier > currentTier;
              const isDowngrade = plan.tier < currentTier;

              const handleClick = () => {
                // Downgrade to Free = Cancel subscription
                if (plan.id === 'free' && !isFree) {
                  cancelSubscription(true);
                  return;
                }

                // Free → Paid
                if (isFree && plan.id !== 'free') {
                  subscribeToPlan(plan.id);
                  return;
                }

                // Paid → Paid (green ↔ blue)
                if (!isFree && plan.id !== 'free') {
                  handleChangePlan(plan.id);
                }
              };

              return (
                <div
                  key={plan.id}
                  className={`p-6 rounded-xl border transition duration-200 ${
                    active
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-500'
                  }`}
                >
                  <div className="mb-4">
                    <h3 className="text-white text-lg font-semibold">
                      {plan.label}
                    </h3>
                    <p className="text-green-400 font-bold text-xl">
                      {plan.price}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {plan.description}
                    </p>
                  </div>

                  <button
                    disabled={
                      active || isSaving || (plan.id === 'free' && isCancelling)
                    }
                    // disabled={active || isSaving}
                    onClick={handleClick}
                    className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                      active
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:opacity-90'
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : active ? (
                      'Current Plan'
                    ) : isUpgrade ? (
                      <>
                        <ArrowUpCircle className="h-4 w-4" />
                        Upgrade
                      </>
                    ) : plan.id === 'free' && !isFree ? (
                      <>
                        <XCircle className="h-4 w-4" />
                        Cancel Plan
                      </>
                    ) : isUpgrade ? (
                      <>
                        <ArrowUpCircle className="h-4 w-4" />
                        Upgrade
                      </>
                    ) : isDowngrade ? (
                      <>
                        <ArrowDownCircle className="h-4 w-4" />
                        Downgrade
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Current Plan Summary */}
          <div className="p-5 rounded-xl bg-gray-900 border border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Current Plan</p>
                <p className="text-white text-xl font-semibold capitalize">
                  {subscription.plan}
                </p>
                {isActive && subscription.end && (
                  <p className="text-sm text-gray-400 mt-1">
                    Renews on {formatDate(subscription.end)}
                  </p>
                )}
                {isCancelled && subscription.end && (
                  <p className="text-sm text-yellow-400 mt-1">
                    Ends on {formatDate(subscription.end)}
                  </p>
                )}
              </div>
            </div>

            {/* Cancel button */}
            {canCancel && (
              <button
                onClick={() => cancelSubscription(true)}
                disabled={isSaving}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-red-600 hover:opacity-90 text-white"
              >
                <XCircle className="h-4 w-4" />
                Cancel
              </button>
            )}

            {/* Resume button (only when cancelling but still active) */}
            {canResume && (
              <button
                onClick={resumeSubscription}
                disabled={isSaving}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-green-600 hover:opacity-90 text-white"
              >
                <RotateCcw className="h-4 w-4" />
                Resume
              </button>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-400">Start Date</p>
                <p className="text-white">{formatDate(subscription.start)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-400">End Date</p>
                <p className="text-white">{formatDate(subscription.end)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}