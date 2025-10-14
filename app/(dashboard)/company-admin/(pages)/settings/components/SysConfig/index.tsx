import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import {
  Trash2,
  Truck,
  Flag,
  Clock,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { VehicleTypeTab } from './components/VehicleTypes';
import { PriorityLevelsTab } from './components/PriorityLevels';
import { ShiftWindowsTab } from './components/ShiftWindows';
import { ZonesTab } from './components/Zones';

type SysConfigProps = ReturnType<typeof useSysConfig>;

export function SystemConfigTab({
  configTab,
  setConfigTab,
  deleteConfirmDialog,
  setDeleteConfirmDialog,
  vehicleTypes,
  priorityLevels,
  shiftWindows,
  zones,
  handleDeleteConfig,
}: SysConfigProps) {
  const sysConfigState = useSysConfig();

  return (
    <>
      {/* System Configuration Tab */}
      <TabsContent value="system" className="p-6 space-y-6">
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              System Configuration
            </h3>
            <p className="text-sm text-gray-400">
              Manage key operational configurations that affect trips,
              assignments, and logistics workflows
            </p>
          </div>

          <Tabs
            value={configTab}
            onValueChange={setConfigTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 gap-2 bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="vehicle-types"
                className="flex items-center justify-start gap-2 p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white hover:bg-gray-700 transition-all rounded-md"
              >
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Vehicle Types</span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {vehicleTypes.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="priority-levels"
                className="flex items-center gap-2 p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">Priority Levels</span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {priorityLevels.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="shift-windows"
                className="flex items-center gap-2 p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Shift Windows</span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {shiftWindows.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="zones"
                className="flex items-center gap-2 p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Zones</span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {zones.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <VehicleTypeTab {...sysConfigState} />

            <PriorityLevelsTab {...sysConfigState} />

            <ShiftWindowsTab {...sysConfigState} />

            <ZonesTab {...sysConfigState} />
          </Tabs>
        </div>
      </TabsContent>

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
