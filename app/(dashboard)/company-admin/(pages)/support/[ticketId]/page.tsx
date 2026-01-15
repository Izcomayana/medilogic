import TicketPage from './TicketPage';

export default function Page({ params }: { params: { ticketId: string } }) {
  return <TicketPage ticketId={params.ticketId} />;
}
