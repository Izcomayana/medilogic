import { TabsContent } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { Trash2, Plus, Clock } from 'lucide-react';
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

type ShiftWindowProps = ReturnType<typeof useSysConfig>;

export function ShiftWindowsTab({
  setIsShiftModalOpen,
  shiftWindows,
  setDeleteConfirmDialog,
  isShiftModalOpen,
  newShift,
  setNewShift,
  handleAddShift,
}: ShiftWindowProps) {
  return (
    <>
      <TabsContent value="shift-windows" className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-700 pb-1">
          <div>
            <h4 className="text-white font-medium">Shift Windows</h4>
            <p className="text-sm text-gray-400">
              Define operational shift times and zones
            </p>
          </div>
          <Button
            onClick={() => setIsShiftModalOpen(true)}
            className="primary-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Shift Window
          </Button>
        </div>

        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Start Time</TableHead>
                <TableHead className="text-gray-300">End Time</TableHead>
                <TableHead className="text-gray-300">Zone</TableHead>
                <TableHead className="text-gray-300 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shiftWindows.map((shift) => (
                <TableRow key={shift.id} className="border-gray-700">
                  <TableCell className="font-medium text-white">
                    {shift.name}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {shift.startTime}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {shift.endTime}
                  </TableCell>
                  <TableCell className="text-gray-400">{shift.zone}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setDeleteConfirmDialog({
                          open: true,
                          type: 'shift',
                          id: shift.id,
                          name: shift.name,
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

      {/* Add Shift Window Modal */}
      <Dialog open={isShiftModalOpen} onOpenChange={setIsShiftModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#15941f]" />
              Add Shift Window
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Define a new operational shift window.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="shiftName" className="text-gray-300 mb-2">
                Name *
              </Label>
              <Input
                id="shiftName"
                value={newShift.name}
                onChange={(e) =>
                  setNewShift({ ...newShift, name: e.target.value })
                }
                placeholder="e.g., Morning Shift, Night Shift"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime" className="text-gray-300 mb-2">
                  Start Time *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newShift.startTime}
                  onChange={(e) =>
                    setNewShift({ ...newShift, startTime: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-gray-300 mb-2">
                  End Time *
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newShift.endTime}
                  onChange={(e) =>
                    setNewShift({ ...newShift, endTime: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shiftZone" className="text-gray-300 mb-2">
                Zone (Optional)
              </Label>
              <Input
                id="shiftZone"
                value={newShift.zone}
                onChange={(e) =>
                  setNewShift({ ...newShift, zone: e.target.value })
                }
                placeholder="e.g., Central Lagos, All Zones"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsShiftModalOpen(false);
                setNewShift({ name: '', startTime: '', endTime: '', zone: '' });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddShift} className="primary-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Shift Window
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
