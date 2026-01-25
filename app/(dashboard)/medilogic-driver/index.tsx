"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/app/(dashboard)/components/PageHeader";
import { api } from "@/lib/api";
import { useAuthorizedRequest } from "@/hooks/useRequest";
import ProfileTab from "./tabs/Profile";

type UpdateDriverResponse = {
  driver: DriverProfile
  analytics: any | null
  client_secret: string | null;
  payment_id: string | null;
};

type DriverProfile = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  address: string;
  zip_code: string;
  date_of_birth?: string;
  license_number?: string;
  license_expiry?: string;
  vehicle_type?: string;
  preferred_role?: string;
  experience_years?: number;
  subscription_plan: string;
  subscription_status: string;
};

export function MedilogicDriver() {
  const authorizedRequest = useAuthorizedRequest();

  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [formData, setFormData] = useState<Partial<DriverProfile>>({})

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "subscription">(
    "profile"
  );

  const [subscriptionData, setSubscriptionData] = useState({
    plan: "Pro",
    status: "active",
    renewalDate: "2024-02-15",
    monthlyFee: 200,
  });

  const normalizeDriver = (data: any): DriverProfile => {
    return "driver" in data ? data.driver : data
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await authorizedRequest(async (token) => {
          const res = await api.get<DriverProfile>(
            "/Medilogic_drivers/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )

          console.log("GET /me:", res.data)

          const driver = normalizeDriver(res.data)
          setProfile(driver)
          setFormData(driver)
        }, "Failed to load profile")
      } catch {
        toast.error("Unable to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChangePlan = async (plan: string) => {
    const payload = new FormData()
    payload.append("plan", plan)

    try {
      await authorizedRequest(async (token) => {
        const res = await api.put(
          "/Medilogic_drivers/me",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )

        setProfile(res.data)
        setFormData(res.data)
        toast.success(`Subscription updated to ${plan}`)
      }, "Plan update failed")
    } catch {
      toast.error("Unable to change subscription")
    }
  }

  const handleCancelSubscription = () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      setSubscriptionData((prev) => ({ ...prev, status: "cancelled" }))
      toast.success("Subscription cancelled")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading profile...
      </div>
    )
  }

  return (
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
            <ProfileTab />
          )}

          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <div className="grid gap-6 max-w-2xl">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Current Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Current Plan</p>
                        <p className="text-white text-2xl font-bold">{subscriptionData.plan}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded text-xs font-medium ${subscriptionData.status === "active" ? "bg-[#15941f] text-white" : "bg-red-600 text-white"}`}
                      >
                        {subscriptionData.status === "active" ? "Active" : "Cancelled"}
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Fee</span>
                        <span className="text-white font-medium">£{subscriptionData.monthlyFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Renewal Date</span>
                        <span className="text-white font-medium">{subscriptionData.renewalDate}</span>
                      </div>
                    </div>
                  </div>

                  {subscriptionData.status === "active" && (
                    <div className="space-y-3">
                      <p className="text-gray-300 text-sm">Upgrade to Premium for advanced features</p>
                      <div className="grid gap-3">
                        {["Basic", "Pro", "Premium"].map((plan) => (
                          <button
                            key={plan}
                            onClick={() => handleChangePlan(plan)}
                            className={`px-4 py-3 rounded border text-sm font-medium transition ${plan === subscriptionData.plan ? "bg-[#15941f] border-[#15941f] text-white" : "border-gray-600 text-gray-300 hover:border-gray-500"}`}
                          >
                            {plan}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {subscriptionData.status === "active" && (
                    <button
                      onClick={handleCancelSubscription}
                      className="w-full px-4 py-2 rounded border border-red-600 hover:bg-red-600 hover:bg-opacity-20 text-red-600 font-medium transition"
                    >
                      Cancel Subscription
                    </button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
