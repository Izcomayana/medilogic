'use client';
import type { ChatMessage } from './chat-container';
import { UserMessage } from './MessageTypes/user-message';
import { BotMessage } from './MessageTypes/bot-message';
import { LoadingMessage } from './MessageTypes/loading-message';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onOptionClick: (option: string) => void;
}

export function MessageList({
  messages,
  isLoading,
  onOptionClick,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-6 bg-gradient-to-b from-gray-900 to-gray-800">
      {messages.map((message) => (
        <div key={message.id}>
          {message.type === 'user' && <UserMessage message={message} />}
          {message.type === 'bot' && (
            <BotMessage message={message} onOptionClick={onOptionClick} />
          )}
        </div>
      ))}
      {isLoading && <LoadingMessage />}
    </div>
  );
}
