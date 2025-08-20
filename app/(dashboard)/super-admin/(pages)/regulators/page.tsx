'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Shield } from 'lucide-react';
import { useState } from 'react';
import { regulators as initialData } from './regulators';
import { Regulator } from './types/regulator';
import { RegulatorTable } from './components/RegulatorTable';
import { CreateRegulatorDialog } from './components/CreateRegulator';
import { EditRegulatorDialog } from './components/EditRegulator';

export default function RegulatorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Regulator | null>(null);

  const filtered = initialData.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Regulator Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage regulatory oversight personnel
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5" /> Regulators ({filtered.length})
              </CardTitle>
              <CreateRegulatorDialog />
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search regulators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <RegulatorTable
              regulators={filtered}
              onEdit={(reg) => {
                setSelectedReg(reg);
                setEditOpen(true);
              }}
            />
          </CardContent>
        </Card>
      </main>

      <EditRegulatorDialog
        regulator={selectedReg}
        open={editOpen}
        setOpen={setEditOpen}
      />
    </div>
  );
}
