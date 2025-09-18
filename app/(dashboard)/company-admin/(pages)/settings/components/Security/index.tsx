import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/app/(dashboard)/company-admin/(pages)/settings/useSettings';
import { TabsContent } from '@radix-ui/react-tabs';
import { Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SecurityProps = ReturnType<typeof useSettings>;

export function SecurityTab({
  is2FAEnabled,
  handleToggle2FA,
  loginSessions,
  handleTerminateSession,
}: SecurityProps) {
  return (
    <TabsContent value="security" className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Security Settings
        </h3>
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <Badge
                  className={
                    is2FAEnabled
                      ? 'bg-[#15941f] text-white'
                      : 'bg-gray-600 text-gray-300'
                  }
                >
                  {is2FAEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <Switch
                  checked={is2FAEnabled}
                  onCheckedChange={handleToggle2FA}
                />
              </div>
            </div>
          </div>

          {/* Login Sessions */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Active Login Sessions</h4>
            <div className="space-y-3">
              {loginSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">
                          {session.device}
                        </span>
                        {session.current && (
                          <Badge className="bg-[#15941f] text-white text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {session.location} • {session.ipAddress}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last active: {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTerminateSession(session.id)}
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      Terminate
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
