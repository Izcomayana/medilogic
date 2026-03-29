import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useClientInvoice } from '@/app/(dashboard)/client/hooks/useInvoice';
import {
  FileText,
  Calendar,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/utils/datetime';

type InvoiceDetailsProps = ReturnType<typeof useClientInvoice>;

export function InvoiceDetails({
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedInvoice,
  handleDownloadInvoice,
}: InvoiceDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return (
          <Badge className="bg-[#15941f] text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-600 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Details - {selectedInvoice?.invoiceNumber}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete invoice information and breakdown.
          </DialogDescription>
        </DialogHeader>

        {selectedInvoice && (
          <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
            {/* Invoice Metadata */}
            <div className="">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Invoice Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm">Status</Label>
                    <div className="mt-1">
                      {getStatusBadge(selectedInvoice.status)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Issued On</Label>
                    <p className="text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDateTime(selectedInvoice.generatedAt)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Due On</Label>
                    <p className="text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDateTime(selectedInvoice.dueDate)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Refrence</Label>
                    <p className="">{selectedInvoice.referenceCode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Subtotal:</span>
                  <span className="text-white font-medium">
                    £{selectedInvoice.amount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-3 flex items-center justify-between">
                  <span className="text-white font-semibold">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-white flex items-center gap-1">
                    £{selectedInvoice.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Billing Notes */}
            {selectedInvoice.billingNotes && (
              <div className="space-y-2">
                <Label className="text-gray-400 text-sm">Billing Notes</Label>
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                  <p className="text-gray-300 text-sm">
                    {selectedInvoice.billingNotes}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDetailsModalOpen(false)}
            className="text-gray-700"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              if (!selectedInvoice) return;
              handleDownloadInvoice(
                selectedInvoice.id,
                selectedInvoice.invoiceNumber
              );
            }}
            className="primary-button"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
