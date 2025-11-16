import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

export function TicketDetailsDialog({ open, onClose, ticket }: any) {
  if (!ticket) return null;

  const created = format(new Date(ticket.created_at), 'PPpp');
  const updated = format(new Date(ticket.updated_at), 'PPpp');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            Ticket Details
          </DialogTitle>
          <DialogDescription>Ticket ID: {ticket.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* General Info */}
          <section className="space-y-3">
            <h3 className="font-semibold text-lg">General Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="capitalize">{ticket.status}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Created At</p>
                <p>{created}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Updated At</p>
                <p>{updated}</p>
              </div>
            </div>
          </section>

          {/* User */}
          <section className="space-y-3">
            <h3 className="font-semibold text-lg">User</h3>
            <div className="text-sm">
              <p>
                <span className="text-muted-foreground">Name:</span>{' '}
                {ticket.user?.name}
              </p>
              <p>
                <span className="text-muted-foreground">Role:</span>{' '}
                {ticket.user?.role}
              </p>
            </div>
          </section>

          {/* Organization */}
          <section className="space-y-3">
            <h3 className="font-semibold text-lg">Organization</h3>
            <div className="text-sm">
              <p>{ticket.organization?.name}</p>
            </div>
          </section>

          {/* Messages */}
          <section className="space-y-3">
            <h3 className="font-semibold text-lg">Messages</h3>

            {ticket.messages.length === 0 && (
              <p className="text-sm text-muted-foreground">No messages yet.</p>
            )}

            <div className="space-y-3">
              {ticket.messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className="p-3 rounded-lg border bg-muted/40 flex flex-col"
                >
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{msg.sender?.name}</span>
                    <span>{format(new Date(msg.created_at), 'PPpp')}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
