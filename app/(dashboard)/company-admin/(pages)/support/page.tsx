'use client';

import { useState } from 'react';
import {
  MessageSquare,
  Filter,
  Search,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Inbox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { toast } from 'sonner';
// import Link from "next/link"
import { SidebarTrigger } from '@/components/ui/sidebar';
// import { PageHeader } from '@/app/(dashboard)/components/PageHeader';

// Mock data
const mockTickets = [
  {
    id: 'TCK-0921',
    title: 'App not loading',
    createdBy: 'John Driver',
    userType: 'Driver',
    status: 'Pending',
    lastUpdated: '5m ago',
    priority: 'Medium',
    messages: 3,
  },
  {
    id: 'TCK-0889',
    title: 'Invoice help',
    createdBy: 'Sarah Client',
    userType: 'Client',
    status: 'Resolved',
    lastUpdated: '1 day ago',
    priority: 'Low',
    messages: 2,
  },
  {
    id: 'TCK-0803',
    title: 'Lost delivery proof',
    createdBy: 'Mike Transport',
    userType: 'Driver',
    status: 'Open',
    lastUpdated: '2 days ago',
    priority: 'High',
    messages: 5,
  },
  {
    id: 'TCK-0776',
    title: 'Payment not received',
    createdBy: 'Alex Admin',
    userType: 'Company Admin',
    status: 'Pending',
    lastUpdated: '3 hours ago',
    priority: 'High',
    messages: 4,
  },
  {
    id: 'TCK-0745',
    title: 'Route optimization request',
    createdBy: 'Emma Driver',
    userType: 'Driver',
    status: 'Closed',
    lastUpdated: '1 week ago',
    priority: 'Low',
    messages: 1,
  },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'Medium',
  });

  const handleCreateTicket = () => {
    if (!formData.title || !formData.category || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newTicket = {
      id: `TCK-${Math.floor(Math.random() * 10000)}`,
      title: formData.title,
      createdBy: 'Admin User',
      userType: 'Company Admin',
      status: 'Open',
      lastUpdated: 'now',
      priority: formData.priority,
      messages: 0,
    };

    setTickets([newTicket, ...tickets]);
    setFormData({
      title: '',
      category: '',
      description: '',
      priority: 'Medium',
    });
    setShowCreateModal(false);
    toast.success('Support ticket created successfully');
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(tickets.filter((t) => t.id !== ticketId));
    toast.success('Ticket deleted successfully');
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      ticket.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesUserType =
      userTypeFilter === 'all' || ticket.userType === userTypeFilter;
    const matchesPriority =
      priorityFilter === 'all' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesUserType && matchesPriority;
  });

  const sortedTickets = [...filteredTickets];
  if (sortBy === 'oldest') {
    sortedTickets.reverse();
  } else if (sortBy === 'priority') {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    sortedTickets.sort(
      (a, b) =>
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
    );
  }

  // Calculate stats
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === 'Open').length;
  const resolvedTickets = tickets.filter((t) => t.status === 'Resolved').length;
  const pendingReply = tickets.filter((t) => t.status === 'Pending').length;
  const closedTickets = tickets.filter((t) => t.status === 'Closed').length;

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
      {/* <PageHeader
              title="Compliance Overview"
              subtitle="Manage organizational compliance records and audits"
            /> */}
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">Support Tickets</h1>
          <p className="text-sm text-gray-400">
            Manage customer support tickets and conversations
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </header>

      <main className="flex-1 p-6">
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

        {/* Filters and Search */}
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters ({sortedTickets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by ticket ID or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block text-sm">
                    Status
                  </Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block text-sm">
                    User Type
                  </Label>
                  <Select
                    value={userTypeFilter}
                    onValueChange={setUserTypeFilter}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="Driver">Driver</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                      <SelectItem value="Company Admin">
                        Company Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block text-sm">
                    Priority
                  </Label>
                  <Select
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block text-sm">
                    Sort By
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="priority">Highest Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                      <TableHead className="text-gray-300">Ticket ID</TableHead>
                      <TableHead className="text-gray-300">Title</TableHead>
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
                        <TableCell className="font-medium text-white">
                          {ticket.id}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {ticket.title}
                        </TableCell>
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
                          {ticket.lastUpdated}
                        </TableCell>
                        <TableCell className="text-gray-300 text-sm text-center">
                          {ticket.messages}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {/* <Link href={`/admin/support/tickets/${ticket.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </Link> */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteTicket(ticket.id)}
                              className="border-red-600 text-red-400 hover:bg-red-900/20"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
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

      {/* Create Ticket Modal */}
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
              <Label className="text-gray-300 text-sm mb-2 block">
                Title *
              </Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Ticket title"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label className="text-gray-300 text-sm mb-2 block">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Billing">Billing</SelectItem>
                  <SelectItem value="Delivery">Delivery</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 text-sm mb-2 block">
                Description *
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the issue or request..."
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-gray-300 text-sm mb-2 block">
                Priority *
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateTicket}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
