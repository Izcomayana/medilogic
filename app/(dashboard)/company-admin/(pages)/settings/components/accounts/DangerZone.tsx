"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = { onDelete: () => void };

export default function DangerZone({ onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" onClick={onDelete}>
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
}
