import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSupport } from '@/hooks/useSupport';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

type CreateTicketProps = ReturnType<typeof useSupport>;

export function CreateTicket({
  showCreateModal,
  setShowCreateModal,
  formData,
  setFormData,
  handleCreateTicket,
  creating,
}: CreateTicketProps) {
  return (
    <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new internal support ticket
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="text-gray-300 text-sm mb-2 block">Subjetc</Label>
            <Input
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="Ticket subject"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <Label className="text-gray-300 text-sm mb-2 block">
              Message *
            </Label>
            <Textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Describe the issue or request..."
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowCreateModal(false)}
            className="text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTicket}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {creating ? <Spinner className="mx-10" /> : 'Create Ticket'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
