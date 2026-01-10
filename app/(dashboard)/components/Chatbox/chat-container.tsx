'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './chat-header';
import { MessageList } from './message-list';
import { ChatInputBar } from './chat-input-bar';

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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: 'Hello Admin — how can I help?',
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
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Processing your request: "${text}"`,
        timestamp: new Date(),
        options: ['View Details', 'Export', 'Cancel'],
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  // for future purpose to activate the new message dot notification
  //   const handleSendMessage = async (text: string) => {

  //   setTimeout(() => {
  //     const botMessage: ChatMessage = {
  //       id: (Date.now() + 1).toString(),
  //       type: "bot",
  //       content: `Processing your request: "${text}"`,
  //       timestamp: new Date(),
  //       options: ["View Details", "Export", "Cancel"],
  //     }

  //     setMessages((prev) => [...prev, botMessage])
  //     setIsLoading(false)
  //     onNewBotMessage()
  //   }, 1000)
  // }

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
