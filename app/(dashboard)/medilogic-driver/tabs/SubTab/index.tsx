import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Crown, Loader2 } from 'lucide-react';
import useMedilogicDriver from '../../hooks/useMeDriver';

type SubTabProps = ReturnType<typeof useMedilogicDriver>;

export default function SubscriptionTab({
  subscription,
  subscribeToPlan,
  isSaving,
}: SubTabProps) {
  if (!subscription) return null;

  const isActive = subscription.status === 'active';
  const isFree = subscription.plan === 'free';

  const PLANS = [
    { id: 'free', label: 'Free', description: 'Basic access' },
    { id: 'green', label: 'Pro', description: 'More jobs, priority access' },
    { id: 'blue', label: 'Premium', description: 'Unlimited access' },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription
          </CardTitle>

          <Badge
            className={isActive ? 'bg-green-600' : 'bg-gray-600 text-gray-200'}
          >
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Plan */}
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan) => {
              const active = subscription.plan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`p-5 rounded-lg border transition ${
                    active
                      ? 'border-[#15941f] bg-[#15941f]/10'
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  <div className="p-2">
                    <h3 className="text-white text-lg font-semibold">
                      {plan.label}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {plan.description}
                    </p>
                  </div>

                  <button
                    disabled={active || isSaving}
                    onClick={() => subscribeToPlan(plan.id)}
                    className={`w-full py-2 rounded font-medium transition ${
                      active
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-[#15941f] text-white hover:opacity-90'
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                    ) : active ? (
                      'Current Plan'
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Current Plan</p>
                <p className="text-white text-xl font-semibold capitalize">
                  {subscription.plan}
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-4 bg-gray-900 rounded border border-gray-700">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-400">Start Date</p>
                <p className="text-white">
                  {subscription.start
                    ? new Date(subscription.start).toLocaleDateString()
                    : '—'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-900 rounded border border-gray-700">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-400">End Date</p>
                <p className="text-white">
                  {subscription.end
                    ? new Date(subscription.end).toLocaleDateString()
                    : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          {isFree && (
            <div className="p-4 rounded-lg border border-dashed border-gray-600 text-center">
              <p className="text-gray-300 mb-3">
                You are currently on the Free plan.
              </p>
              <button className="px-6 py-2 rounded bg-[#15941f] text-white font-medium hover:opacity-90 transition">
                Upgrade Plan
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CreditCard } from "lucide-react";
// import useMedilogicDriver from "../../hooks/useMeDriver";

// type SubTabProps = ReturnType<typeof useMedilogicDriver>;

// export default function SubscriptionTab({
//   subscriptionData,
//   handleChangePlan,
//   handleCancelSubscription
// }: SubTabProps) {
//   return (
//     <div className="grid gap-6 max-w-2xl">
//       <Card className="bg-gray-800 border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-white flex items-center gap-2">
//             <CreditCard className="h-5 w-5" />
//             Current Subscription
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <p className="text-gray-400 text-sm mb-1">Current Plan</p>
//                 <p className="text-white text-2xl font-bold">{subscriptionData.plan}</p>
//               </div>
//               <div
//                 className={`px-3 py-1 rounded text-xs font-medium ${subscriptionData.status === "active" ? "bg-[#15941f] text-white" : "bg-red-600 text-white"}`}
//               >
//                 {subscriptionData.status === "active" ? "Active" : "Cancelled"}
//               </div>
//             </div>

//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-400">Monthly Fee</span>
//                 <span className="text-white font-medium">£{subscriptionData.monthlyFee.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-400">Renewal Date</span>
//                 <span className="text-white font-medium">{subscriptionData.renewalDate}</span>
//               </div>
//             </div>
//           </div>

//           {subscriptionData.status === "active" && (
//             <div className="space-y-3">
//               <p className="text-gray-300 text-sm">Upgrade to Premium for advanced features</p>
//               <div className="grid gap-3">
//                 {["Basic", "Pro", "Premium"].map((plan) => (
//                   <button
//                     key={plan}
//                     onClick={() => handleChangePlan(plan)}
//                     className={`px-4 py-3 rounded border text-sm font-medium transition ${plan === subscriptionData.plan ? "bg-[#15941f] border-[#15941f] text-white" : "border-gray-600 text-gray-300 hover:border-gray-500"}`}
//                   >
//                     {plan}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {subscriptionData.status === "active" && (
//             <button
//               onClick={handleCancelSubscription}
//               className="w-full px-4 py-2 rounded border border-red-600 hover:bg-red-600 hover:bg-opacity-20 text-red-600 font-medium transition"
//             >
//               Cancel Subscription
//             </button>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
