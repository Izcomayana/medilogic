"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Truck, CreditCard, Save } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/app/(dashboard)/components/PageHeader"
import { Button } from "@/components/ui/button"

export default function DriverProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Smith",
    phone: "+234 701 234 5678",
    email: "john.smith@email.com",
    vehicle: "Toyota Hiace",
    region: "Lagos",
    bio: "Experienced driver with 5+ years in logistics",
  })

  const [subscriptionData, setSubscriptionData] = useState({
    plan: "Pro",
    status: "active",
    renewalDate: "2024-02-15",
    monthlyFee: 15000,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profileData)

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setProfileData(formData)
    setIsEditing(false)
    toast.success("Profile updated successfully")
  }

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Profile & Subscription"
        subtitle="Manage your account and subscription settings"
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* <h1 className="text-3xl font-bold text-white mb-2"></h1>
          <p className="text-gray-400 mb-8"></p> */}

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-700">
            <Button
              onClick={() => setActiveTab("profile")}
              className={`pb-3 px-2 font-medium transition ${activeTab === "profile" ? "text-white border-b-2 border-[#15941f]" : "text-gray-400 hover:text-gray-300"}`}
            >
              Profile Details
            </Button>
            <Button
              onClick={() => setActiveTab("subscription")}
              className={`pb-3 px-2 font-medium transition ${activeTab === "subscription" ? "text-white border-b-2 border-[#15941f]" : "text-gray-400 hover:text-gray-300"}`}
            >
              Subscription
            </Button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid gap-6 max-w-2xl">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-3 py-1 rounded text-sm font-medium ${isEditing ? "bg-gray-700 text-gray-300" : "bg-[#15941f] text-white hover:bg-green-700"}`}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={isEditing ? formData.firstName : profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white disabled:opacity-50 focus:outline-none focus:border-[#15941f]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={isEditing ? formData.lastName : profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white disabled:opacity-50 focus:outline-none focus:border-[#15941f]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? formData.email : profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white disabled:opacity-50 focus:outline-none focus:border-[#15941f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? formData.phone : profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white disabled:opacity-50 focus:outline-none focus:border-[#15941f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={isEditing ? formData.bio : profileData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white disabled:opacity-50 focus:outline-none focus:border-[#15941f]"
                    />
                  </div>

                  {isEditing && (
                    <button
                      onClick={handleSaveProfile}
                      className="w-full px-4 py-2 rounded bg-[#15941f] hover:bg-green-700 text-white font-medium flex items-center justify-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Vehicle Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-2">Vehicle</label>
                    <input
                      type="text"
                      value={profileData.vehicle}
                      disabled
                      className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-2">Operating Region</label>
                    <input
                      type="text"
                      value={profileData.region}
                      disabled
                      className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white opacity-50"
                    />
                  </div>
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
