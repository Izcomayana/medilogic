import { useState } from 'react';
import { toast } from 'sonner';

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

export function useSupport() {
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

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === 'Open').length;
  const resolvedTickets = tickets.filter((t) => t.status === 'Resolved').length;
  const pendingReply = tickets.filter((t) => t.status === 'Pending').length;
  const closedTickets = tickets.filter((t) => t.status === 'Closed').length;

  return {
    mockTickets,
    tickets,
    setTickets,
    showCreateModal,
    setShowCreateModal,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    userTypeFilter,
    setUserTypeFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    formData,
    setFormData,
    handleCreateTicket,
    handleDeleteTicket,
    filteredTickets,
    sortedTickets,
    totalTickets,
    openTickets,
    resolvedTickets,
    pendingReply,
    closedTickets,
  };
}
