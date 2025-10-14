import { TabsContent } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { Trash2, Plus, Truck, AlertTriangle } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

type VehicleTypeProps = ReturnType<typeof useSysConfig>;

export function VehicleTypeTab({
  // isLoadingVehicleTypes,
  setIsVehicleModalOpen,
  vehicleTypes,
  setDeleteConfirmDialog,
  isVehicleModalOpen,
  newVehicle,
  setNewVehicle,
  handleAddVehicle,
  deleteConfirmDialog,
  handleDeleteConfig,
}: VehicleTypeProps) {
  return (
    <>
      <TabsContent value="vehicle-types" className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row items-start lg:items-center gap-4 lg:gap-0 justify-between border-b border-gray-700 pb-1">
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
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsVehicleModalOpen(false);
                setNewVehicle({ name: '' });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddVehicle}
              className="primary-button"
              disabled={!newVehicle.name}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Configuration Confirmation */}
      <AlertDialog
        open={deleteConfirmDialog.open}
        onOpenChange={(open) =>
          !open &&
          setDeleteConfirmDialog({ open: false, type: '', id: '', name: '' })
        }
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Delete Configuration
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete{' '}
              <strong className="text-white">{deleteConfirmDialog.name}</strong>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfig}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
