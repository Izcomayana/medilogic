import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';
import { TabsContent } from '@radix-ui/react-tabs';
import { Bell, Mail, Phone } from 'lucide-react';

type NotificationProps = ReturnType<typeof useSettings>;

export function NotificationsTab({
  notificationSettings,
  setNotificationSettings,
}: NotificationProps) {
  return (
    <TabsContent value="notifications" className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-white font-medium">
              Communication Preferences
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <span className="text-white">Email Notifications</span>
                    <p className="text-sm text-gray-400">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <div>
                    <span className="text-white">Push Notifications</span>
                    <p className="text-sm text-gray-400">
                      Receive browser push notifications
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      pushNotifications: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <span className="text-white">SMS Notifications</span>
                    <p className="text-sm text-gray-400">
                      Receive notifications via SMS
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      smsNotifications: checked,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium">Content Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <span className="text-white">Weekly Reports</span>
                  <p className="text-sm text-gray-400">
                    Receive weekly activity summaries
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      weeklyReports: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <span className="text-white">Security Alerts</span>
                  <p className="text-sm text-gray-400">
                    Important security notifications
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      securityAlerts: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <span className="text-white">System Updates</span>
                  <p className="text-sm text-gray-400">
                    Notifications about system maintenance
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.systemUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      systemUpdates: checked,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
