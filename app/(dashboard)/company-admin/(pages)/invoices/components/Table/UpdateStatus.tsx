/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function UpdateStatusModal({
  invoiceToUpdate,
  setInvoiceToUpdate,
  updateInvoiceStatus,
}: any) {
  return (
    <AlertDialog
      open={!!invoiceToUpdate}
      onOpenChange={() => setInvoiceToUpdate(null)}
    >
      <AlertDialogContent className="bg-gray-900 border border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Update Invoice Status
          </AlertDialogTitle>
        </AlertDialogHeader>

        {invoiceToUpdate && (
          <div className="space-y-4">
            <Label className="text-gray-300 text-sm">Select Status</Label>

            <Select
              value={invoiceToUpdate.status}
              onValueChange={(value) =>
                setInvoiceToUpdate({ ...invoiceToUpdate, status: value })
              }
            >
              <SelectTrigger className="bg-gray-800 border border-gray-700 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent className="bg-gray-900 border border-gray-700 text-white">
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <AlertDialogFooter>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-700"
            onClick={() => setInvoiceToUpdate(null)}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              if (invoiceToUpdate) {
                updateInvoiceStatus(invoiceToUpdate.id, invoiceToUpdate.status);
              }
              setInvoiceToUpdate(null);
            }}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
