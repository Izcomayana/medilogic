'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface OptionChipsProps {
  options: string[];
  onSelect: (option: string) => void;
}

export function OptionChips({ options, onSelect }: OptionChipsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleClick = (option: string) => {
    setSelectedOption(option);
    setDisabled(true);
    onSelect(option);
    // Re-enable after a short delay for visual feedback
    setTimeout(() => setDisabled(false), 500);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, idx) => (
        <Button
          key={idx}
          onClick={() => handleClick(option)}
          disabled={disabled}
          variant="outline"
          className={`text-xs !px-2 !py-1 rounded-full border-gray-500 text-gray-600 hover:bg-gray-600 ${
            selectedOption === option
              ? 'bg-blue-600 text-white border-blue-600'
              : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
