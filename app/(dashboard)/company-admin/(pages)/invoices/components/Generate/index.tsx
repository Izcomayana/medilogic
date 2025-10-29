import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign, Plus } from 'lucide-react';

type GenerateInvoiceProps = ReturnType<typeof useInvoice>;

export function GenerateInvoice({
  isGenerateModalOpen,
  setIsGenerateModalOpen,
  formData,
  setFormData,
  clients,
  getClientTrips,
  toggleTripSelection,
  calculateTotal,
  resetForm,
  handleGenerateInvoice,
}: GenerateInvoiceProps) {
  return (
    <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
      <DialogTrigger asChild>
        <Button className="primary-button">
          <Plus className="h-4 w-4 mr-2" />
          Generate Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-h-[90vh] lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate New Invoice</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new invoice by selecting a client and completed trips.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="client" className="text-gray-300 mb-2">
              Client / Organization
            </Label>
            <Select
              value={formData.client}
              onValueChange={(value) =>
                setFormData({ ...formData, client: value, selectedTrips: [] })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {clients.map((client) => (
                  <SelectItem key={client} value={client}>
                    {client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.client && (
            <div>
              <Label className="text-gray-300 mb-3 block mb-2">
                Select Trips
              </Label>
              <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-700 rounded-lg p-3 border border-gray-600">
                {getClientTrips(formData.client).length > 0 ? (
                  getClientTrips(formData.client).map((trip) => (
                    <div
                      key={trip.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded"
                    >
                      <input
                        type="checkbox"
                        id={trip.id}
                        checked={formData.selectedTrips.includes(trip.id)}
                        onChange={() => toggleTripSelection(trip.id)}
                        className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-600"
                      />
                      <label
                        htmlFor={trip.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="text-sm text-white">{trip.id}</div>
                        <div className="text-xs text-gray-400">
                          {trip.description}
                        </div>
                      </label>
                      <div className="text-sm font-medium text-white">
                        £{trip.amount.toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    No completed trips for this client
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="notes" className="text-gray-300 mb-2">
              Billing Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={formData.billingNotes}
              onChange={(e) =>
                setFormData({ ...formData, billingNotes: e.target.value })
              }
              placeholder="Add any billing notes or special instructions"
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Total Amount:</span>
              <span className="text-2xl font-bold text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5" />£{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsGenerateModalOpen(false);
              resetForm();
            }}
            className="text-gray-700"
          >
            Cancel
          </Button>
          <Button onClick={handleGenerateInvoice} className="primary-button">
            Generate Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
