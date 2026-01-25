"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Save, CreditCard } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthorizedRequest } from "@/hooks/useRequest";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

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

export default function ProfileTab () {
  const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<DriverProfile | null>(null);
    const [formData, setFormData] = useState<Partial<DriverProfile>>({})
  const [isSaving, setIsSaving] = useState(false)
  
    const authorizedRequest = useAuthorizedRequest();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profile) return

    try {
      setIsSaving(true)

      const payload: DriverProfile = {
        ...profile,
        ...formData,
        address: formData.address ?? profile.address ?? "",
        state: formData.state ?? profile.state ?? "",
        zip_code: formData.zip_code ?? profile.zip_code ?? "",
        phone_number: formData.phone_number ?? profile.phone_number ?? "",
        country: formData.country ?? profile.country ?? "",
        name: formData.name ?? profile.name ?? "",
      }

      await authorizedRequest(async (token) => {
        const res = await api.put<UpdateDriverResponse>(
          "/Medilogic_drivers/profile/json",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        const driver = "driver" in res.data ? res.data.driver : res.data
        setProfile(driver)
        setFormData(driver)
        setIsEditing(false)
        toast.success("Profile updated successfully")
      }, "Profile update failed")

    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex gap-2 items-center">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-1.5 rounded text-sm font-medium transition ${isEditing
                      ? "bg-gray-700 text-gray-300"
                      : "bg-[#15941f] text-white hover:bg-[#12831c]"
                      }`}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-xs text-gray-400">Full Name</Label>
                      <Input
                        name="name"
                        className="text-gray-200"
                        value={formData.name ?? ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-400">Email</Label>
                      <Input
                        name="email"
                        className="text-gray-200"
                        value={formData.email ?? ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="john@email.com"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-400">Phone Number</Label>
                      <Input
                        name="phone_number"
                        className="text-gray-200"
                        value={formData.phone_number ?? ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="+234..."
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-400">Date of Birth</Label>
                      <Input
                        type="date"
                        className="text-gray-200"
                        name="date_of_birth"
                        value={formData.date_of_birth ?? ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-300">Address</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-xs text-gray-400">Country</Label>
                        <Input
                          name="country"
                          className="text-gray-200"
                          value={formData.country ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">State</Label>
                        <Input
                          name="state"
                          className="text-gray-200"
                          value={formData.state ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">ZIP Code</Label>
                        <Input
                          name="zip_code"
                          className="text-gray-200"
                          value={formData.zip_code ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-xs text-gray-400">Full Address</Label>
                        <Input
                          name="address"
                          className="text-gray-200"
                          value={formData.address ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-300">Driver Information</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-xs text-gray-400">License Number</Label>
                        <Input
                          name="license_number"
                          className="text-gray-200"
                          value={formData.license_number ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">License Expiry</Label>
                        <Input
                          type="date"
                          className="text-gray-200"
                          name="license_expiry"
                          value={formData.license_expiry ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Vehicle Type</Label>
                        <Input
                          name="vehicle_type"
                          className="text-gray-200"
                          value={formData.vehicle_type ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Experience (Years)</Label>
                        <Input
                          type="number"
                          className="text-gray-200"
                          name="experience_years"
                          value={formData.experience_years ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Preferred Role</Label>
                        <Input
                          name="preferred_role"
                          className="text-gray-200"
                          value={formData.preferred_role ?? ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className={`w-full mt-6 px-4 py-2 rounded flex items-center justify-center gap-2 font-medium transition
      ${isSaving
                          ? "bg-[#15941f]/70 cursor-not-allowed"
                          : "bg-[#15941f] hover:bg-[#12831c]"
                        } text-white`}
                    >
                      {isSaving ? (
                        <>
                          <Spinner className="h-4 w-4" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  )}
                </CardContent>
              </Card>
            </div>
  )
}