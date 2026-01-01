import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useAuth } from '@/components/auth';

export type Message = {
  id: string;
  ticketId: string;
  sender: string;
  senderId?: string;
  senderType: 'admin' | 'user' | string;
  sendeRole?: string;
  message: string;
  timestamp: string;
};

export type Ticket = {
  id: string;

  user: {
    id: string;
    name: string;
    role: string; // "admin" | "user" | etc
  };

  organization: {
    id: string;
    name: string;
  } | null;

  status: string;
  created_at: string;
  updated_at: string;

  // replies endpoint returns an array of this structure (currently empty)
  replies: {
    id: string;
    admin?: {
      id: string;
      name: string;
      role?: string;
    } | null;
    message: string;
    created_at: string;
  }[];

  subject: string;

  // messages endpoint & inline messages return this structure
  messages: {
    id: string;
    ticket_id: string;
    sender: {
      id: string;
      name: string;
      role: string; // "admin" | "user"
    };
    message: string;
    created_at: string;
  }[];
};

export type ApiMessage = {
  id: string;
  ticket_id: string;
  sender: {
    id: string;
    name: string;
    role: string;
  };
  message: string;
  created_at: string;
};

export function useSupport() {
  const [creating, setCreating] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [ticketPendingDelete, setTicketPendingDelete] = useState<string | null>(
    null
  );
  const [ticketPendingStatus, setTicketPendingStatus] = useState<{
    id: string;
    status: string;
  } | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [rawMessages, setRawMessages] = useState<Message[]>([]);
  const [rawReplies, setRawReplies] = useState<Message[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const { role } = useAuth();
  const authorizedRequest = useAuthorizedRequest();

  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const handleCreateTicket = async () => {
    if (!formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setCreating(true);

      const payload = {
        subject: formData.subject,
        message: formData.message,
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
            subject: createdTicket.subject,
            createdBy: createdTicket.user?.name || 'Unknown User',
            userType: createdTicket.user?.role || 'User',
            status: createdTicket.status || 'open',
            lastUpdated: createdTicket.created_at,
            messages: createdTicket.messages?.length || 0,
          },
          ...prev,
        ]);
      }, 'Failed to create support ticket');

      toast.success('Support ticket created successfully');

      // Reset form + close modal
      setFormData({
        subject: '',
        message: '',
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
          subject: t.subject,
          createdBy: t.user?.name || 'Unknown User',
          userType: t.user?.role || 'User',
          status: t.status || 'open',
          lastUpdated: t.updated_at || t.created_at,
          priority: 'Medium',
          messages:
  (t.messages?.length || 0) +
  (t.replies?.length || 0),
          // messages: t.messages?.length || 0,
          organizationId: t.organization?.id ?? t.organization_id ?? null,
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
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      ticket.id.toLowerCase().includes(search) ||
      ticket.status.toLowerCase().includes(search) ||
      ticket.createdBy?.toLowerCase().includes(search) ||
      (role === 'super_admin' &&
        ticket.organizationId?.toString().toLowerCase().includes(search));

    const matchesStatus =
      statusFilter === 'all' ||
      ticket.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === 'open').length;
  const resolvedTickets = tickets.filter((t) => t.status === 'resolved').length;
  const inProgress = tickets.filter((t) => t.status === 'in_progress').length;

  const handleDeleteTicket = async () => {
    if (!ticketPendingDelete) return;

    try {
      await authorizedRequest(async (token) => {
        await api.delete(`/support/tickets/${ticketPendingDelete}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }, 'fail to delete');

      toast.success('Ticket deleted successfully');

      // Refresh from backend
      fetchTickets();
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'Failed to delete ticket');
    } finally {
      setTicketPendingDelete(null);
    }
  };

  const handleUpdateStatus = async (ticketId: string, newStatus: string) => {
    if (!ticketId) return;
    try {
      await authorizedRequest(async (token) => {
        await api.patch(
          `/support/tickets/${ticketId}/status`,
          {}, // body empty, status passed as query param
          {
            params: { status: newStatus },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }, 'failed to update ticket status');
      toast.success('Ticket status updated');
      // refresh list
      await fetchTickets();
    } catch (err: any) {
      console.error('Error updating status:', err);
      toast.error(err?.response?.data?.detail || 'Failed to update status');
    } finally {
      setTicketPendingStatus(null);
    }
  };

  const handleCreateReply = async (ticketId: string, message: string) => {
    if (!message.trim()) {
      toast.error('Reply message cannot be empty');
      return;
    }

    try {
      await authorizedRequest(async (token) => {
        await api.post(
          '/support/replies',
          { ticket_id: ticketId, message },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }, 'Failed to send reply');

      toast.success('Reply sent');

      // Refresh the ticket thread
      await fetchTicketById(ticketId);
    } catch (err: any) {
      console.error('Error sending reply:', err);
      toast.error(err?.response?.data?.detail || 'Failed to send reply');
    }
  };

  // ticket
  const fetchTicketById = async (ticketId: string) => {
    try {
      setLoadingTicket(true);

      await authorizedRequest(async (token) => {
        const res = await api.get(`/support/tickets/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSelectedTicket(res.data);
        console.log('selected ticket:', selectedTicket);
      }, 'Failed to fetch ticket');
    } catch (error: any) {
      console.error('Error fetching ticket:', error);
      toast.error(error?.response?.data?.detail || 'Failed to fetch ticket');
    } finally {
      setLoadingTicket(false);
    }
  };

  const mapApiMessageToUi = (msg: ApiMessage): Message => ({
    id: msg.id,
    ticketId: msg.ticket_id,
    sender: msg.sender.name,
    senderId: msg.sender.id,
    senderType: msg.sender.role === 'admin' ? 'admin' : 'user',
    sendeRole: msg.sender.role,
    message: msg.message,
    timestamp: msg.created_at,
  });

  const fetchMessagesByTicketId = async (ticketId: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.get<ApiMessage[]>(
          `/support/tickets/${ticketId}/messages`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRawMessages(res.data.map(mapApiMessageToUi));
      }, 'fail to get messages');
    } catch (err) {
      console.error('fetchMessagesByTicketId error', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchRepliesByTicketId = async (ticketId: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.get(`/support/tickets/${ticketId}/replies`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = res.data.map((reply: any) => ({
          id: reply.id,
          ticketId,
          sender: reply.admin?.name ?? 'Admin',
          senderId: reply.admin?.id,
          senderType: 'admin',
          sendeRole: reply.admin.role,
          message: reply.message,
          timestamp: reply.created_at,
        }));

        setRawReplies(formatted);
      }, 'fail to get replies');
    } catch (err) {
      console.error('Reply fetch error', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const messages = useMemo(() => {
    const merged = [...rawMessages, ...rawReplies];

    return merged.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [rawMessages, rawReplies]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createReply = async (ticketId: string, message: string) => {
    if (!message.trim()) return;

    try {
      await authorizedRequest(async (token) => {
        const res = await api.post(
          '/support/replies',
          { ticket_id: ticketId, message },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const newReply = {
          id: res.data.id,
          ticketId: res.data.ticket_id,
          sender: res.data.admin?.name || 'Admin',
          senderId: res.data.admin?.id,
          senderType: 'admin',
          senderRole: res.data.admin?.role,
          message: res.data.message,
          timestamp: res.data.created_at,
        };

        setNewMessage('');
        setRawReplies((prev) => [...prev, newReply]);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        toast.success('Reply sent!');
      }, 'Failed to send reply');
    } catch (err: any) {
      console.error('Create reply error', err);
      toast.error(err?.response?.data?.detail || 'Unable to send reply');
    }
  };

  const createMessage = async (ticketId: string, message: string) => {
    if (!message.trim()) return;

    try {
      await authorizedRequest(async (token) => {
        const res = await api.post(
          '/support/messages',
          { ticket_id: ticketId, message },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // convert API response → UI message
        const newMessageObj: Message = {
          id: res.data.id,
          ticketId: res.data.ticket_id,
          sender: res.data.sender.name,
          senderId: res.data.sender.id,
          senderType: res.data.sender.role === 'admin' ? 'admin' : 'user',
          message: res.data.message,
          timestamp: res.data.created_at,
        };

        // append to adminMessages OR userReplies depending on who sent it
        // but since createMessage is used by *all roles*, it should go to messages[]
        setRawMessages((prev) => [...prev, newMessageObj]);

        // auto scroll after adding
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);

        toast.success('Message sent!');
      }, 'fail to send a message');
    } catch (err: any) {
      console.error('createMessage error:', err);
      toast.error(err?.response?.data?.detail || 'Failed to send message');
    }
  };

  const updateMessage = async (messageId: string, newText: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.patch(
          `/support/messages/${messageId}?message_text=${encodeURIComponent(newText)}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updated = res.data;

        // update ONLY rawMessages (because replies cannot be edited)
        setRawMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, message: updated.message } : m
          )
        );

        return updated;
      }, 'Failed to update message');
    } catch (err) {
      console.error('Error updating message:', err);
      throw err;
    }
  };

  const updateReply = async (replyId: string, newText: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.patch(
          `/support/replies/${replyId}`,
          { message: newText },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updated = res.data;

        // Update local reply list
        setRawReplies((prev) =>
          prev.map((r) =>
            r.id === replyId ? { ...r, message: updated.message } : r
          )
        );

        return updated;
      }, 'Failed to update reply');
    } catch (err) {
      console.error('Error updating reply:', err);
      throw err;
    }
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
    orgFilter,
    setOrgFilter,
    sortBy,
    setSortBy,
    formData,
    setFormData,
    handleCreateTicket,
    selectedTicket,
    loadingTicket,
    fetchTicketById,
    setSelectedTicket,
    ticketPendingDelete,
    setTicketPendingDelete,
    handleDeleteTicket,
    filteredTickets,
    totalTickets,
    openTickets,
    resolvedTickets,
    inProgress,
    ticketPendingStatus,
    setTicketPendingStatus,
    handleUpdateStatus,
    handleCreateReply,

    // ticket
    loadingMessages,
    messages,
    fetchMessagesByTicketId,
    fetchRepliesByTicketId,
    messagesEndRef,
    newMessage,
    setNewMessage,
    createReply,
    createMessage,
    updateMessage,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
    updateReply,
  };
}
