'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { useSupport } from '@/hooks/useSupport';
import { SupportFilters } from '@/app/(dashboard)/components/Support/Filters';
import { CreateTicket } from '@/app/(dashboard)/company-admin/(pages)/support/components/Create';

export default function SupportPage() {
  const supportState = useSupport();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Support Tickets"
        subtitle="Manage customer support tickets and conversations"
      />

      <main className="flex-1 p-4">
        <SupportFilters {...supportState} />
      </main>

      <CreateTicket {...supportState} />
    </div>
  );
}
