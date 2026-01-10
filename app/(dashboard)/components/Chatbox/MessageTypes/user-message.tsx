'use client';

import type { ChatMessage } from '../chat-container';

interface UserMessageProps {
  message: ChatMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-xs lg:max-w-md bg-blue-600 text-white rounded-lg p-2 shadow-md">
        <p className="text-sm break-words">{message.content}</p>
        <span className="text-xs text-blue-100 mt-2 block opacity-70">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
