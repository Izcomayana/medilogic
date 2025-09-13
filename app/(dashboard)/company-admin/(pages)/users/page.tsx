'use client';

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import UserFilters from './components/usersfilters';
import ActiveUsersTable from './components/activeuserstable';
import DeletedUsersTable from './components/deleteduserstable';
import UserDetailsModal from './components/userdetailsmodal';
import RestoreUserDialog from './components/restoreuserdialog';
import PaginationControls from './components/paginationcontrols';

export type ActiveUser = {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'driver';
  status: 'active' | 'suspended';
  dateJoined: string;
};

export type DeletedUser = {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'driver';
  dateDeleted: string;
};

export default function UsersPage() {
  // state management
  const [activeTab, setActiveTab] = useState<'active' | 'deleted'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [selectedUser, setSelectedUser] = useState<
    ActiveUser | DeletedUser | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToRestore, setUserToRestore] = useState<string | null>(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  // mock data
  const activeUsers: ActiveUser[] = [
    {
      id: 'U001',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'client',
      status: 'active',
      dateJoined: '2025-08-01',
    },
    {
      id: 'U002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'driver',
      status: 'suspended',
      dateJoined: '2025-07-15',
    },
  ];

  const deletedUsersData: DeletedUser[] = [
    {
      id: 'U003',
      name: 'Michael Johnson',
      email: 'michael@example.com',
      role: 'driver',
      dateDeleted: '2025-08-20T14:30:00',
    },
    {
      id: 'U004',
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'client',
      dateDeleted: '2025-07-05T09:15:00',
    },
  ];

  // handlers
  const handleViewDetails = (user: ActiveUser | DeletedUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleRestoreClick = (userId: string) => {
    setUserToRestore(userId);
    setIsRestoreDialogOpen(true);
  };

  const handleConfirmRestore = () => {
    console.log('Restoring user:', userToRestore);
    setIsRestoreDialogOpen(false);
    setUserToRestore(null);
  };

  const filteredActiveUsers = activeUsers.filter((user) => {
    return (
      (searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === 'all' || user.role === roleFilter) &&
      (statusFilter === 'all' || user.status === statusFilter)
    );
  });

  const filteredDeletedUsers = deletedUsersData.filter((user) => {
    return (
      (searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === 'all' || user.role === roleFilter)
    );
  });

  const usersToDisplay =
    activeTab === 'active' ? filteredActiveUsers : filteredDeletedUsers;
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = usersToDisplay.slice(
    startIndex,
    startIndex + usersPerPage
  );
  const totalPages = Math.ceil(usersToDisplay.length / usersPerPage);

  return (
    <div className="flex-1 overflow-auto">
      <PageHeader
        title="Users"
        description="Manage active and deleted users."
      />

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as 'active' | 'deleted')}
      >
        <TabsList className="bg-gray-800 px-6">
          <TabsTrigger value="active">Active Users</TabsTrigger>
          <TabsTrigger value="deleted">Deleted Users</TabsTrigger>
        </TabsList>

        <UserFilters
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <div className="p-6">
          <TabsContent value="active">
            <ActiveUsersTable
              users={paginatedUsers as ActiveUser[]}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
          <TabsContent value="deleted">
            <DeletedUsersTable
              users={paginatedUsers as DeletedUser[]}
              onViewDetails={handleViewDetails}
              onRestoreClick={handleRestoreClick}
            />
          </TabsContent>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            usersPerPage={usersPerPage}
            totalUsers={usersToDisplay.length}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </Tabs>

      {/* Modals */}
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        activeTab={activeTab}
      />
      <RestoreUserDialog
        isOpen={isRestoreDialogOpen}
        onCancel={() => setIsRestoreDialogOpen(false)}
        onConfirm={handleConfirmRestore}
      />
    </div>
  );
}
