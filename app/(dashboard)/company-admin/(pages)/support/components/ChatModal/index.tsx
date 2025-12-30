'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { formatDateTime } from '@/utils/datetime';

import { useSupport } from '@/hooks/useSupport';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/components/auth';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function TicketChatModal({
  ticketId,
  open,
  onOpenChange,
}: {
  ticketId: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const {
    messages,
    newMessage,
    setNewMessage,
    messagesEndRef,
    selectedTicket,
    fetchTicketById,
    fetchMessagesByTicketId,
    fetchRepliesByTicketId,
    createReply,
    loadingTicket,
    loadingMessages,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
    updateMessage,
    updateReply,
  } = useSupport();

  const { user } = useProfile();
  const { role } = useAuth();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
      });
    }
  };

  React.useEffect(() => {
    if (!ticketId || !open) return;

    fetchTicketById(ticketId);
    fetchMessagesByTicketId(ticketId);
    fetchRepliesByTicketId(ticketId);
  }, [ticketId, open]);

  React.useEffect(() => {
    if (!loadingMessages) scrollToBottom();
  }, [loadingMessages]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  if (!open) return null;

  if (!selectedTicket || loadingTicket) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <p className="text-white">Loading ticket...</p>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-900 border-gray-700 lg:max-w-5xl max-h-[90vh] flex flex-col p-2">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle className="text-white">
              Ticket: {selectedTicket.id}
            </AlertDialogTitle>

            <AlertDialogCancel className="p-3">X</AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        <div className="overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="dashboard-card py-3">
              <CardContent className="px-3">
                <Label className="text-xs lg:text-sm">Status</Label>
                <Badge className="mt-2">{selectedTicket.status}</Badge>
              </CardContent>
            </Card>

            <Card className="dashboard-card py-3">
              <CardContent className="px-3">
                <Label className="text-xs lg:text-sm">Created By</Label>
                <p className="text-white mt-2 text-sm">
                  {selectedTicket.user.name}
                </p>
              </CardContent>
            </Card>

            <Card className="dashboard-card py-3">
              <CardContent className="px-3">
                <Label className="text-xs lg:text-sm">Created On</Label>
                <p className="text-white mt-2 text-sm">
                  {formatDateTime(selectedTicket.created_at)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="dashboard-card flex-1 flex flex-col overflow-auto py-3 gap-2">
            <CardHeader className="px-3">
              <CardTitle className="text-white">
                {selectedTicket.subject}
              </CardTitle>
            </CardHeader>

            <CardContent
              ref={scrollRef}
              className="flex-1 overflow-y-auto space-y-4 px-3"
            >
              {loadingMessages && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-2">
                      <div className="loader-bubble w-10 h-10 rounded-full bg-gray-700"></div>
                      <div className="flex flex-col gap-2">
                        <div className="loader-bubble w-40 h-3 rounded bg-gray-700"></div>
                        <div className="loader-bubble w-60 h-3 rounded bg-gray-700"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loadingMessages &&
                messages?.map((msg, index) => {
                  const isMe = msg.senderId === user?.user_id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={
                          isMe ? 'animate-from-right' : 'animate-from-left'
                        }
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div className="flex flex-col max-w-xs lg:max-w-md gap-1">
                          <p
                            className={`text-xs font-semibold px-4 ${isMe ? 'text-right text-blue-300' : 'text-left text-gray-400'}`}
                          >
                            {msg.sender}
                          </p>

                          <div
                            className={`rounded-lg shadow-md ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600'} px-3`}
                          >
                            {/* EDIT MODE OR READ MODE */}
                            {editingId === msg.id ? (
                              <>
                                <Textarea
                                  value={editingText}
                                  onChange={(e) =>
                                    setEditingText(e.target.value)
                                  }
                                  className="w-full bg-gray-800 border border-gray-600 text-white text-sm rounded p-2 mt-2"
                                  rows={3}
                                  autoFocus
                                />

                                {/* Save / Cancel (INSIDE the same message bubble so `msg` exists) */}
                                <div className="flex justify-end gap-2 text-xs mt-2 pr-2 pb-2">
                                  <Button
                                    onClick={() => setEditingId(null)}
                                    className="text-gray-400 text-gray-200 hover:bg-transparent"
                                    variant="ghost"
                                    size="sm"
                                  >
                                    Cancel
                                  </Button>

                                  <Button
                                    onClick={async () => {
                                      try {
                                        if (msg.senderType === 'admin') {
                                          await updateReply(
                                            msg.id,
                                            editingText
                                          );
                                        } else {
                                          await updateMessage(
                                            msg.id,
                                            editingText
                                          );
                                        }
                                        setEditingId(null);
                                      } catch (err) {
                                        console.log(err);
                                        // keep editing open on error (toast inside hook)
                                      }
                                    }}
                                    className="text-gray-700 hover:text-blue-300 font-medium bg-transparent hover:bg-transparent"
                                    size="sm"
                                  >
                                    Save
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <>
                                <p className="pt-3 text-sm leading-relaxed">
                                  {msg.message}
                                </p>

                                <div className="flex justify-between gap-4 items-center mt-2">
                                  {msg.senderId === user?.user_id && (
                                    <div className="flex justify-end pr-2">
                                      <Button
                                        onClick={() => {
                                          setEditingId(msg.id);
                                          setEditingText(msg.message);
                                        }}
                                        className="text-[0.6rem] m-0 p-0 text-gray-200 hover:underline hover:bg-transparent"
                                        variant="ghost"
                                        size="sm"
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                  )}
                                  <p
                                    className={`text-[0.6rem] md:text-xs ${isMe ? 'text-right text-blue-200' : 'text-left text-gray-300'}`}
                                  >
                                    {formatDateTime(msg.timestamp)}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div ref={messagesEndRef} />

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-sm mb-3 block">
                    Your Reply
                  </Label>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="email"
                    placeholder="Type your message here... (Ctrl+Enter to send)"
                    className="border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
                  {/* <Button variant="outline" size="sm" className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </Button> */}
                  <div className="text-xs text-gray-500">
                    {newMessage?.length} / 5000 characters
                  </div>
                  {(role === 'admin' || role === 'super_admin') && (
                    <Button
                      onClick={() => createReply(selectedTicket.id, newMessage)}
                      className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!newMessage?.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
