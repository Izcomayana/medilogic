import { Button } from '@/components/ui/button';
import { TabsContent } from '@radix-ui/react-tabs';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/hooks/useSettings';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';

type ProfileProps = ReturnType<typeof useSettings>;

export function ProfileTab(
  {
    // profileData,
    // setProfileData,
    // handleUpdateProfile,
  }: ProfileProps
) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return (
          <Badge variant="secondary" className="bg-blue-600 text-white">
            Driver
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@logistics.com',
    phone: '+234 123 456 7890',
    bio: 'Logistics administrator managing waste collection operations.',
    organization: 'Logistics Admin',
    role: 'Admin',
  });

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully');
  };

  return (
    <TabsContent value="profile" className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Profile Information
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName" className="text-gray-300">
                First Name
              </Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    firstName: e.target.value,
                  })
                }
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-300">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    lastName: e.target.value,
                  })
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
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    email: e.target.value,
                  })
                }
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phone: e.target.value,
                  })
                }
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="organization" className="text-gray-300">
                Organization
              </Label>
              <Input
                id="organization"
                value={profileData.organization}
                disabled
                className="bg-gray-700 border-gray-600 text-gray-400 mt-2"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-gray-300">
                Role
              </Label>
              <div className="mt-2">{getRoleBadge(profileData.role)}</div>
            </div>
            <div>
              <Label htmlFor="bio" className="text-gray-300 mt-2">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    bio: e.target.value,
                  })
                }
                className="bg-gray-700 border-gray-600 text-white mt-2"
                rows={4}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleUpdateProfile} className="primary-button">
            Update Profile
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}
