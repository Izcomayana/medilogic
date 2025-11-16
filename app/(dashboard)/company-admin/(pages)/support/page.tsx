'use client';

import {
  MessageSquare,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Inbox,
  MoreHorizontal,
  Eye,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { useSupport } from '@/hooks/useSupport';
import { SupportFilters } from './components/Filters';
import { CreateTicket } from './components/Create';
import { formatDateTime } from '@/utils/datetime';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SupportPage() {
  const supportState = useSupport();
  const {
    handleDeleteTicket,
    sortedTickets,
    totalTickets,
    openTickets,
    resolvedTickets,
    pendingReply,
    closedTickets,
  } = supportState;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge className="bg-blue-600 text-white">Open</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>;
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
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Support Tickets"
        subtitle="Manage customer support tickets and conversations"
      />

      <main className="flex-1 p-4">
        {/* Support Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Tickets</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {totalTickets}
                  </p>
                </div>
                <Inbox className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Open Tickets</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {openTickets}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Resolved</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {resolvedTickets}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Reply</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {pendingReply}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Closed</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {closedTickets}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <SupportFilters {...supportState} />

        {/* Tickets Table */}
        <Card className="dashboard-card">
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
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-300">
                        Created By
                      </TableHead>
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
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        <TableCell className="text-gray-300">
                          <span className="text-sm">{ticket.createdBy}</span>
                          <p className="text-xs text-gray-500">
                            {ticket.userType}
                          </p>
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>
                          {getPriorityBadge(ticket.priority)}
                        </TableCell>
                        <TableCell className="text-gray-300 text-sm">
                          {formatDateTime(ticket.lastUpdated)}
                        </TableCell>
                        <TableCell className="text-gray-300 text-sm text-center">
                          {ticket.messages}
                        </TableCell>
                        <TableCell>
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
                              <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-600"
                              // onClick={() => handleEditRecord(record)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-600"
                              // onClick={() => handleEditRecord(record)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-600"
                                onClick={() => handleDeleteTicket}
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
            )}
          </CardContent>
        </Card>
      </main>

      <CreateTicket {...supportState} />
      
    </div>
  );
}
