'use client';

import { TabsContent } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/hooks/useSettings';

type ProfileProps = ReturnType<typeof useSettings>;

export function ProfileTab({
  userProfileData,
  setUserProfileData,
  orgProfileData,
  setOrgProfileData,
  handleUpdateUserProfile,
  handleUpdateOrgProfile,
  isUserProfileChanged,
  isLoading,
  isOrgProfileChanged,
}: ProfileProps) {
  return (
    <TabsContent value="profile" className="p-6 space-y-10">
      {/* ================= PERSONAL ACCOUNT ================= */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Personal Account</h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              value={userProfileData.name}
              onChange={(e) =>
                setUserProfileData({ ...userProfileData, name: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={userProfileData.email}
              onChange={(e) =>
                setUserProfileData({
                  ...userProfileData,
                  email: e.target.value,
                })
              }
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleUpdateUserProfile}
            className="primary-button"
            disabled={!isUserProfileChanged || isLoading}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-12"></span>
            ) : (
              'Update Account'
            )}
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* ================= ORGANIZATION PROFILE ================= */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-white">
          Organization Profile
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Editable fields */}
          <div>
            <Label className="text-gray-300">Organization Name</Label>
            <Input
              value={orgProfileData.name}
              onChange={(e) =>
                setOrgProfileData({ ...orgProfileData, name: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-300">Email</Label>
            <Input
              type="email"
              value={orgProfileData.email}
              onChange={(e) =>
                setOrgProfileData({ ...orgProfileData, email: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-300">Phone Number</Label>
            <Input
              value={orgProfileData.phone_number}
              onChange={(e) =>
                setOrgProfileData({
                  ...orgProfileData,
                  phone_number: e.target.value,
                })
              }
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-300">Address</Label>
            <Textarea
              value={orgProfileData.address_line}
              onChange={(e) =>
                setOrgProfileData({
                  ...orgProfileData,
                  address_line: e.target.value,
                })
              }
              rows={2}
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-300">Postal Code</Label>
            <Input
              value={orgProfileData.postal_code}
              onChange={(e) =>
                setOrgProfileData({
                  ...orgProfileData,
                  postal_code: e.target.value,
                })
              }
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-300">License Number</Label>
            <Input
              value={orgProfileData.license_number}
              onChange={(e) =>
                setOrgProfileData({
                  ...orgProfileData,
                  license_number: e.target.value,
                })
              }
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-300">License Expiry Date</Label>
            <Input
              type="date"
              value={orgProfileData.license_expiry || ''}
              onChange={(e) =>
                setOrgProfileData({
                  ...orgProfileData,
                  license_expiry: e.target.value,
                })
              }
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />
          </div>

          {/* ================= DISABLED / VIEW-ONLY FIELDS ================= */}
          <div>
            <Label className="text-gray-400">Invite Code</Label>
            <Input
              value={orgProfileData.invite_code}
              disabled
              className="bg-gray-800 border-gray-700 text-gray-400 mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-400">Active Status</Label>
            <Input
              value={orgProfileData.is_active ? 'Active' : 'Inactive'}
              disabled
              className="bg-gray-800 border-gray-700 text-gray-400 mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-400">ICO Registered</Label>
            <Input
              value={orgProfileData.ico_registered ? 'Yes' : 'No'}
              disabled
              className="bg-gray-800 border-gray-700 text-gray-400 mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-400">Data Retention (Years)</Label>
            <Input
              value={orgProfileData.data_retention_years}
              disabled
              className="bg-gray-800 border-gray-700 text-gray-400 mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-400">ICO Registration Number</Label>
            <Input
              value={orgProfileData.ico_registration_number || 'N/A'}
              disabled
              className="bg-gray-800 border-gray-700 text-gray-400 mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-400">User Count</Label>
            <Input
              value={orgProfileData.user_count}
              disabled
              className="bg-gray-800 border-gray-700 text-gray-400 mt-2"
            />
          </div>

          <div>
            <Label className="text-gray-400">Trip Count</Label>
            <Input
              value={orgProfileData.trip_count}
              disabled
              className="bg-gray-800 border-gray-700 text-gray-400 mt-2"
            />
          </div>
        </div>

        {/* Supported Waste Types */}
        <div>
          <Label className="text-gray-300">Supported Waste Types</Label>
          <Textarea
            value={orgProfileData.supported_waste_types.join(', ')}
            onChange={(e) =>
              setOrgProfileData({
                ...orgProfileData,
                supported_waste_types: e.target.value
                  .split(',')
                  .map((t) => t.trim()),
              })
            }
            rows={2}
            className="bg-gray-700 border-gray-600 text-white mt-2"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleUpdateOrgProfile}
            className="primary-button"
            disabled={!isOrgProfileChanged || isLoading}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-12"></span>
            ) : (
              'Update Organization'
            )}
          </Button>
        </div>
      </section>
    </TabsContent>
  );
}
