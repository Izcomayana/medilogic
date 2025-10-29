import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useInvoice } from '@/hooks/useInvoice';
import {
  FileText,
  Calendar,
  Download,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type InvoiceDetailsProps = ReturnType<typeof useInvoice>;

export function InvoiceDetails({
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedInvoice,
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
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Details - {selectedInvoice?.id}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete invoice information and breakdown.
          </DialogDescription>
        </DialogHeader>

        {selectedInvoice && (
          <div className="space-y-6 py-4 max-h-96 overflow-y-auto">
            {/* Invoice Metadata */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Invoice Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm">Invoice ID</Label>
                    <p className="text-white font-medium">
                      {selectedInvoice.id}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Client / Organization
                    </Label>
                    <p className="text-white">{selectedInvoice.client}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Status</Label>
                    <div className="mt-1">
                      {getStatusBadge(selectedInvoice.status)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Dates
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm">Issue Date</Label>
                    <p className="text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedInvoice.issueDate}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Created By</Label>
                    <p className="text-white">{selectedInvoice.createdBy}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Created At</Label>
                    <p className="text-white text-sm">
                      {selectedInvoice.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Trip Breakdown
              </h3>
              <div className="space-y-2">
                {selectedInvoice.tripDetails.map((trip, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600"
                  >
                    <div className="flex-1">
                      <p className="text-white font-medium">{trip.tripId}</p>
                      <p className="text-gray-400 text-sm">
                        {trip.description}
                      </p>
                    </div>
                    <p className="text-white font-semibold flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />£
                      {trip.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
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
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Tax (0%):</span>
                  <span className="text-white font-medium">£0.00</span>
                </div>
                <div className="border-t border-gray-600 pt-3 flex items-center justify-between">
                  <span className="text-white font-semibold">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-white flex items-center gap-1">
                    <DollarSign className="h-5 w-5" />£
                    {selectedInvoice.amount.toFixed(2)}
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
          >
            Close
          </Button>
          <Button
            onClick={() => toast.info('PDF download feature coming soon')}
            className="primary-button"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
