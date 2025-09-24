export const formatDateStart = (date: Date) =>
  `${date.toISOString().split('T')[0]}T00:00:00`;

export const formatDateEnd = (date: Date) =>
  `${date.toISOString().split('T')[0]}T23:59:59`;

export const formatDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
