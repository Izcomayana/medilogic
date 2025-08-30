/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, BarChart3, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { toast } from 'sonner';
import { PageHeader } from '../../../PageHeader';

export default function ExportPage() {
  // const [exportType, setExportType] = useState("csv")
  const [dateRange, setDateRange] = useState('30days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedData, setSelectedData] = useState({
    tripLogs: true,
    assignments: true,
    complianceReports: false,
    driverPerformance: false,
    fuelConsumption: false,
  });

  const authorizedRequest = useAuthorizedRequest();

  const handleExport = async (type: 'csv' | 'pdf') => {
    const selectedItems = Object.entries(selectedData)
      .filter(([, selected]) => selected)
      .map(([key]) => key);

    if (selectedItems.length === 0) {
      toast.error('Please select at least one data type to export');
      return;
    }

    try {
      const res = await authorizedRequest(async (token: string) => {
        const params = new URLSearchParams({
          status: '',
          delivery_type: '',
          priority: '',
          start_date: startDate || '2025-01-01',
          end_date: endDate || '2025-12-31',
        });

        return fetch(
          `https://medilogic-backend.onrender.com/admin-dashboard/admin-dashboard/export/${type}?${params.toString()}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: type === 'pdf' ? 'application/pdf' : 'text/csv',
            },
          }
        );
      }, 'Failed to get exports.');

      if (!res) {
        toast.error('No response received from server');
        return;
      }

      if (!res.ok) {
        let errorMessage = `Export failed: ${res.status}`;

        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errJson = await res.json();
          errorMessage += ` - ${errJson.detail || JSON.stringify(errJson)}`;
        } else {
          const errText = await res.text();
          errorMessage += ` - ${errText}`;
        }

        toast.error(errorMessage);
        return;
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Export failed: ${res.status} - ${errText}`);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export-${Date.now()}.${type}`;
      a.click();

      toast.success(`${type.toUpperCase()} export downloaded successfully!`);
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to export data. Please try again.');
    }
  };

  const exportOptions = [
    {
      key: 'tripLogs',
      label: 'Trip Logs',
      description: 'Complete trip history with routes, times, and status',
    },
    {
      key: 'assignments',
      label: 'Driver Assignments',
      description: 'Shift assignments and driver schedules',
    },
    {
      key: 'complianceReports',
      label: 'Compliance Reports',
      description: 'Regulatory compliance and safety reports',
    },
    {
      key: 'driverPerformance',
      label: 'Driver Performance',
      description: 'Performance metrics and KPIs for drivers',
    },
    {
      key: 'fuelConsumption',
      label: 'Fuel Consumption',
      description: 'Fuel usage and efficiency data',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Data Export"
        subtitle="Export logistics data and reports"
      />

      <main className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Export Configuration */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Export Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Range Selection */}
              <div className="space-y-3">
                <Label className="text-gray-300 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Date Range */}
              {dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Start Date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">End Date</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Data Selection */}
              <div className="space-y-3">
                <Label className="text-gray-300">Select Data to Export</Label>
                <div className="space-y-3">
                  {exportOptions.map((option) => (
                    <div
                      key={option.key}
                      className="flex items-start space-x-3"
                    >
                      <Checkbox
                        id={option.key}
                        checked={
                          selectedData[option.key as keyof typeof selectedData]
                        }
                        onCheckedChange={(checked) =>
                          setSelectedData((prev) => ({
                            ...prev,
                            [option.key]: checked,
                          }))
                        }
                        className="border-gray-600 data-[state=checked]:bg-[#15941f] data-[state=checked]:border-[#15941f]"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={option.key}
                          className="text-sm font-medium text-white cursor-pointer"
                        >
                          {option.label}
                        </label>
                        <p className="text-xs text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Actions */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* CSV Export */}
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-6 w-6 text-[#15941f]" />
                  <div>
                    <h3 className="text-white font-medium">CSV Export</h3>
                    <p className="text-sm text-gray-400">
                      Export raw data in CSV format
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleExport('csv')}
                  className="primary-button w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              {/* PDF Export */}
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="text-white font-medium">PDF Report</h3>
                    <p className="text-sm text-gray-400">
                      Export visual reports with charts
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleExport('pdf')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF Report
                </Button>
              </div>

              {/* Export History */}
              <div className="space-y-3">
                <Label className="text-gray-300">Recent Exports</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
                    <div>
                      <span className="text-sm text-white">Trip Logs CSV</span>
                      <p className="text-xs text-gray-400">
                        Jan 20, 2024 - 2:30 PM
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
                    <div>
                      <span className="text-sm text-white">
                        Performance Report PDF
                      </span>
                      <p className="text-xs text-gray-400">
                        Jan 19, 2024 - 4:15 PM
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// 'use client';

// import { SidebarTrigger } from '@/components/ui/sidebar';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Download, FileText, BarChart3, Calendar, Filter } from 'lucide-react';
// import { useState } from 'react';
// import { toast } from 'sonner';

// export default function ExportPage() {
//   // const [exportType, setExportType] = useState("csv")
//   const [dateRange, setDateRange] = useState('30days');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedData, setSelectedData] = useState({
//     tripLogs: true,
//     assignments: true,
//     complianceReports: false,
//     driverPerformance: false,
//     fuelConsumption: false,
//   });

//   const handleExport = (type: 'csv' | 'pdf') => {
//     const selectedItems = Object.entries(selectedData)
//       .filter(([selected]) => selected)
//       .map(([key]) => key);

//     if (selectedItems.length === 0) {
//       toast.error('Please select at least one data type to export');
//       return;
//     }

//     toast.success(
//       `${type.toUpperCase()} export started for ${selectedItems.length} data types`
//     );
//   };

//   const exportOptions = [
//     {
//       key: 'tripLogs',
//       label: 'Trip Logs',
//       description: 'Complete trip history with routes, times, and status',
//     },
//     {
//       key: 'assignments',
//       label: 'Driver Assignments',
//       description: 'Shift assignments and driver schedules',
//     },
//     {
//       key: 'complianceReports',
//       label: 'Compliance Reports',
//       description: 'Regulatory compliance and safety reports',
//     },
//     {
//       key: 'driverPerformance',
//       label: 'Driver Performance',
//       description: 'Performance metrics and KPIs for drivers',
//     },
//     {
//       key: 'fuelConsumption',
//       label: 'Fuel Consumption',
//       description: 'Fuel usage and efficiency data',
//     },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900">
//       <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
//         <SidebarTrigger className="text-white hover:bg-gray-800" />
//         <div className="flex-1">
//           <h1 className="text-xl font-semibold text-white">Data Export</h1>
//           <p className="text-sm text-gray-400">
//             Export logistics data and reports
//           </p>
//         </div>
//       </header>

//       <main className="flex-1 p-6">
//         <div className="grid gap-6 lg:grid-cols-2">
//           {/* Export Configuration */}
//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center gap-2">
//                 <Filter className="h-5 w-5" />
//                 Export Configuration
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Date Range Selection */}
//               <div className="space-y-3">
//                 <Label className="text-gray-300 flex items-center gap-2">
//                   <Calendar className="h-4 w-4" />
//                   Date Range
//                 </Label>
//                 <Select value={dateRange} onValueChange={setDateRange}>
//                   <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-700 border-gray-600">
//                     <SelectItem value="7days">Last 7 Days</SelectItem>
//                     <SelectItem value="30days">Last 30 Days</SelectItem>
//                     <SelectItem value="90days">Last 90 Days</SelectItem>
//                     <SelectItem value="custom">Custom Range</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Custom Date Range */}
//               {dateRange === 'custom' && (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label className="text-gray-300">Start Date</Label>
//                     <Input
//                       type="date"
//                       value={startDate}
//                       onChange={(e) => setStartDate(e.target.value)}
//                       className="bg-gray-700 border-gray-600 text-white"
//                     />
//                   </div>
//                   <div>
//                     <Label className="text-gray-300">End Date</Label>
//                     <Input
//                       type="date"
//                       value={endDate}
//                       onChange={(e) => setEndDate(e.target.value)}
//                       className="bg-gray-700 border-gray-600 text-white"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Data Selection */}
//               <div className="space-y-3">
//                 <Label className="text-gray-300">Select Data to Export</Label>
//                 <div className="space-y-3">
//                   {exportOptions.map((option) => (
//                     <div
//                       key={option.key}
//                       className="flex items-start space-x-3"
//                     >
//                       <Checkbox
//                         id={option.key}
//                         checked={
//                           selectedData[option.key as keyof typeof selectedData]
//                         }
//                         onCheckedChange={(checked) =>
//                           setSelectedData((prev) => ({
//                             ...prev,
//                             [option.key]: checked,
//                           }))
//                         }
//                         className="border-gray-600 data-[state=checked]:bg-[#15941f] data-[state=checked]:border-[#15941f]"
//                       />
//                       <div className="grid gap-1.5 leading-none">
//                         <label
//                           htmlFor={option.key}
//                           className="text-sm font-medium text-white cursor-pointer"
//                         >
//                           {option.label}
//                         </label>
//                         <p className="text-xs text-gray-400">
//                           {option.description}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Export Actions */}
//           <Card className="dashboard-card">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center gap-2">
//                 <Download className="h-5 w-5" />
//                 Export Options
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* CSV Export */}
//               <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
//                 <div className="flex items-center gap-3 mb-3">
//                   <FileText className="h-6 w-6 text-[#15941f]" />
//                   <div>
//                     <h3 className="text-white font-medium">CSV Export</h3>
//                     <p className="text-sm text-gray-400">
//                       Export raw data in CSV format
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={() => handleExport('csv')}
//                   className="primary-button w-full"
//                 >
//                   <Download className="h-4 w-4 mr-2" />
//                   Export CSV
//                 </Button>
//               </div>

//               {/* PDF Export */}
//               <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
//                 <div className="flex items-center gap-3 mb-3">
//                   <BarChart3 className="h-6 w-6 text-blue-500" />
//                   <div>
//                     <h3 className="text-white font-medium">PDF Report</h3>
//                     <p className="text-sm text-gray-400">
//                       Export visual reports with charts
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={() => handleExport('pdf')}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   <Download className="h-4 w-4 mr-2" />
//                   Export PDF Report
//                 </Button>
//               </div>

//               {/* Export History */}
//               <div className="space-y-3">
//                 <Label className="text-gray-300">Recent Exports</Label>
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
//                     <div>
//                       <span className="text-sm text-white">Trip Logs CSV</span>
//                       <p className="text-xs text-gray-400">
//                         Jan 20, 2024 - 2:30 PM
//                       </p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-gray-400 hover:text-white"
//                     >
//                       <Download className="h-3 w-3" />
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
//                     <div>
//                       <span className="text-sm text-white">
//                         Performance Report PDF
//                       </span>
//                       <p className="text-xs text-gray-400">
//                         Jan 19, 2024 - 4:15 PM
//                       </p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-gray-400 hover:text-white"
//                     >
//                       <Download className="h-3 w-3" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }
