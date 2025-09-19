"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Truck, MapPin, DollarSign, Clock, Package, Calendar, Filter, Brain, BarChart3, PieChartIcon, Users, Target } from 'lucide-react'
import { useState } from "react"

// Mock data for analytics
const keyMetrics = {
  totalTrips: 34,
  totalDistance: 1200,
  totalCost: 560000,
  averageCost: 16470,
  commonDeliveryType: "Express",
}

const aiPredictions = {
  averagePredictedDuration: 65.4,
  predictedDurations: [65, 65, 67, 65, 65, 63, 66, 65, 64, 67],
  insight:
    "Most trips are predicted to last around 65 minutes. Express deliveries dominate, indicating a trend toward faster service demand.",
}

const predictedDurationData = [
  { trip: "Trip 1", duration: 65 },
  { trip: "Trip 2", duration: 65 },
  { trip: "Trip 3", duration: 67 },
  { trip: "Trip 4", duration: 65 },
  { trip: "Trip 5", duration: 65 },
  { trip: "Trip 6", duration: 63 },
  { trip: "Trip 7", duration: 66 },
  { trip: "Trip 8", duration: 65 },
  { trip: "Trip 9", duration: 64 },
  { trip: "Trip 10", duration: 67 },
]

const deliveryTypeData = [
  { name: "Express", value: 18, percentage: 53 },
  { name: "Standard", value: 12, percentage: 35 },
  { name: "Scheduled", value: 4, percentage: 12 },
]

const costDistanceData = [
  { distance: 15, cost: 12000 },
  { distance: 25, cost: 18000 },
  { distance: 35, cost: 24000 },
  { distance: 45, cost: 28000 },
  { distance: 55, cost: 35000 },
  { distance: 65, cost: 42000 },
  { distance: 75, cost: 48000 },
]

const COLORS = ["#15941f", "#3b82f6", "#eab308"]

const drivers = ["All Drivers", "John Smith", "Sarah Johnson", "Mike Davis", "Lisa Wilson", "Tom Brown"]
const deliveryTypes = ["All Types", "Express", "Standard", "Scheduled"]

export default function TripAnalyticsPage() {
  const [dateRange, setDateRange] = useState("7days")
  const [selectedDriver, setSelectedDriver] = useState("All Drivers")
  const [selectedDeliveryType, setSelectedDeliveryType] = useState("All Types")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getFiltersAppliedText = () => {
    const filters = []
    if (dateRange !== "all") {
      const dateLabels: { [key: string]: string } = {
        "7days": "Last 7 days",
        "30days": "Last 30 days",
        "90days": "Last 90 days",
      }
      filters.push(dateLabels[dateRange] || dateRange)
    }
    if (selectedDriver !== "All Drivers") filters.push(`Driver: ${selectedDriver}`)
    if (selectedDeliveryType !== "All Types") filters.push(`Type: ${selectedDeliveryType}`)

    return filters.length > 0 ? `Filters: ${filters.join(", ")}` : "Filters: None applied (showing all trips)"
  }

  return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
          <SidebarTrigger className="text-white hover:bg-gray-800" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-white">Trip Analytics</h1>
            <p className="text-sm text-gray-400">Monitor insights, predictions, and trends across all trips</p>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Filters Section */}
          <Card className="dashboard-card mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">This Month</SelectItem>
                      <SelectItem value="90days">Last 3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                    <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {drivers.map((driver) => (
                        <SelectItem key={driver} value={driver}>
                          {driver}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <Select value={selectedDeliveryType} onValueChange={setSelectedDeliveryType}>
                    <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {deliveryTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="primary-button">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Trips</CardTitle>
                <Truck className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{keyMetrics.totalTrips}</div>
                <div className="text-xs text-[#15941f] flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last period
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Distance</CardTitle>
                <MapPin className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{keyMetrics.totalDistance.toLocaleString()} km</div>
                <div className="text-xs text-[#15941f] flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% from last period
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(keyMetrics.totalCost)}</div>
                <div className="text-xs text-[#15941f] flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +15% from last period
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Average Cost</CardTitle>
                <Target className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(keyMetrics.averageCost)}</div>
                <div className="text-xs text-blue-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +3% from last period
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Common Type</CardTitle>
                <Package className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{keyMetrics.commonDeliveryType}</div>
                <div className="text-xs text-gray-400 mt-1">53% of all deliveries</div>
              </CardContent>
            </Card>
          </div>

          {/* AI Predictions & Insights */}
          <Card className="dashboard-card mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Predictions & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-gray-300">Average Predicted Trip Duration</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{aiPredictions.averagePredictedDuration} mins</div>
                    <div className="text-xs text-gray-400 mt-1">Based on historical data and current conditions</div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-gray-300">Predicted Durations Sample</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {aiPredictions.predictedDurations.map((duration, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-600 text-white">
                          {duration}m
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">AI Insight</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">{aiPredictions.insight}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Predicted Duration Chart */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Predicted Trip Durations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={predictedDurationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="trip" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F9FAFB",
                        }}
                      />
                      <Bar dataKey="duration" fill="#15941f" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Type Distribution */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Delivery Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center">
                  <div className="w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deliveryTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {deliveryTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#F9FAFB",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-4">
                    {deliveryTypeData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="text-sm text-gray-300">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-white font-medium">{item.value}</span>
                          <span className="text-xs text-gray-400 ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost vs Distance Chart */}
          <Card className="dashboard-card mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Cost vs Distance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costDistanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="distance" stroke="#9CA3AF" fontSize={12} label={{ value: "Distance (km)", position: "insideBottom", offset: -10 }} />
                    <YAxis stroke="#9CA3AF" fontSize={12} label={{ value: "Cost (₦)", angle: -90, position: "insideLeft" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                      formatter={(value: any) => [formatCurrency(value), "Cost"]}
                      labelFormatter={(label: any) => `Distance: ${label} km`}
                    />
                    <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Filters Applied Summary */}
          <Card className="dashboard-card">
            <CardContent className="py-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Filter className="h-4 w-4" />
                <span>{getFiltersAppliedText()}</span>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
  )
}
