'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Send,
  Download,
  Trash2,
  Clock,
  Paperclip,
  MoreVertical,
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import Link from 'next/link';

// Mock ticket data
const mockTicket = {
  id: 'TCK-0921',
  title: 'App not loading',
  createdBy: 'John Driver',
  userType: 'Driver',
  status: 'Pending',
  priority: 'Medium',
  createdDate: '2025-10-20',
  createdTime: '14:30',
  lastUpdated: '2025-10-24 10:45',
  description: 'The mobile app keeps crashing when I try to login',
};

const mockMessages = [
  {
    id: 1,
    sender: 'John Driver',
    senderType: 'user',
    message: 'My app is not loading at all. I get a white screen.',
    timestamp: '2025-10-20 14:30',
    files: null,
  },
  {
    id: 2,
    sender: 'Admin Support',
    senderType: 'admin',
    message:
      'Thank you for reporting this issue. Can you please provide your device details and OS version?',
    timestamp: '2025-10-20 15:15',
    files: null,
  },
  {
    id: 3,
    sender: 'John Driver',
    senderType: 'user',
    message:
      "I'm using iPhone 14 Pro with iOS 17. This started happening after the latest update.",
    timestamp: '2025-10-20 15:45',
    files: null,
  },
  {
    id: 4,
    sender: 'Admin Support',
    senderType: 'admin',
    message:
      "We've identified the issue with iOS 17. A fix is being deployed now. Can you try clearing your app cache?",
    timestamp: '2025-10-20 16:20',
    files: null,
  },
  {
    id: 5,
    sender: 'John Driver',
    senderType: 'user',
    message:
      'Great! After clearing the cache and restarting the app, it works perfectly now. Thank you!',
    timestamp: '2025-10-20 16:50',
    files: null,
  },
];

export default function TicketDetailsPage(
  {
    // params,
  }: {
    params: { id: string };
  }
) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [ticketStatus, setTicketStatus] = useState(mockTicket.status);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    const message = {
      id: messages.length + 1,
      sender: 'Admin Support',
      senderType: 'admin' as const,
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      files: null,
    };

    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Message sent');
  };

  const handleStatusChange = (newStatus: string) => {
    setTicketStatus(newStatus);
    setShowStatusModal(false);
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  const handleDeleteTicket = () => {
    toast.success('Ticket deleted successfully');
    setShowDeleteConfirm(false);
  };

  const handleDownloadTranscript = () => {
    const transcript = messages
      .map((msg) => `[${msg.timestamp}] ${msg.sender}: ${msg.message}`)
      .join('\n\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${mockTicket.id}-transcript.txt`;
    a.click();
    toast.success('Transcript downloaded');
  };

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
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <Link href="/admin/support">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">{mockTicket.id}</h1>
          <p className="text-sm text-gray-400">{mockTicket.title}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-800 border-gray-700"
          >
            <DropdownMenuItem
              onClick={() => setShowStatusModal(true)}
              className="text-gray-300"
            >
              <Clock className="h-4 w-4 mr-2" />
              Change Status
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDownloadTranscript}
              className="text-gray-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Transcript
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-400"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <Label className="text-gray-400 text-xs">Status</Label>
              <div className="mt-2">{getStatusBadge(ticketStatus)}</div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <Label className="text-gray-400 text-xs">Priority</Label>
              <div className="mt-2">
                {getPriorityBadge(mockTicket.priority)}
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <Label className="text-gray-400 text-xs">Created By</Label>
              <p className="text-white font-medium text-sm mt-2">
                {mockTicket.createdBy}
              </p>
              <p className="text-gray-500 text-xs">{mockTicket.userType}</p>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <Label className="text-gray-400 text-xs">Created Date</Label>
              <p className="text-white font-medium text-sm mt-2">
                {mockTicket.createdDate}
              </p>
              <p className="text-gray-500 text-xs">{mockTicket.createdTime}</p>
            </CardContent>
          </Card>
        </div>

        {/* Messages Container */}
        <Card className="dashboard-card mb-6 flex flex-col h-[500px]">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-lg">
              Conversation ({messages.length} messages)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.senderType === 'admin'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-700 text-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{msg.sender}</p>
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${msg.senderType === 'admin' ? 'text-blue-100' : 'text-gray-400'}`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reply Box */}
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply here..."
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex gap-2 justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Paperclip className="h-4 w-4 mr-1" />
                  Attach File
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Status Change Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Change Ticket Status</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the status of this support ticket
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label className="text-gray-300 text-sm mb-2 block">
              New Status
            </Label>
            <Select value={ticketStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Ticket?</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this ticket? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTicket}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
