import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
// import { useProfile } from './useProfile';
import { useAuthorizedRequest } from '@/hooks/useRequest';

export function useSupport() {
  const [creating, setCreating] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const authorizedRequest = useAuthorizedRequest();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'Medium',
  });

  const handleCreateTicket = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setCreating(true);

      const payload = {
        subject: formData.title,
        message: formData.description,
      };

      await authorizedRequest(async (token) => {
        const res = await api.post('/support/tickets', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const createdTicket = res.data;

        // Add the created ticket to UI list
        setTickets((prev) => [
          {
            id: createdTicket.id,
            title: createdTicket.subject,
            createdBy: createdTicket.user?.name || 'Unknown User',
            userType: createdTicket.user?.role || 'User',
            status: createdTicket.status || 'open',
            lastUpdated: createdTicket.created_at,
            priority: formData.priority,
            messages: createdTicket.messages?.length || 0,
          },
          ...prev,
        ]);
      }, 'Failed to create support ticket');

      toast.success('Support ticket created successfully');

      // Reset form + close modal
      setFormData({
        title: '',
        category: '',
        description: '',
        priority: 'Medium',
      });

      setShowCreateModal(false);
    } catch (error: any) {
      console.error('Error creating support ticket:', error);
      toast.error(
        error?.response?.data?.detail || 'Failed to create support ticket'
      );
    } finally {
      setCreating(false);
    }
  };

  const fetchTickets = async (skip = 0, limit = 20) => {
  try {
    setLoading(true);

    await authorizedRequest(async (token) => {
      const res = await api.get('/support/tickets', {
        params: { skip, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = res.data.items || [];

      // Normalize → UI format
      const normalized = items.map((t: any) => ({
        id: t.id,
        title: t.subject,
        createdBy: t.user?.name || 'Unknown User',
        userType: t.user?.role || 'User',
        status: t.status || 'open',
        lastUpdated: t.updated_at || t.created_at,
        priority: 'Medium', // backend has no priority — keep UI default
        messages: t.messages?.length || 0,
      }));

      setTickets(normalized);
    }, 'Failed to fetch tickets');
  } catch (error: any) {
    console.error('Error fetching tickets:', error);
    toast.error(error?.response?.data?.detail || 'Failed to fetch tickets');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTickets();
}, []);

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

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(tickets.filter((t) => t.id !== ticketId));
    toast.success('Ticket deleted successfully');
  };

  return {
    creating,
    tickets,
    setTickets,
    fetchTickets,
    loading,
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
