'use client';

import { AlertCircle, CheckCircle, Clock, Inbox } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { useSupport } from '@/hooks/useSupport';
import { SupportFilters } from './components/Filters';
import { CreateTicket } from './components/Create';
// import { TicketDetailsDialog } from './components/Ticket';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { UpdateStatusDialog } from './components/Update';
import { TicketsTable } from './components/Table';

export default function SupportPage() {
  const supportState = useSupport();

  const {
    handleDeleteTicket,
    totalTickets,
    openTickets,
    resolvedTickets,
    inProgress,
    ticketPendingDelete,
    setTicketPendingDelete,
    ticketPendingStatus,
    setTicketPendingStatus,
    handleUpdateStatus,
  } = supportState;

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
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {inProgress}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <SupportFilters {...supportState} />

        <TicketsTable {...supportState} />
      </main>

      <CreateTicket {...supportState} />

      {/* <TicketDetailsDialog
        open={!!selectedTicket}
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      /> */}

      <AlertDialog open={!!ticketPendingDelete}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Ticket?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this ticket? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTicketPendingDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTicket}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpdateStatusDialog
        open={!!ticketPendingStatus}
        currentStatus={ticketPendingStatus?.status ?? 'open'}
        onCancel={() => setTicketPendingStatus(null)}
        onSave={(newStatus) => {
          if (!ticketPendingStatus) return;
          handleUpdateStatus(ticketPendingStatus.id, newStatus);
        }}
      />
    </div>
  );
}
