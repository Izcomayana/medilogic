'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuthorizedRequest } from '../../../../../../../hooks/useRequest';
type ProfileData = { name: string; email: string };

export default function ProfileSettings() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John Doe',
    email: 'admin@example.com',
  });
  const authorizedRequest = useAuthorizedRequest();
  const handleUpdateProfile = async () => {
    await authorizedRequest(async (validToken) => {
      await axios.put(
        'https://medilogic-backend.onrender.com/users/users/update',
        {
          name: profileData.name,
          email: profileData.email,
        },
        {
          headers: { Authorization: `Bearer ${validToken}` },
        }
      );

      toast.success('Profile updated successfully ✅');
    }, 'Failed to update profile');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
          />
        </div>
        <Button onClick={handleUpdateProfile}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
