"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useAuthorizedRequest } from "../../../../../../../hooks/useRequest";
import { useState } from "react";

type Props = { open: boolean; onClose: () => void };

export default function DeleteAccountModal({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const authorizedRequest = useAuthorizedRequest();

  const handleDeleteAccount = async () => {
  setLoading(true);

  await authorizedRequest(
    async (validToken) => {
      await axios.delete(
        "https://medilogic-backend.onrender.com/users/users/users/me",
        {
          headers: { Authorization: `Bearer ${validToken}` },
          data: {
            password,
            reason,
          },
        }
      );

      toast.success("Account deleted successfully. You will be logged out.");
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    },
    "Failed to delete account"
  ).finally(() => setLoading(false));
};


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mb-3">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 border rounded mb-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Reason for deleting account"
          className="w-full p-2 border rounded mb-4 text-sm"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
