'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserX, UserCheck, UserMinus } from 'lucide-react';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { useUsers, ActiveUser } from '@/hooks/useUsers';
import { Filters } from './components/Filters';
import { ActiveUsersTab } from './components/ActiveUsers';
import { InactiveUsersTab } from './components/InactiveUsers';
import { DeletedUsersTab } from './components/DeletedUsers';

export default function UsersPage() {
  const userState = useUsers();

  const {
    activeTab,
    setActiveTab,
    setCurrentPage,
    filteredActiveUsers,
    filteredInactiveUsers,
    filteredDeletedUsers,
    totalPages,
    startIndex,
    usersPerPage,
    currentUsers,
    currentPage,
  } = userState;

  const handleViewDetails = (user: ActiveUser) => console.log('View:', user);

  type TabType = 'active' | 'inactive' | 'deleted';

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Users"
        subtitle="Manage clients and drivers linked to your organization"
      />
      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={(v: string) => {
                setActiveTab(v as TabType);
                setCurrentPage(1);
              }}
              className="w-full"
            >
              <div className="border-b border-gray-700 px-6">
                <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0 max-w-2xl">
                  <TabsTrigger
                    value="active"
                    className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <UserCheck className="h-4 w-4" />
                    Active Users ({filteredActiveUsers.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="inactive"
                    className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <UserMinus className="h-4 w-4" />
                    Inactive Users ({filteredInactiveUsers.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="deleted"
                    className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-b-[#15941f] rounded-none"
                  >
                    <UserX className="h-4 w-4" />
                    Deleted Users ({filteredDeletedUsers.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <Filters {...userState} />

              <ActiveUsersTab
                {...userState}
                handleViewDetails={handleViewDetails}
              />

              <InactiveUsersTab
                {...userState}
                handleViewDetails={handleViewDetails}
              />

              
              <DeletedUsersTab
                handleViewDetails={function (): void {
                  throw new Error('Function not implemented.');
                }}
                handleRestoreUser={function (): void {
                  throw new Error('Function not implemented.');
                }}
                {...userState}
              />

              {totalPages > 1 && (
                <div className="flex items-center justify-between p-6 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1}-
                    {Math.min(startIndex + usersPerPage, currentUsers.length)}{' '}
                    of {currentUsers.length}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
