// // utils.ts (or wherever you keep them)
// const pad = (n: number) => String(n).padStart(2, '0');

// /** Return YYYY-MM-DD using local date components (no timezone shifts). */
// export const formatDateLocal = (date: Date) =>
//   `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// /** Backwards-compatible helpers if you used the old names */
// export const formatDateStart = (date: Date) => formatDateLocal(date);
// export const formatDateEnd = (date: Date) => formatDateLocal(date);

export const formatDateStart = (date: Date) => date.toISOString().split('T')[0];

export const formatDateEnd = (date: Date) => date.toISOString().split('T')[0];

export const formatDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function formatDeliveryType(type?: string) {
  if (!type) return 'N/A';
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
