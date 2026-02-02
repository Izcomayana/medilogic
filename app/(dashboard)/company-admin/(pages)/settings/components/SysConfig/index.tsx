import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Truck, Flag, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { VehicleTypeTab } from './components/VehicleTypes';
// import { PriorityLevelsTab } from './components/PriorityLevels';
import { ShiftWindowsTab } from './components/ShiftWindows';
import { ZonesTab } from './components/Zones';

type SysConfigProps = ReturnType<typeof useSysConfig>;

export function SystemConfigTab({
  configTab,
  setConfigTab,
  vehicleTypes,
  priorityLevels,
  shiftWindows,
  zones,
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
                className="flex items-center gap-1 p-1 md:gap-2 md:p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white hover:bg-gray-700 transition-all rounded-md"
              >
                <Truck className="h-4 w-4" />
                <span className="hidden md:inline text-xs lg:text-base">
                  Vehicle Types
                </span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {vehicleTypes.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="priority-levels"
                className="flex items-center gap-1 p-1 md:gap-2 md:p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <Flag className="h-4 w-4" />
                <span className="hidden md:inline text-xs lg:text-base">
                  Priority Levels
                </span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {priorityLevels.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="shift-windows"
                className="flex items-center gap-1 p-1 md:gap-2 md:p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden md:inline text-xs lg:text-base">
                  Shift Windows
                </span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {shiftWindows.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="zones"
                className="flex items-center gap-1 p-1 md:gap-2 md:p-2 data-[state=active]:bg-[#15941f] data-[state=active]:text-white rounded-md hover:bg-gray-700 transition-all"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden md:inline text-xs lg:text-base">
                  Zones
                </span>
                <Badge className="ml-auto bg-gray-700 text-white">
                  {zones.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <VehicleTypeTab {...sysConfigState} />

            {/* <PriorityLevelsTab {...sysConfigState} /> */}

            <ShiftWindowsTab {...sysConfigState} />

            <ZonesTab {...sysConfigState} />
          </Tabs>
        </div>
      </TabsContent>
    </>
  );
}
