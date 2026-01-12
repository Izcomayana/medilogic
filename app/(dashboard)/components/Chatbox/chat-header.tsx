'use client';

import { MessageCircle, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 p-2">
      <div>
        <div className="flex gap-2 items-center">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          <h2 className="font-semibold text-white">Admin Assistant</h2>
        </div>
        <p className="text-xs text-gray-400">Organization-scoped support</p>
      </div>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition"
        aria-label="Close chat"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
