import { TabsContent } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { useSysConfig } from '@/hooks/settings/useSysConfg';
import { Trash2, Plus, Flag } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PriorityLevelProps = ReturnType<typeof useSysConfig>;

export function PriorityLevelsTab({
  setIsPriorityModalOpen,
  priorityLevels,
  setDeleteConfirmDialog,
  isPriorityModalOpen,
  newPriority,
  setNewPriority,
  handleAddPriority,
}: PriorityLevelProps) {
  return (
    <>
      <TabsContent value="priority-levels" className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-700 pb-1">
          <div>
            <h4 className="text-white font-medium">Priority Levels</h4>
            <p className="text-sm text-gray-400">
              Configure urgency levels for deliveries
            </p>
          </div>
          <Button
            onClick={() => setIsPriorityModalOpen(true)}
            className="primary-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Priority Level
          </Button>
        </div>

        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Color</TableHead>
                <TableHead className="text-gray-300">Description</TableHead>
                <TableHead className="text-gray-300 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priorityLevels.map((priority) => (
                <TableRow key={priority.id} className="border-gray-700">
                  <TableCell className="font-medium text-white">
                    {priority.name}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${priority.color} text-white`}>
                      {priority.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {priority.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setDeleteConfirmDialog({
                          open: true,
                          type: 'priority',
                          id: priority.id,
                          name: priority.name,
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

      {/* Add Priority Level Modal */}
      <Dialog open={isPriorityModalOpen} onOpenChange={setIsPriorityModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-[#15941f]" />
              Add Priority Level
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new priority level for deliveries.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="priorityName" className="text-gray-300 mb-2">
                Name *
              </Label>
              <Input
                id="priorityName"
                value={newPriority.name}
                onChange={(e) =>
                  setNewPriority({ ...newPriority, name: e.target.value })
                }
                placeholder="e.g., Low, Medium, High, Critical"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="priorityColor" className="text-gray-300 mb-2">
                Color *
              </Label>
              <Select
                value={newPriority.color}
                onValueChange={(value) =>
                  setNewPriority({ ...newPriority, color: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="bg-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-500" />
                      Gray
                    </div>
                  </SelectItem>
                  <SelectItem value="bg-blue-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-blue-500" />
                      Blue
                    </div>
                  </SelectItem>
                  <SelectItem value="bg-yellow-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-500" />
                      Yellow
                    </div>
                  </SelectItem>
                  <SelectItem value="bg-orange-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-orange-500" />
                      Orange
                    </div>
                  </SelectItem>
                  <SelectItem value="bg-red-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-500" />
                      Red
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="priorityDescription"
                className="text-gray-300 mb-2"
              >
                Description *
              </Label>
              <Textarea
                id="priorityDescription"
                value={newPriority.description}
                onChange={(e) =>
                  setNewPriority({
                    ...newPriority,
                    description: e.target.value,
                  })
                }
                placeholder="Brief description of the priority level"
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsPriorityModalOpen(false);
                setNewPriority({
                  name: '',
                  color: 'bg-gray-500',
                  description: '',
                });
              }}
              className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddPriority} className="primary-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Priority Level
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
