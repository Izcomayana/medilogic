import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Save, CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useMedilogicDriver from "../../hooks/useMeDriver";

type ProfileTabProps = ReturnType<typeof useMedilogicDriver>;

export default function ProfileTab({
  formData,
  setIsEditing,
  isEditing,
  isSaving,
  handleInputChange,
  handleSaveProfile,
}: ProfileTabProps) {
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