'use client';

import { useState } from 'react';
import { ChatContainer } from './components/Chatbox/chat-container';
import { MessageSquare } from 'lucide-react';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <main className="flex-1 bg-gray-900 relative min-h-screen max-w-dvw">
      {children}

      {/* Chat launcher */}
      {/* Floating chat layer — viewport anchored */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Launcher */}
        {!chatOpen && (
          <button
            onClick={() => {
              setChatOpen(true);
              setUnreadCount(0);
            }}
            className="pointer-events-auto absolute bottom-6 right-6 h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg flex items-center justify-center"
          >
            <MessageSquare className="h-6 w-6 text-white" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* Chat popup */}
        <div
          className={`
      pointer-events-auto absolute bottom-6 right-6 w-80 h-[90vh]
      transition-all duration-300 ease-out
      ${chatOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
    `}
        >
          <div className="h-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex flex-col">
            <ChatContainer
              onClose={() => setChatOpen(false)}
              onNewBotMessage={() => {
                if (!chatOpen) setUnreadCount((c) => c + 1);
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
