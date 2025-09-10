"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type UserStatus = "active" | "inactive" | "suspended";

type ConfirmActionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  pendingAction: {
    status: UserStatus;
    name?: string;
  } | null;
};

export default function ConfirmActionModal({
  open,
  onOpenChange,
  onConfirm,
  pendingAction,
}: ConfirmActionModalProps) {
  if (!pendingAction) return null;

  const actionText =
    pendingAction.status === "active"
      ? "activate"
      : pendingAction.status === "suspended"
      ? "suspend"
      : "deactivate";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border border-gray-700 text-gray-200">
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to <strong>{actionText}</strong>{" "}
            {pendingAction.name ? (
              <span className="text-white">{pendingAction.name}</span>
            ) : (
              "this user"
            )}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
