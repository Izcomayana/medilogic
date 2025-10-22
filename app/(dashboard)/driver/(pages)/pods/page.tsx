'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Plus, Search, Filter, Calendar } from 'lucide-react';
import { PageHeader } from '../../../components/PageHeader';
import { usePods } from '../../hooks/usePODs';
import { PodsTable } from './components/PODsTable';
import { CreatePOD, ViewPOD, ViewPODFile } from './components/Modals';
import DateRangeFilter from '@/app/(dashboard)/components/DateRange';

export default function ProofOfDeliveriesPage() {
  const podState = usePods();

  const { dateFilter, setDateFilter, filteredPods, handleOpenCreateModal } =
    podState;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <PageHeader
          title="Proof of Deliveries"
          subtitle="Create, view, and manage your delivery proofs"
        />

        <main className="flex-1 p-6">
          {/* Filters and Controls */}
          <Card className="dashboard-card mb-6">
            <CardHeader className="flex flex-col md:flex-row justify-between md:items-center ">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                PODs Management ({filteredPods.length})
              </CardTitle>
              <Button
                onClick={handleOpenCreateModal}
                className="primary-button mt-2 md:mt-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                New POD
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <DateRangeFilter value={dateFilter} onChange={setDateFilter} />
              </div>
            </CardContent>
          </Card>

          <PodsTable {...podState} />
        </main>
      </div>

      <CreatePOD {...podState} />

      <ViewPOD {...podState} />

      <ViewPODFile {...podState} />
    </>
  );
}
