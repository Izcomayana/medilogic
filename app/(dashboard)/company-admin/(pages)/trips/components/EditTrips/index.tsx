import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTrips } from '@/hooks/useTrips/useTrips';

type EditTrpProps = ReturnType<typeof useTrips>;

export function EditTripModal({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedTrip,
  formData,
  setFormData,
  clients,
  drivers,
  resetForm,
  handleUpdateTrip,
}: EditTrpProps) {
  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Trip - {selectedTrip?.id}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update trip information and status.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-client" className="text-gray-300">
                Client / Organization
              </Label>
              <Select
                value={formData.clientName}
                onValueChange={(value) =>
                  setFormData({ ...formData, clientName: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
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
            <div>
              <Label htmlFor="edit-driver" className="text-gray-300">
                Driver Assigned
              </Label>
              <Select
                value={formData.driverName}
                onValueChange={(value) =>
                  setFormData({ ...formData, driverName: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {drivers.map((driver) => (
                    <SelectItem key={driver} value={driver}>
                      {driver}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="edit-pickup" className="text-gray-300">
              Pickup Address
            </Label>
            <Input
              id="edit-pickup"
              value={formData.pickupLocation}
              onChange={(e) =>
                setFormData({ ...formData, pickupLocation: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="edit-dropoff" className="text-gray-300">
              Dropoff Address
            </Label>
            <Input
              id="edit-dropoff"
              value={formData.dropoffLocation}
              onChange={(e) =>
                setFormData({ ...formData, dropoffLocation: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-datetime" className="text-gray-300">
                Trip Date & Time
              </Label>
              <Input
                id="edit-datetime"
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) =>
                  setFormData({ ...formData, dateTime: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-status" className="text-gray-300">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="edit-notes" className="text-gray-300">
              Notes / Special Instructions
            </Label>
            <Textarea
              id="edit-notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditModalOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateTrip} className="primary-button">
            Update Trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
