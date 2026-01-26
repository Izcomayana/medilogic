"use client";

import { PageHeader } from "@/app/(dashboard)/components/PageHeader";
import ProfileTab from "./tabs/Profile";
import useMedilogicDriver from "./hooks/useMeDriver";
import SubscriptionTab from "./tabs/SubTab";
import { StripePaymentModal } from "./tabs/SubTab/StripePaymentModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export function MedilogicDriver() {
  const driverState = useMedilogicDriver();
  const {
    loading,
    setActiveTab,
    activeTab,
    paymentClientSecret,
    handlePaymentSuccess,
  } = driverState;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading profile...
      </div>
    )
  }

  return (
    <>
        <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Profile & Subscription"
        subtitle="Manage your account and subscription settings"
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-700">
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-3 px-2 font-medium transition ${activeTab === "profile" ? "text-white border-b-2 border-[#15941f]" : "text-gray-400 hover:text-gray-300"}`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("subscription")}
              className={`pb-3 px-2 font-medium transition ${activeTab === "subscription" ? "text-white border-b-2 border-[#15941f]" : "text-gray-400 hover:text-gray-300"}`}
            >
              Subscription
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <ProfileTab {...driverState} />
          )}

          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <SubscriptionTab {...driverState} />
          )}
        </div>
      </main>
    </div>

    {paymentClientSecret && (
  <Elements
    stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)}
    options={{ clientSecret: paymentClientSecret }}
  >
    <StripePaymentModal
    clientSecret={paymentClientSecret}
      onSuccess={handlePaymentSuccess}
    />
  </Elements>
)}
{/* 
    {paymentClientSecret && (
  <StripePaymentModal
    clientSecret={paymentClientSecret}
    onSuccess={handlePaymentSuccess}
  />
)} */}
    </>
  )
}
