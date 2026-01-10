'use client';

import type { ChatMessage } from '../chat-container';
import { TextBubble } from '../renderers/text-bubble';
import { OptionChips } from '../renderers/option-chips';
import { DataRenderer } from '../renderers/data-renderer';

interface BotMessageProps {
  message: ChatMessage;
  onOptionClick: (option: string) => void;
}

export function BotMessage({ message, onOptionClick }: BotMessageProps) {
  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
          AI
        </div>
      </div>
      <div className="flex-1 max-w-md lg:max-w-lg space-y-3">
        <TextBubble content={message.content} />

        {message.options && message.options.length > 0 && (
          <OptionChips options={message.options} onSelect={onOptionClick} />
        )}

        {message.data && <DataRenderer data={message.data} />}
      </div>
    </div>
  );
}
