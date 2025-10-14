import { TabsContent } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { Trash2, Plus, Truck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type VehicleTypeProps = ReturnType<typeof useSysConfig>;

export function VehicleTypeTab({
  setIsVehicleModalOpen,
  vehicleTypes,
  setDeleteConfirmDialog,
  isVehicleModalOpen,
  newVehicle,
  setNewVehicle,
  handleAddVehicle,
}: VehicleTypeProps) {
  return (
    <>
      <TabsContent value="vehicle-types" className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-700 pb-1">
          <div>
            <h4 className="text-white font-medium">Vehicle Types</h4>
            <p className="text-sm text-gray-400">
              Manage vehicle categories for your fleet
            </p>
          </div>
          <Button
            onClick={() => setIsVehicleModalOpen(true)}
            className="primary-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle Type
          </Button>
        </div>

        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Description</TableHead>
                <TableHead className="text-gray-300">Capacity</TableHead>
                <TableHead className="text-gray-300 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleTypes.map((vehicle) => (
                <TableRow key={vehicle.id} className="border-gray-700">
                  <TableCell className="font-medium text-white">
                    {vehicle.name}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {vehicle.description}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {vehicle.capacity}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setDeleteConfirmDialog({
                          open: true,
                          type: 'vehicle',
                          id: vehicle.id,
                          name: vehicle.name,
                        })
                      }
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      {/* Add Vehicle Type Modal */}
      <Dialog open={isVehicleModalOpen} onOpenChange={setIsVehicleModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-[#15941f]" />
              Add Vehicle Type
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new vehicle type for your fleet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="vehicleName" className="text-gray-300 mb-2">
                Name *
              </Label>
              <Input
                id="vehicleName"
                value={newVehicle.name}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, name: e.target.value })
                }
                placeholder="e.g., Van, Truck, Mini"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label
                htmlFor="vehicleDescription"
                className="text-gray-300 mb-2"
              >
                Description *
              </Label>
              <Textarea
                id="vehicleDescription"
                value={newVehicle.description}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, description: e.target.value })
                }
                placeholder="Brief description of the vehicle type"
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vehicleCapacity" className="text-gray-300 mb-2">
                Capacity
              </Label>
              <Input
                id="vehicleCapacity"
                value={newVehicle.capacity}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, capacity: e.target.value })
                }
                placeholder="e.g., 1500 kg"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsVehicleModalOpen(false);
                setNewVehicle({ name: '', description: '', capacity: '' });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddVehicle} className="primary-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
