'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart3, LineChart, PieChart, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

export default function ChartsPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [orgUnit, setOrgUnit] = useState('all');

  // Mock data for charts
  const dailyTrips = [
    { day: 'Mon', trips: 45 },
    { day: 'Tue', trips: 52 },
    { day: 'Wed', trips: 48 },
    { day: 'Thu', trips: 61 },
    { day: 'Fri', trips: 55 },
    { day: 'Sat', trips: 38 },
    { day: 'Sun', trips: 42 },
  ];

  const topDrivers = [
    { name: 'John Smith', trips: 28 },
    { name: 'Sarah Johnson', trips: 25 },
    { name: 'Mike Davis', trips: 22 },
    { name: 'Lisa Wilson', trips: 19 },
    { name: 'Tom Brown', trips: 17 },
  ];

  const tripStatus = [
    { status: 'Completed', count: 234, percentage: 78 },
    { status: 'In Progress', count: 45, percentage: 15 },
    { status: 'Pending', count: 21, percentage: 7 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Analytics & Charts
          </h1>
          <p className="text-sm text-gray-400">
            Visual insights for operations and logistics
          </p>
        </div>
      </header>

      <div className="flex-1 p-6">
        {/* Filters */}
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full lg:w-[150px] bg-gray-700 border-gray-600 text-white">
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
              <Select value={orgUnit} onValueChange={setOrgUnit}>
                <SelectTrigger className="w-full lg:w-[180px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Organization Unit" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Units</SelectItem>
                  <SelectItem value="north">North Division</SelectItem>
                  <SelectItem value="south">South Division</SelectItem>
                  <SelectItem value="east">East Division</SelectItem>
                  <SelectItem value="west">West Division</SelectItem>
                </SelectContent>
              </Select>
              <Button className="primary-button">Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Daily Trip Count Line Chart */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Daily Trip Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2 p-4">
                {dailyTrips.map((day) => (
                  <div
                    key={day.day}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="bg-[#15941f] rounded-t-md w-8 transition-all duration-300 hover:bg-[#15941f]/80"
                      style={{ height: `${(day.trips / 70) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-400">{day.day}</span>
                    <span className="text-xs text-white font-medium">
                      {day.trips}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Drivers Bar Chart */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Top Drivers by Trip Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDrivers.map((driver, index) => (
                  <div key={driver.name} className="flex items-center gap-3">
                    <div className="w-8 text-center">
                      <span className="text-sm font-medium text-gray-400">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white">
                          {driver.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {driver.trips} trips
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[#15941f] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(driver.trips / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trip Status Pie Chart */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Trip Status Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Simplified pie chart representation */}
                  <div className="absolute inset-0 rounded-full bg-gray-700"></div>
                  <div
                    className="absolute inset-0 rounded-full bg-[#15941f]"
                    style={{
                      background: `conic-gradient(#15941f 0deg ${tripStatus[0].percentage * 3.6}deg, #3b82f6 ${tripStatus[0].percentage * 3.6}deg ${(tripStatus[0].percentage + tripStatus[1].percentage) * 3.6}deg, #eab308 ${(tripStatus[0].percentage + tripStatus[1].percentage) * 3.6}deg 360deg)`,
                    }}
                  ></div>
                  <div className="absolute inset-4 rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">300</div>
                      <div className="text-xs text-gray-400">Total Trips</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {tripStatus.map((status, index) => (
                  <div
                    key={status.status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0
                            ? 'bg-[#15941f]'
                            : index === 1
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                        }`}
                      ></div>
                      <span className="text-sm text-gray-300">
                        {status.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-white font-medium">
                        {status.count}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        ({status.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Trends */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-white">
                Weekly Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">
                      Average Trip Duration
                    </span>
                    <span className="text-sm text-white font-medium">
                      2.4 hours
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: '68%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">
                      Fuel Efficiency
                    </span>
                    <span className="text-sm text-white font-medium">
                      8.2 km/L
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#15941f] h-2 rounded-full"
                      style={{ width: '82%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">
                      Customer Satisfaction
                    </span>
                    <span className="text-sm text-white font-medium">
                      4.6/5.0
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
