'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Plus, Search, Filter, Calendar } from 'lucide-react';
import { PageHeader } from '../../../components/PageHeader';
import { usePods } from '../../hooks/usePODs';
import { PodsTable } from './components/PODsTable';
import { CreatePOD, ViewPOD, ViewPODFile } from './components/Modals';

export default function ProofOfDeliveriesPage() {
  const podState = usePods();

  const {
    podsList,
    searchTerm,
    setSearchTerm,
    clientFilter,
    setClientFilter,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    filteredPods,
    handleOpenCreateModal,
  } = podState;

  const uniqueClients = Array.from(new Set(podsList.map((p) => p.client)));

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
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by POD ID, Trip ID, or client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <Select value={clientFilter} onValueChange={setClientFilter}>
                  <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Client" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Clients</SelectItem>
                    {uniqueClients.map((client) => (
                      <SelectItem key={client} value={client}>
                        {client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[130px] bg-gray-700 border-gray-600 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="2025-08-23">Today</SelectItem>
                    <SelectItem value="2025-08-22">Yesterday</SelectItem>
                    <SelectItem value="2025-08">This Month</SelectItem>
                  </SelectContent>
                </Select>
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
