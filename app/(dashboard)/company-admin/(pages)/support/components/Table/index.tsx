import { Card, CardContent } from '@/components/ui/card';
import { useSupport } from '@/hooks/useSupport';
import {
  MessageSquare,
  Trash2,
  MoreHorizontal,
  Eye,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/utils/datetime';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

type TicketsTableProps = ReturnType<typeof useSupport>;

export function TicketsTable({
  sortedTickets,
  setTicketPendingDelete,
  setTicketPendingStatus,
  // fetchTicketById,
}: TicketsTableProps) {
  const router = useRouter();

  const handleOpenTicket = (id: string) => {
    router.push(`/company-admin/support/${id}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge className="bg-blue-600 text-white">Open</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-600 text-white">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-gray-600 text-white">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <Badge className="bg-red-600 text-white">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-600 text-white">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-600 text-white">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Card className="dashboard-card py-0 pt-4">
      <CardContent className="p-0">
        {sortedTickets.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No tickets found
            </h3>
            <p className="text-gray-400">
              No tickets match your search and filter criteria
            </p>
          </div>
        ) : (
          <>
            <div className="flex pl-4">
              <p className="text-xs text-gray-400 italic">
                Click any ticket row to open its conversation
              </p>
            </div>
            <div className="rounded-md border border-gray-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Created By</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Priority</TableHead>
                    <TableHead className="text-gray-300">
                      Last Updated
                    </TableHead>
                    <TableHead className="text-gray-300">Messages</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTickets.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      onClick={() => handleOpenTicket(ticket.id)}
                      className="border-gray-700 cursor-pointer transition-colors hover:bg-gray-800"
                    >
                      <TableCell className="text-gray-300">
                        <span className="text-sm">{ticket.createdBy}</span>
                        <p className="text-xs text-gray-500">
                          {ticket.userType}
                        </p>
                      </TableCell>

                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>

                      <TableCell className="text-gray-300 text-sm">
                        {formatDateTime(ticket.lastUpdated)}
                      </TableCell>

                      <TableCell className="text-gray-300 text-sm text-center">
                        {ticket.messages}
                      </TableCell>

                      <TableCell
                        onClick={(e) => e.stopPropagation()} // 👈 prevents row navigation
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="end"
                            className="bg-gray-700 border-gray-600"
                          >
                            {/* <DropdownMenuItem
                            className="text-gray-300 hover:bg-gray-600"
                            onClick={() => { fetchTicketById(ticket.id); }}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </DropdownMenuItem> */}

                            <DropdownMenuItem
                              className="text-gray-300 hover:bg-gray-600"
                              onClick={() =>
                                setTicketPendingStatus({
                                  id: ticket.id,
                                  status: ticket.status,
                                })
                              }
                            >
                              <FileText className="h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-gray-300 hover:bg-gray-600"
                              onClick={() => setTicketPendingDelete(ticket.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
