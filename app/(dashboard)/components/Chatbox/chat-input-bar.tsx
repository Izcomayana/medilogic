'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputBarProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInputBar({ onSend, isLoading }: ChatInputBarProps) {
  const [input, setInput] = useState('');
  const maxLength = 500;

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-700 bg-gray-800 p-2">
      <div className="space-y-2">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Shift+Enter for newline)"
            disabled={isLoading}
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none max-h-32"
            rows={3}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-gray-400">
          {input.length} / {maxLength} characters
        </div>
      </div>
    </div>
  );
}
