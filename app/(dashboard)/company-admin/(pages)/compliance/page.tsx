'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCompliance } from '@/hooks/useCompliance';
import { ComplianceTable } from './components/Table';
import { CreateCompliance } from './components/Create';
import { ComplianceDetails } from './components/Details';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { ComplianceFilters } from './components/Filters';

export default function CompliancePage() {
  const complianceState = useCompliance();

  const {
    alertsLoading,
    recordToDelete,
    setRecordToDelete,
    handleDelete,
    summaryCards,
    filteredRecords,
    setIsCreateModalOpen,
    alertsList,
  } = complianceState;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Compliance Overview"
        subtitle="Manage organizational compliance records and audits"
      />

      <main className="flex-1 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{card.title}</p>
                      <p className="text-white text-3xl font-bold mt-2">
                        {card.value}
                      </p>
                    </div>
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alerts Panel */}
        {alertsLoading ? (
          <Card className="dashboard-card mb-6 border-yellow-600 border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-yellow-700/40 animate-pulse" />
                <div className="h-4 w-40 bg-gray-700/40 rounded animate-pulse" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skeleton Alert Card 1 */}
                <div className="bg-gray-700 border border-yellow-600 rounded-lg p-4">
                  <div className="h-4 w-3/4 bg-gray-600/40 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-600/30 rounded mt-3 animate-pulse" />
                </div>

                {/* Skeleton Alert Card 2 */}
                <div className="bg-gray-700 border border-yellow-600 rounded-lg p-4">
                  <div className="h-4 w-2/3 bg-gray-600/40 rounded animate-pulse" />
                  <div className="h-3 w-1/3 bg-gray-600/30 rounded mt-3 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : alertsList.length > 0 ? (
          <Card className="dashboard-card mb-6 border-yellow-600 border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Compliance Alerts ({alertsList.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alertsList.map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-gray-700 border border-yellow-600 rounded-lg p-4 flex items-start justify-between"
                  >
                    <div>
                      <p className="text-white font-medium">{alert.alert}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Triggered: {alert.triggeredOn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}

        <div className="flex flex-col justify-between mb-4 md:flex-row md:items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Organization Compliance Records ({filteredRecords.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#15941f] hover:bg-[#0d7314] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Compliance Record
            </Button>
          </div>
        </div>
        {/* <ComplianceFilters {...complianceState} /> */}

        <ComplianceTable {...complianceState} />
      </main>

      <CreateCompliance {...complianceState} />

      <ComplianceDetails {...complianceState} />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!recordToDelete}
        onOpenChange={() => setRecordToDelete(null)}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Compliance Record</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this compliance record? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => recordToDelete && handleDelete(recordToDelete)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
