import TicketPage from './TicketPage';

export default function Page({ params }: { params: { ticketId: string } }) {
  return <TicketPage ticketId={params.ticketId} />;
}

// import TicketPage from './TicketPage';

// export default function Page(props: { params: { ticketId: string } }) {
//   return <TicketPage {...props} />;
// }

// app/(dashboard)/company-admin/(pages)/support/[ticketId]/page.tsx
// 'use client';

// import React, { useEffect, useRef } from 'react';
// import { ArrowLeft, Send, Trash2, Clock, MoreVertical } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import Link from 'next/link';
// import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
// import { useSupport } from '@/hooks/useSupport';
// import { formatDateTime } from '@/utils/datetime';
// import { useProfile } from '@/hooks/useProfile';
// import { useAuth } from '@/components/auth';

// export default function Ticket({ params }: { params: { ticketId: string } }) {
//   const {
//     messages,
//     newMessage,
//     setNewMessage,
//     messagesEndRef,
//     selectedTicket,
//     setTicketPendingDelete,
//     setTicketPendingStatus,
//     fetchTicketById,
//     loadingTicket,
//     fetchMessagesByTicketId,
//     fetchRepliesByTicketId,
//     createReply,
//     loadingMessages,
//     updateMessage,
//     editingId,
//     setEditingId,
//     editingText,
//     setEditingText,
//     updateReply,
//   } = useSupport();

//   const { user } = useProfile();
//   const { role } = useAuth();

//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);

//   const scrollToBottom = () => {
//     if (!scrollContainerRef.current) return;

//     requestAnimationFrame(() => {
//       scrollContainerRef.current!.scrollTop =
//         scrollContainerRef.current!.scrollHeight;
//     });
//   };

//   const ticketId = params?.ticketId;

//   useEffect(() => {
//     if (!ticketId) return;
//     fetchTicketById(ticketId);
//     fetchMessagesByTicketId(ticketId);
//     fetchRepliesByTicketId(ticketId);
//   }, [ticketId]);

//   useEffect(() => {
//     if (!loadingMessages) {
//       scrollToBottom();
//     }
//   }, [loadingMessages]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages.length]);

//   useEffect(() => {
//     if (editingId === null) scrollToBottom();
//   }, [editingId]);

// if (loadingTicket) return <PageHeader title="Loading..." subtitle="" />;
// if (!selectedTicket) return <PageHeader title="Loading..." subtitle="" />;
// if (!user) return <PageHeader title="Loading user..." subtitle="" />;

//   const getStatusBadge = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'open':
//         return <Badge className="bg-blue-600 text-white">Open</Badge>;
//       case 'in_progress':
//         return <Badge className="bg-yellow-600 text-white">In Progress</Badge>;
//       case 'resolved':
//         return <Badge className="bg-green-600 text-white">Resolved</Badge>;
//       case 'closed':
//         return <Badge className="bg-gray-600 text-white">Closed</Badge>;
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900">
//       <PageHeader title={'Ticket'} subtitle={selectedTicket.id} />

//       <div className="flex justify-between items-center px-4 pt-4">
//         <Link href="/admin/support">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="text-gray-300 hover:text-white"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Tickets
//           </Button>
//         </Link>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="default"
//               size="sm"
//               className="border-gray-600 text-gray-300 bg-gray-700"
//             >
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="end"
//             className="bg-gray-800 border-gray-700"
//           >
//             <DropdownMenuItem
//               onClick={() =>
//                 setTicketPendingStatus({
//                   id: selectedTicket.id,
//                   status: selectedTicket.status,
//                 })
//               }
//               className="text-gray-300"
//             >
//               <Clock className="h-4 w-4 mr-2" />
//               Change Status
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => setTicketPendingDelete(selectedTicket.id)}
//               className="text-red-400"
//             >
//               <Trash2 className="h-4 w-4 mr-2" />
//               Delete Ticket
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <main className="flex-1 p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <Card className="dashboard-card">
//             <CardContent className="p-4">
//               <Label className="text-gray-400 text-xs uppercase tracking-wide">
//                 Status
//               </Label>
//               <div className="mt-3">
//                 {getStatusBadge(selectedTicket?.status)}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="dashboard-card">
//             <CardContent className="p-4">
//               <Label className="text-gray-400 text-xs uppercase tracking-wide">
//                 Created By
//               </Label>
//               <p className="text-white font-medium text-sm mt-2">
//                 {selectedTicket.user.name}
//               </p>
//               <p className="text-gray-500 text-xs">
//                 {selectedTicket.user.role}
//               </p>
//             </CardContent>
//           </Card>
//           <Card className="dashboard-card">
//             <CardContent className="p-4">
//               <Label className="text-gray-400 text-xs uppercase tracking-wide">
//                 Created On
//               </Label>
//               <p className="text-white font-medium text-sm mt-2">
//                 {formatDateTime(selectedTicket.created_at)}
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="dashboard-card flex flex-col h-[600px]">
//           <CardHeader className="border-b border-gray-700 mb-0">
//             <CardTitle className="text-white text-lg">
//               Conversation ({messages?.length} messages)
//             </CardTitle>
//           </CardHeader>
//           <CardContent
//             className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800"
//             ref={scrollContainerRef}
//           >
//             {loadingMessages && (
//               <div className="space-y-4 animate-in fade-in duration-300">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="flex gap-2">
//                     <div className="loader-bubble w-10 h-10 rounded-full bg-gray-700"></div>
//                     <div className="flex flex-col gap-2">
//                       <div className="loader-bubble w-40 h-3 rounded bg-gray-700"></div>
//                       <div className="loader-bubble w-60 h-3 rounded bg-gray-700"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {!loadingMessages &&
//               messages?.map((msg, index) => {
//                 const isMe = msg.senderId === user?.user_id;

//                 return (
//                   <div
//                     key={msg.id}
//                     className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div
//                       className={
//                         isMe ? 'animate-from-right' : 'animate-from-left'
//                       }
//                       style={{ animationDelay: `${index * 200}ms` }}
//                     >
//                       <div className="flex flex-col max-w-xs lg:max-w-md gap-1">
//                         <p
//                           className={`text-xs font-semibold px-4 ${isMe ? 'text-right text-blue-300' : 'text-left text-gray-400'}`}
//                         >
//                           {msg.sendeRole}
//                         </p>

//                         <div
//                           className={`rounded-lg shadow-md ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600'} px-3`}
//                         >
//                           {/* EDIT MODE OR READ MODE */}
//                           {editingId === msg.id ? (
//                             <>
//                               <Textarea
//                                 value={editingText}
//                                 onChange={(e) => setEditingText(e.target.value)}
//                                 className="w-full bg-gray-800 border border-gray-600 text-white text-sm rounded p-2 mt-2"
//                                 rows={3}
//                                 autoFocus
//                               />

//                               {/* Save / Cancel (INSIDE the same message bubble so `msg` exists) */}
//                               <div className="flex justify-end gap-2 text-xs mt-2 pr-2 pb-2">
//                                 <Button
//                                   onClick={() => setEditingId(null)}
//                                   className="text-gray-400 text-gray-200 hover:bg-transparent"
//                                   variant="ghost"
//                                   size="sm"
//                                 >
//                                   Cancel
//                                 </Button>

//                                 <Button
//                                   onClick={async () => {
//                                     try {
//                                       if (msg.senderType === 'admin') {
//                                         await updateReply(msg.id, editingText);
//                                       } else {
//                                         await updateMessage(
//                                           msg.id,
//                                           editingText
//                                         );
//                                       }
//                                       setEditingId(null);
//                                     } catch (err) {
//                                       console.log(err);
//                                       // keep editing open on error (toast inside hook)
//                                     }
//                                   }}
//                                   className="text-gray-700 hover:text-blue-300 font-medium bg-transparent hover:bg-transparent"
//                                   size="sm"
//                                 >
//                                   Save
//                                 </Button>
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               <p className="pt-3 text-sm leading-relaxed">
//                                 {msg.message}
//                               </p>

//                               <div className="flex justify-between gap-4 items-center mt-3">
//                                 {/* Edit button (only for messages the current user sent) */}
//                                 {msg.senderId === user?.user_id && (
//                                   <div className="flex justify-end pr-2">
//                                     <Button
//                                       onClick={() => {
//                                         setEditingId(msg.id);
//                                         setEditingText(msg.message);
//                                       }}
//                                       className="text-[0.6rem] m-0 p-0 text-gray-200 hover:underline hover:bg-transparent"
//                                       variant="ghost"
//                                       size="sm"
//                                     >
//                                       Edit
//                                     </Button>
//                                   </div>
//                                 )}
//                                 <p
//                                   className={`text-[0.6rem] md:text-xs ${isMe ? 'text-right text-blue-200' : 'text-left text-gray-300'}`}
//                                 >
//                                   {formatDateTime(msg.timestamp)}
//                                 </p>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//             <div ref={messagesEndRef} />
//           </CardContent>
//         </Card>

//         <Card className="dashboard-card mt-4">
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               <div>
//                 <Label className="text-gray-300 text-sm mb-3 block">
//                   Your Reply
//                 </Label>
//                 <Textarea
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message here... (Ctrl+Enter to send)"
//                   className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none focus:border-blue-500"
//                   rows={4}
//                 />
//               </div>
//               <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
//                 {/* <Button variant="outline" size="sm" className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700">
//                   <Paperclip className="h-4 w-4 mr-2" />
//                   Attach File
//                 </Button> */}
//                 <div className="text-xs text-gray-500">
//                   {newMessage?.length} / 5000 characters
//                 </div>
//                 {(role === 'admin' || role === 'super_admin') && (
//                   <Button
//                     onClick={() => createReply(selectedTicket.id, newMessage)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={!newMessage?.trim()}
//                   >
//                     <Send className="h-4 w-4 mr-2" />
//                     Reply
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }
