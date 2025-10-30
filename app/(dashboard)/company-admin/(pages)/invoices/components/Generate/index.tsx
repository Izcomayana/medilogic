import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useInvoice } from '@/hooks/useInvoice';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign, Plus, X } from 'lucide-react';
import DateRangeFilter from '@/app/(dashboard)/components/DateRange';
import { useUsers } from '@/hooks/useUsers';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Spinner } from '@/components/ui/spinner';

type GenerateInvoiceProps = ReturnType<typeof useInvoice>;

export function GenerateInvoice({
  isGenerateModalOpen,
  setIsGenerateModalOpen,
  generating,
  formData,
  setFormData,
  clientTrips,
  tripsLoading,
  toggleTripSelection,
  calculateTotal,
  resetForm,
  handleGenerateInvoice,
  dateFilter,
  setDateFilter,
}: GenerateInvoiceProps) {
  const { users, loading } = useUsers();
  const clients = users.filter((user) => user.role === 'client');

  return (
    <AlertDialog
      open={isGenerateModalOpen}
      onOpenChange={setIsGenerateModalOpen}
    >
      <AlertDialogTrigger asChild>
        <Button className="primary-button">
          <Plus className="h-4 w-4" />
          Generate Invoice
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl flex flex-col">
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>Generate New Invoice</AlertDialogTitle>
            <AlertDialogCancel
              className="text-gray-700"
              onClick={() => setIsGenerateModalOpen(false)}
            >
              <X />
            </AlertDialogCancel>
          </div>

          <AlertDialogDescription className="text-gray-400">
            Create a new invoice by selecting a client and completed trips.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Make the form scrollable */}
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[65vh] pr-1">
          <div>
            <Label htmlFor="notes" className="text-gray-300 mb-2">
              Billing Dates
            </Label>
            <DateRangeFilter value={dateFilter} onChange={setDateFilter} />
          </div>

          <div>
            <Label htmlFor="client" className="text-gray-300 mb-2">
              Client
            </Label>

            <Select
              value={formData.client}
              onValueChange={(value) =>
                setFormData({ ...formData, client: value, selectedTrips: [] })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue
                  placeholder={loading ? 'Loading clients...' : 'Select client'}
                />
              </SelectTrigger>

              <SelectContent className="bg-gray-700 border-gray-600">
                {loading ? (
                  <div className="p-2 text-gray-400 text-sm">
                    Loading clients...
                  </div>
                ) : clients.length === 0 ? (
                  <div className="p-2 text-gray-400 text-sm">
                    No clients found
                  </div>
                ) : (
                  clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {formData.client && (
            <div>
              <Label className="text-gray-300 mb-2 block">Select Trips</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-700 rounded-lg p-3 border border-gray-600">
                {tripsLoading ? (
                  <p className="text-gray-400 text-sm">Loading trips...</p>
                ) : clientTrips.length > 0 ? (
                  clientTrips.map((trip) => {
                    const formattedType =
                      trip.delivery_type === 'other'
                        ? trip.custom_delivery_description || 'Other'
                        : trip.delivery_type
                            ?.replaceAll('_', ' ')
                            .replace(/\b\w/g, (l: string) => l.toUpperCase()) ||
                          'Unknown Type';

                    return (
                      <div
                        key={trip.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-600 rounded cursor-pointer"
                      >
                        <Checkbox
                          id={trip.trip_id}
                          checked={formData.selectedTrips.includes(
                            trip.trip_id
                          )}
                          onCheckedChange={() =>
                            toggleTripSelection(trip.trip_id)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />

                        <Label
                          htmlFor={trip.trip_id}
                          className="flex-1 items-center "
                        >
                          <div className="">
                            <div className="text-sm text-white">
                              {trip.driver_name || trip.id}
                            </div>
                            <div className="text-xs text-gray-400">
                              {formattedType}
                            </div>
                          </div>
                        </Label>
                        <div className="text-sm font-medium text-white">
                          £{(trip.cost || 0).toFixed(2)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-sm">
                    No completed trips in this period
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <Label className="text-gray-300 mb-2 block">Invoice Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as 'paid' | 'unpaid' | 'overdue',
                })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Due Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-48 justify-start bg-gray-700 border-gray-600 text-white"
                >
                  {formData.dueDate
                    ? formData.dueDate.toLocaleDateString()
                    : 'Select due date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="bg-gray-800 border border-gray-600 p-2 rounded-lg w-auto overflow-hidden"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={formData.dueDate || undefined} // ✅ Fix #2
                  onSelect={
                    (date) =>
                      setFormData({ ...formData, dueDate: date ?? null }) // ✅ Fix #3
                  }
                  disabled={(date) => date < new Date()}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

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

        <AlertDialogFooter className="pt-2 border-t border-gray-700 sticky">
          <Button
            variant="outline"
            onClick={() => {
              setIsGenerateModalOpen(false);
              resetForm();
            }}
            className="text-gray-700 border-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerateInvoice}
            className="primary-button"
            disabled={generating}
          >
            {generating ? <Spinner className="mx-10" /> : 'Generate Invoice'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
