import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/components/auth';

type DriverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver: any | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export function Driver({
  open,
  onOpenChange,
  driver,
  onApprove,
  onReject,
}: DriverProps) {
  const { role } = useAuth();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Driver Application</AlertDialogTitle>
        </AlertDialogHeader>

        {driver && (
          <div className="space-y-3 text-sm">
            <div>
              <Label className="text-gray-400">Driver ID</Label>
              <p>{driver.short_id}</p>
            </div>

            <div>
              <Label className="text-gray-400">Full Name</Label>
              <p>{driver.name}</p>
            </div>

            <div>
              <Label className="text-gray-400">Email</Label>
              <p>{driver.email}</p>
            </div>

            <div>
              <Label className="text-gray-400">Phone</Label>
              <p>{driver.phone_number}</p>
            </div>

            <div>
              <Label className="text-gray-400">Location</Label>
              <p>
                {driver.country}, {driver.state}, {driver.region}
              </p>
            </div>

            <div>
              <Label className="text-gray-400">Postal Code</Label>
              <p>{driver.zip_code}</p>
            </div>

            <div>
              <Label className="text-gray-400">Status</Label>
              <p className="capitalize">{driver.status}</p>
            </div>
          </div>
        )}

        <AlertDialogFooter className="mt-6 gap-2">
          {driver?.status === 'submitted' && (
            <>
              {role === 'super_admin' && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => onReject(driver.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>

                  <Button
                    className="bg-[#15941f] hover:bg-green-700"
                    onClick={() => onApprove(driver.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </>
              )}
            </>
          )}

          <AlertDialogCancel className="border-gray-600 text-gray-800">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
