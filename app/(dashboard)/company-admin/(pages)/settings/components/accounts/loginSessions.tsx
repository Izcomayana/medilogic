'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type LoginSession = {
  id: string;
  device: string;
  location: string;
  lastActive: string;
};

export default function LoginSessions() {
  const [loginSessions, setLoginSessions] = useState<LoginSession[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch('/api/admin/sessions');
        if (!res.ok) throw new Error('Failed to load sessions');
        const data = await res.json();
        setLoginSessions(data);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    fetchSessions();
  }, []);

  const handleTerminateSession = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/admin/sessions/${sessionId}/terminate`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to terminate session');
      toast.success(`Session terminated: ${sessionId}`);
      setLoginSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {loginSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div>
              <p className="font-medium">{session.device}</p>
              <p className="text-sm text-gray-500">
                {session.location} – Last active: {session.lastActive}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleTerminateSession(session.id)}
            >
              Terminate
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
