/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays } from 'lucide-react';

// Helper: format local date to YYYY-MM-DDTHH:mm:ss (no timezone conversion)
const pad = (n: number) => String(n).padStart(2, '0');
export const formatDateStart = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T00:00:00`;
export const formatDateEnd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T23:59:59`;

export type DateRangeLocal = { from?: Date; to?: Date };

interface DateRangeFilterProps {
  value?: DateRangeLocal;
  onChange: React.Dispatch<React.SetStateAction<DateRangeLocal | undefined>>;
  placeholder?: string;
}

export default function DateRangeFilter({
  value,
  onChange,
  placeholder = 'Select date range',
}: DateRangeFilterProps) {
  // Calendar's DateRange type in the shadcn implementation expects a particular shape.
  // Types vary between projects; to avoid the compile-time mismatch we'll pass `undefined` when empty,
  // and cast to `any` when a value exists so Calendar receives a concrete object.
  const selected = value?.from ? (value as any) : undefined;

  const label = value?.from
    ? value.to
      ? `${value.from.toLocaleDateString()} — ${value.to.toLocaleDateString()}`
      : `${value.from.toLocaleDateString()}`
    : placeholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[220px] justify-start bg-gray-700 border-gray-600 text-white"
        >
          <CalendarDays className="h-4 w-4 mr-2" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 bg-gray-800 border-gray-700 border-0 z-[99999]"
        side="bottom"
        align="start"
      >
        <div className="p-3">
          <Calendar
            mode="range"
            // numberOfMonths is optional; adjust to taste
            numberOfMonths={2}
            selected={selected}
            // onSelect may pass different shapes depending on Calendar implementation; accept any and forward
            onSelect={(range: any) => {
              // range might be: Date | { from: Date; to?: Date } | undefined
              // we only care about the range-shape (from/to)
              if (!range) return onChange(undefined);
              // If the user selected a single Date only, convert to { from, to: undefined }
              if (range instanceof Date) {
                onChange({ from: range });
                return;
              }
              // otherwise assume a { from, to } shape and forward
              onChange({ from: range.from, to: range.to });
            }}
            className="rounded-lg border shadow-sm"
          />

          <div className="flex items-center justify-between mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300"
              onClick={() => onChange(undefined)}
            >
              Clear
            </Button>
            <div className="text-xs text-gray-400">
              Pick a start and end date
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
