'use client';

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
  // MapPin,
  IdCard,
  Tally4,
  Code,
  Copy,
  CardSim,
} from 'lucide-react';
// import Link from 'next/link';
import { useAuth } from '@/components/auth';
import { useProfile } from '@/hooks/useProfile';
import { useState } from 'react';

export function ViewProfileDropdown() {
  const { user, loading } = useProfile();
  const { logout } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

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
                <span>{user.role}</span>
              </div>

              {user.organization &&
                (user.organization.name || user.organization.address) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span>{user.organization.name || 'No Organization'}</span>
                    </div>
                    {user.organization.invite_code && (
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        <span>{user.organization.invite_code}</span>
                        <button
                          onClick={() =>
                            handleCopy(user.organization.invite_code)
                          }
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Copy invite code"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        {copied && (
                          <span className="text-green-500 text-xs">
                            Copied!
                          </span>
                        )}
                      </div>
                    )}
                    {/* {user.organization.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{user.organization.address}</span>
                      </div>
                    )} */}
                    {user.organization.phone_number && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{user.organization.phone_number}</span>
                      </div>
                    )}
                    {user.organization.license_number && (
                      <div className="flex items-center gap-2 text-gray-100">
                        <Tally4 className="h-4 w-4" />
                        <span>LIC No: {user.organization.license_number}</span>
                      </div>
                    )}
                    {user.organization.data_retention_years && (
                      <div className="flex items-center gap-2">
                        <CardSim className="h-4 w-4" />
                        <span>
                          {user.organization.data_retention_years} years of data
                          retention
                        </span>
                      </div>
                    )}
                    {user.organization.ico_registered ? (
                      <div title="Verified" className="flex items-center">
                        <span className="mr-2">Ico registered:</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <div title="Not Verified" className="flex items-center">
                        <span className="mr-2">Ico registered:</span>
                        <XCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                )}

              {user.user_short_id && (
                <div className="flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-gray-400" />
                  <span className="">ID: {user.user_short_id}</span>
                </div>
              )}
            </div>

            <DropdownMenuSeparator className="bg-gray-700" />

            <div className="p-3 space-y-2">
              {/* <Link href="/settings">
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
