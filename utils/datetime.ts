// utils/datetime.ts

/**
 * Format a Date object to YYYY-MM-DD (for API filters)
 * (⚠️ Only date, no time — might miss trips at boundaries if backend expects UTC ISO)
 */
export const formatDateStart = (date: Date): string =>
  date.toISOString().split('T')[0];

export const formatDateEnd = (date: Date): string =>
  date.toISOString().split('T')[0];

/**
 * Start of day in UTC (full ISO string) for API queries
 * Example: 2025-10-02 -> "2025-10-02T00:00:00.000Z"
 */
export const formatDateStartUtc = (date: Date): string => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  ).toISOString();
};

/**
 * End of day in UTC (full ISO string) for API queries
 * Example: 2025-10-02 -> "2025-10-02T23:59:59.999Z"
 */
export const formatDateEndUtc = (date: Date): string => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    )
  ).toISOString();
};

/**
 * Format a UTC datetime string into user's local time.
 * Example: "2025-10-01T14:00:00Z" -> "Oct 1, 2025, 3:00 PM"
 */
export const formatDateTime = (dateTime: string | Date | null): string => {
  if (!dateTime) return '—'; // graceful fallback if null or undefined

  const dateObj = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;

  return dateObj.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// export const formatDateTime = (dateTime: string): string => {
//   return new Date(dateTime).toLocaleString(undefined, {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

/**
 * Same as formatDateTime, but also shows the timezone explicitly.
 * Example: "Oct 1, 2025, 3:00 PM (Africa/Lagos)"
 */
export const formatDateTimeWithZone = (dateTime: string): string => {
  const date = new Date(dateTime);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return `${date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })} (${tz})`;
};

/**
 * Convert a local Date (from a datetime picker) to a UTC ISO string
 * for sending to backend.
 * Example: local Date("2025-10-01T15:00") -> "2025-10-01T14:00:00.000Z"
 */
export const toUtcISOString = (localDate: Date): string => {
  return localDate.toISOString();
};

/**
 * Utility to display "time ago" style strings
 * Example: "5 minutes ago", "2 days ago"
 */
export const formatTimeAgo = (dateTime: string): string => {
  const now = new Date();
  const past = new Date(dateTime);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};
