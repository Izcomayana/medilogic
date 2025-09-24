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
