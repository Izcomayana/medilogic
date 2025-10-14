import { TabsContent } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { Trash2, Plus, MapPin } from 'lucide-react';
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

type ZonesProps = ReturnType<typeof useSysConfig>;

export function ZonesTab({
  setIsZoneModalOpen,
  zones,
  setDeleteConfirmDialog,
  isZoneModalOpen,
  newZone,
  setNewZone,
  handleAddZone,
}: ZonesProps) {
  return (
    <>
      <TabsContent value="zones" className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-700 pb-1">
          <div>
            <h4 className="text-white font-medium">Zones</h4>
            <p className="text-sm text-gray-400">
              Manage geographical service areas
            </p>
          </div>
          <Button
            onClick={() => setIsZoneModalOpen(true)}
            className="primary-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Zone
          </Button>
        </div>

        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Description</TableHead>
                <TableHead className="text-gray-300">Region</TableHead>
                <TableHead className="text-gray-300 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id} className="border-gray-700">
                  <TableCell className="font-medium text-white">
                    {zone.name}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {zone.description}
                  </TableCell>
                  <TableCell className="text-gray-400">{zone.region}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setDeleteConfirmDialog({
                          open: true,
                          type: 'zone',
                          id: zone.id,
                          name: zone.name,
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

      {/* Add Zone Modal */}
      <Dialog open={isZoneModalOpen} onOpenChange={setIsZoneModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#15941f]" />
              Add Zone
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new geographical service area.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="zoneName" className="text-gray-300 mb-2">
                Name *
              </Label>
              <Input
                id="zoneName"
                value={newZone.name}
                onChange={(e) =>
                  setNewZone({ ...newZone, name: e.target.value })
                }
                placeholder="e.g., Central Lagos, Victoria Island"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="zoneDescription" className="text-gray-300 mb-2">
                Description *
              </Label>
              <Textarea
                id="zoneDescription"
                value={newZone.description}
                onChange={(e) =>
                  setNewZone({ ...newZone, description: e.target.value })
                }
                placeholder="Brief description of the zone"
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="zoneRegion" className="text-gray-300 mb-2">
                Region *
              </Label>
              <Input
                id="zoneRegion"
                value={newZone.region}
                onChange={(e) =>
                  setNewZone({ ...newZone, region: e.target.value })
                }
                placeholder="e.g., Lagos Mainland, Lagos Island"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsZoneModalOpen(false);
                setNewZone({ name: '', description: '', region: '' });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddZone} className="primary-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
