"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type Props = { onChangePassword: () => void };

export default function SecuritySettings({ onChangePassword }: Props) {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleToggle2FA = async () => {
    try {
      const res = await fetch("/api/admin/2fa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !is2FAEnabled }),
      });

      if (!res.ok) throw new Error("Failed to update 2FA");
      setIs2FAEnabled(!is2FAEnabled);
      toast.success(!is2FAEnabled ? "2FA enabled" : "2FA disabled");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Two-Factor Authentication (2FA)</span>
          <Switch checked={is2FAEnabled} onCheckedChange={handleToggle2FA} />
        </div>
        <Button variant="secondary" onClick={onChangePassword}>
          Change Password
        </Button>
      </CardContent>
    </Card>
  );
}
