'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './chat-header';
import { MessageList } from './message-list';
import { ChatInputBar } from './chat-input-bar';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { useProfile } from '@/hooks/useProfile';

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'loading';
  content: string;
  timestamp: Date;
  options?: string[];
  data?: Record<string, any>;
}

interface ChatContainerProps {
  onClose: () => void;
  onNewBotMessage?: () => void;
}

export function ChatContainer({
  onClose,
  onNewBotMessage,
}: ChatContainerProps) {
  const authorizedRequest = useAuthorizedRequest();
  const { user } = useProfile();
  const userName = user?.role || undefined;

  console.log('user:', userName);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: `Hello ${userName} — how can I help?`,
      timestamp: new Date(),
      options: ['show all org trips', 'urgent trips', 'help'],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      await authorizedRequest(async (token) => {
        const res = await api.post(
          '/chatbot',
          { message: text },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: res.data.reply,
          timestamp: new Date(),
          options: res.data.options,
          data: res.data.data,
        };

        setMessages((prev) => [...prev, botMessage]);
        onNewBotMessage?.();
      }, 'Failed to send chat message');
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content:
          error?.response?.data?.detail?.[0]?.msg ||
          'Something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <ChatHeader onClose={onClose} />

      <div className="flex-1 overflow-y-auto">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onOptionClick={handleOptionClick}
        />
        <div ref={messagesEndRef} />
      </div>

      <ChatInputBar onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
