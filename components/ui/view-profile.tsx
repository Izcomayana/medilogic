'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  User,
  Shield,
  Building,
  LogOut,
  // ExternalLink,
  Loader2,
  CheckCircle2,
  XCircle,
  Phone,
  MapPin,
  IdCard,
} from 'lucide-react';
// import Link from 'next/link';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import axios from 'axios';
import { useAuth } from '@/components/auth';

type UserProfile = {
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  organization: {
    id: string | null;
    name: string | null;
    address: string | null;
    phone_number: string | null;
  };
};

export function ViewProfileDropdown() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const authorizedRequest = useAuthorizedRequest();
  const { logout } = useAuth();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);

      const data = await authorizedRequest(async (validToken) => {
        const res = await axios.get(
          'https://medilogic-backend.onrender.com/profile',
          {
            headers: { Authorization: `Bearer ${validToken}` },
          }
        );

        return res.data as UserProfile;
      }, 'Failed to load profile');

      if (isMounted) {
        if (data) setUser(data);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [authorizedRequest]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative text-white hover:bg-gray-800"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-gray-800 border-gray-700 text-white"
      >
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        ) : user ? (
          <>
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                {user.is_verified ? (
                  <span title="Verified">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </span>
                ) : (
                  <span title="Not Verified">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>

            <div className="p-4 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <span>Role: {user.role}</span>
              </div>

              {user.organization &&
                (user.organization.name || user.organization.address) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span>{user.organization.name || 'No Organization'}</span>
                    </div>
                    {user.organization.address && (
                      <div className="flex items-center gap-2 pl-6 text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{user.organization.address}</span>
                      </div>
                    )}
                    {user.organization.phone_number && (
                      <div className="flex items-center gap-2 pl-6 text-gray-400">
                        <Phone className="h-4 w-4" />
                        <span>{user.organization.phone_number}</span>
                      </div>
                    )}
                  </div>
                )}

              {user.organization.id && (
                <div className="flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-gray-400" />
                  <span className="text-[10px]">
                    ID: {user.organization.id}
                  </span>
                </div>
              )}
            </div>

            <DropdownMenuSeparator className="bg-gray-700" />

            <div className="p-3 space-y-2">
              {/* <Link href="/#">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-[#15941f] hover:bg-gray-700"
                >
                  View Full Profile
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link> */}
              <Button
                variant="ghost"
                className="w-full justify-center text-red-500 hover:bg-gray-700"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          <div className="p-4 text-sm text-gray-400">No profile data</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
