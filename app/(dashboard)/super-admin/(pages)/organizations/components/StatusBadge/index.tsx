// components/StatusBadge.tsx

import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string | boolean | undefined;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let display = '';
  let color = '';

  if (typeof status === 'boolean') {
    display = status ? 'YES' : 'NO';
    color = status ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
  } else if (typeof status === 'string') {
    // normalize string statuses
    switch (status.toLowerCase()) {
      case 'active':
        display = 'Active';
        color = 'bg-green-600 text-white';
        break;
      case 'inactive':
        display = 'Inactive';
        color = 'bg-gray-500 text-white';
        break;
      default:
        display = status;
        color = 'bg-gray-700 text-white';
        break;
    }
  }

  return (
    <span className={cn('px-2 py-1 text-xs font-semibold rounded-md', color)}>
      {display}
    </span>
  );
}
