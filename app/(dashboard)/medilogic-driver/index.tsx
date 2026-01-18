"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Truck, Save, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/app/(dashboard)/components/PageHeader";
import { useDrivers } from "@/hooks/useDrivers";

export function MedilogicDriver() {
  const {
    selectedDriver,
    fetchDriverById,
    updateDriver,
  } = useDrivers();

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [subscriptionData, setSubscriptionData] = useState({ 
    plan: "Pro", 
    status: "active", 
    renewalDate: "2024-02-15", 
    monthlyFee: 15000, 
  })

    useEffect(() => {
    if (selectedDriver) {
      setFormData({
        name: selectedDriver.name,
        email: selectedDriver.email,
        phone_number: selectedDriver.phone_number,
        country: selectedDriver.country,
        state: selectedDriver.state,
        address: selectedDriver.address,
        zip_code: selectedDriver.zip_code,
        date_of_birth: selectedDriver.date_of_birth,
        license_number: selectedDriver.license_number,
        license_expiry: selectedDriver.license_expiry,
        vehicle_type: selectedDriver.vehicle_type,
        preferred_role: selectedDriver.preferred_role,
        experience_years: selectedDriver.experience_years,
      });
    }
  }, [selectedDriver]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!selectedDriver) return;

    await updateDriver(selectedDriver.id, formData);
    setIsEditing(false);
    toast.success("Profile updated");
  };

  // const handleChangePlan = async (plan: string) => {
  //   const payload = new FormData()
  //   payload.append("plan", plan)

  //   try {
  //     await authorizedRequest(async (token) => {
  //       const res = await api.put(
  //         "/Medilogic_drivers/me",
  //         payload,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       )

  //       setProfile(res.data)
  //       setFormData(res.data)
  //       toast.success(`Subscription updated to ${plan}`)
  //     }, "Plan update failed")
  //   } catch {
  //     toast.error("Unable to change subscription")
  //   }
  // }

  const handleChangePlan = (newPlan: string) => {
    setSubscriptionData((prev) => ({ ...prev, plan: newPlan }))
    toast.success(`Subscription upgraded to ${newPlan}`)
  }

  const handleCancelSubscription = () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      setSubscriptionData((prev) => ({ ...prev, status: "cancelled" }))
      toast.success("Subscription cancelled")
    }
  }

  // if (loading || !profile) {
  //   return (
  //     <div className="flex items-center justify-center h-screen text-gray-400">
  //       Loading profile...
  //     </div>
  //   )
  // }

  if (!selectedDriver) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading profile...
      </div>
    );
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
            <div className="max-w-2xl">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  isEditing
                    ? "bg-gray-700 text-gray-300"
                    : "bg-[#15941f] text-white"
                }`}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </CardHeader>

            <CardContent className="space-y-4">
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Full name"
              />

              <input
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Email"
              />

              <input
                name="phone_number"
                value={formData.phone_number || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Phone number"
              />

              <input
                name="vehicle_type"
                value={formData.vehicle_type || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Vehicle type"
              />

              {isEditing && (
                <button
                  onClick={handleSaveProfile}
                  className="w-full px-4 py-2 rounded bg-[#15941f] text-white flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Vehicle Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                value={selectedDriver.vehicle_type}
                disabled
                className="opacity-50"
              />
            </CardContent>
          </Card>
        </div>
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
                        <span className="text-white font-medium">₦{subscriptionData.monthlyFee.toLocaleString()}</span>
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
