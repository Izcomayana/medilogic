'use client';

import { Badge } from '@/components/ui/badge';
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
import { CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTrips } from '@/hooks/useTrips';
import { Filters } from './components/Filters';
import { TripsTable } from './components/TripsTable';
import { EditTripModal } from './components/EditTrips';
import { TripsDetailModal } from './components/TripsDetails';
import { PageHeader } from '@/app/(dashboard)/PageHeader';

const trips = [
  {
    id: 'TRP001',
    clientOrganization: 'Clinic ABC',
    pickupLocation: '123 Medical Center Dr, Lagos',
    dropoffLocation: '456 Waste Facility Rd, Lagos',
    driverAssigned: 'John Smith',
    status: 'Completed',
    dateTime: '2025-08-22 09:00',
    notes: 'Medical waste pickup - handle with care',
    createdDate: '2025-08-20',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-22 08:00',
        note: 'Trip created',
      },
      {
        status: 'In Progress',
        timestamp: '2025-08-22 09:00',
        note: 'Driver started pickup',
      },
      {
        status: 'Completed',
        timestamp: '2025-08-22 11:30',
        note: 'Waste delivered successfully',
      },
    ],
  },
  {
    id: 'TRP002',
    clientOrganization: 'TechCorp Solutions',
    pickupLocation: '789 Business Park, Abuja',
    dropoffLocation: '321 Recycling Center, Abuja',
    driverAssigned: 'Sarah Johnson',
    status: 'In Progress',
    dateTime: '2025-08-23 14:00',
    notes: 'Electronic waste disposal',
    createdDate: '2025-08-21',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-23 13:30',
        note: 'Trip scheduled',
      },
      {
        status: 'In Progress',
        timestamp: '2025-08-23 14:00',
        note: 'Driver en route to pickup',
      },
    ],
  },
  {
    id: 'TRP003',
    clientOrganization: 'PharmaCare Industries',
    pickupLocation: '555 Pharma Complex, Port Harcourt',
    dropoffLocation: '777 Hazmat Facility, Port Harcourt',
    driverAssigned: 'Mike Davis',
    status: 'Pending',
    dateTime: '2025-08-24 10:00',
    notes: 'Pharmaceutical waste - requires special handling certification',
    createdDate: '2025-08-22',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-22 16:00',
        note: 'Trip scheduled for tomorrow',
      },
    ],
  },
  {
    id: 'TRP004',
    clientOrganization: 'WasteTech Solutions',
    pickupLocation: '999 Industrial Zone, Kano',
    dropoffLocation: '111 Treatment Plant, Kano',
    driverAssigned: 'Lisa Wilson',
    status: 'Cancelled',
    dateTime: '2025-08-21 08:00',
    notes: 'Industrial waste collection',
    createdDate: '2025-08-19',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2025-08-19 15:00',
        note: 'Trip created',
      },
      {
        status: 'Cancelled',
        timestamp: '2025-08-21 07:30',
        note: 'Client requested cancellation',
      },
    ],
  },
];

export function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'completed':
      return (
        <Badge className="bg-[#15941f] text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'in progress':
      return (
        <Badge variant="secondary" className="bg-blue-600 text-white">
          <Loader className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="secondary" className="bg-yellow-600 text-white">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function TripsPage() {
  const tripState = useTrips();
  const [, setTripsList] = useState(trips);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  const handleDelete = (tripId: string) => {
    setTripsList((prev) => prev.filter((trip) => trip.id !== tripId));
    setTripToDelete(null);
    toast.success('Trip deleted successfully');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Trips"
        subtitle="Manage waste collection and delivery trips"
      />

      <main className="flex-1 p-6">
        {/* Filters and Controls */}
        <Filters {...tripState} />

        {/* Trips Table */}
        <TripsTable {...tripState} />
      </main>

      {/* Trip Details Modal */}
      <TripsDetailModal {...tripState} />

      {/* Edit Trip Modal */}
      <EditTripModal {...tripState} />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!tripToDelete}
        onOpenChange={() => setTripToDelete(null)}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this trip? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => tripToDelete && handleDelete(tripToDelete)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// "use client"

// import { SidebarTrigger } from "@/components/ui/sidebar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import {
//   MapPin,
//   Plus,
//   Search,
//   Eye,
//   Edit,
//   Trash2,
//   MoreHorizontal,
//   Calendar,
//   Filter,
//   Download,
//   User,
//   Clock,
//   Navigation,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Loader,
// } from "lucide-react"
// import { useState } from "react"
// import { toast } from "sonner"

// const trips = [
//   {
//     id: "TRP001",
//     clientOrganization: "Clinic ABC",
//     pickupLocation: "123 Medical Center Dr, Lagos",
//     dropoffLocation: "456 Waste Facility Rd, Lagos",
//     driverAssigned: "John Smith",
//     status: "Completed",
//     dateTime: "2025-08-22 09:00",
//     notes: "Medical waste pickup - handle with care",
//     createdDate: "2025-08-20",
//     statusHistory: [
//       { status: "Pending", timestamp: "2025-08-22 08:00", note: "Trip created" },
//       { status: "In Progress", timestamp: "2025-08-22 09:00", note: "Driver started pickup" },
//       { status: "Completed", timestamp: "2025-08-22 11:30", note: "Waste delivered successfully" },
//     ],
//   },
//   {
//     id: "TRP002",
//     clientOrganization: "TechCorp Solutions",
//     pickupLocation: "789 Business Park, Abuja",
//     dropoffLocation: "321 Recycling Center, Abuja",
//     driverAssigned: "Sarah Johnson",
//     status: "In Progress",
//     dateTime: "2025-08-23 14:00",
//     notes: "Electronic waste disposal",
//     createdDate: "2025-08-21",
//     statusHistory: [
//       { status: "Pending", timestamp: "2025-08-23 13:30", note: "Trip scheduled" },
//       { status: "In Progress", timestamp: "2025-08-23 14:00", note: "Driver en route to pickup" },
//     ],
//   },
//   {
//     id: "TRP003",
//     clientOrganization: "PharmaCare Industries",
//     pickupLocation: "555 Pharma Complex, Port Harcourt",
//     dropoffLocation: "777 Hazmat Facility, Port Harcourt",
//     driverAssigned: "Mike Davis",
//     status: "Pending",
//     dateTime: "2025-08-24 10:00",
//     notes: "Pharmaceutical waste - requires special handling certification",
//     createdDate: "2025-08-22",
//     statusHistory: [{ status: "Pending", timestamp: "2025-08-22 16:00", note: "Trip scheduled for tomorrow" }],
//   },
//   {
//     id: "TRP004",
//     clientOrganization: "WasteTech Solutions",
//     pickupLocation: "999 Industrial Zone, Kano",
//     dropoffLocation: "111 Treatment Plant, Kano",
//     driverAssigned: "Lisa Wilson",
//     status: "Cancelled",
//     dateTime: "2025-08-21 08:00",
//     notes: "Industrial waste collection",
//     createdDate: "2025-08-19",
//     statusHistory: [
//       { status: "Pending", timestamp: "2025-08-19 15:00", note: "Trip created" },
//       { status: "Cancelled", timestamp: "2025-08-21 07:30", note: "Client requested cancellation" },
//     ],
//   },
// ]

// const clients = ["Clinic ABC", "TechCorp Solutions", "PharmaCare Industries", "WasteTech Solutions", "HealthCare Plus"]
// const drivers = ["John Smith", "Sarah Johnson", "Mike Davis", "Lisa Wilson", "Tom Brown", "Alex Chen"]

// export default function TripsPage() {
//   const [tripsList, setTripsList] = useState(trips)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [dateFilter, setDateFilter] = useState("all")
//   const [selectedTrip, setSelectedTrip] = useState<(typeof trips)[0] | null>(null)
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [tripToDelete, setTripToDelete] = useState<string | null>(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const tripsPerPage = 10

//   // Form state for create/edit
//   const [formData, setFormData] = useState({
//     clientOrganization: "",
//     pickupLocation: "",
//     dropoffLocation: "",
//     driverAssigned: "",
//     dateTime: "",
//     notes: "",
//     status: "Pending",
//   })

//   const filteredTrips = tripsList.filter((trip) => {
//     const matchesSearch =
//       trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.clientOrganization.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.driverAssigned.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesStatus = statusFilter === "all" || trip.status.toLowerCase() === statusFilter.toLowerCase()

//     const matchesDate = dateFilter === "all" || trip.dateTime.startsWith(dateFilter)

//     return matchesSearch && matchesStatus && matchesDate
//   })

//   const totalPages = Math.ceil(filteredTrips.length / tripsPerPage)
//   const startIndex = (currentPage - 1) * tripsPerPage
//   const paginatedTrips = filteredTrips.slice(startIndex, startIndex + tripsPerPage)

//   const handleViewDetails = (trip: (typeof trips)[0]) => {
//     setSelectedTrip(trip)
//     setIsDetailsModalOpen(true)
//   }

//   const handleEdit = (trip: (typeof trips)[0]) => {
//     setSelectedTrip(trip)
//     setFormData({
//       clientOrganization: trip.clientOrganization,
//       pickupLocation: trip.pickupLocation,
//       dropoffLocation: trip.dropoffLocation,
//       driverAssigned: trip.driverAssigned,
//       dateTime: trip.dateTime,
//       notes: trip.notes,
//       status: trip.status,
//     })
//     setIsEditModalOpen(true)
//   }

//   const handleDelete = (tripId: string) => {
//     setTripsList((prev) => prev.filter((trip) => trip.id !== tripId))
//     setTripToDelete(null)
//     toast.success("Trip deleted successfully")
//   }

//   const handleCreateTrip = () => {
//     const newTrip = {
//       id: `TRP${String(tripsList.length + 1).padStart(3, "0")}`,
//       ...formData,
//       createdDate: new Date().toISOString().split("T")[0],
//       statusHistory: [
//         {
//           status: formData.status,
//           timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
//           note: "Trip created",
//         },
//       ],
//     }
//     setTripsList((prev) => [newTrip, ...prev])
//     setIsCreateModalOpen(false)
//     resetForm()
//     toast.success("Trip created successfully")
//   }

//   const handleUpdateTrip = () => {
//     if (!selectedTrip) return
//     setTripsList((prev) =>
//       prev.map((trip) =>
//         trip.id === selectedTrip.id
//           ? {
//               ...trip,
//               ...formData,
//               statusHistory:
//                 trip.status !== formData.status
//                   ? [
//                       ...trip.statusHistory,
//                       {
//                         status: formData.status,
//                         timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
//                         note: "Status updated",
//                       },
//                     ]
//                   : trip.statusHistory,
//             }
//           : trip,
//       ),
//     )
//     setIsEditModalOpen(false)
//     resetForm()
//     toast.success("Trip updated successfully")
//   }

//   const handleQuickStatusUpdate = (tripId: string, newStatus: string) => {
//     setTripsList((prev) =>
//       prev.map((trip) =>
//         trip.id === tripId
//           ? {
//               ...trip,
//               status: newStatus,
//               statusHistory: [
//                 ...trip.statusHistory,
//                 {
//                   status: newStatus,
//                   timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
//                   note: "Quick status update",
//                 },
//               ],
//             }
//           : trip,
//       ),
//     )
//     toast.success(`Trip status updated to ${newStatus}`)
//   }

//   const resetForm = () => {
//     setFormData({
//       clientOrganization: "",
//       pickupLocation: "",
//       dropoffLocation: "",
//       driverAssigned: "",
//       dateTime: "",
//       notes: "",
//       status: "Pending",
//     })
//     setSelectedTrip(null)
//   }

//   const handleExport = (type: "csv" | "pdf") => {
//     toast.success(`${type.toUpperCase()} export started for ${filteredTrips.length} trips`)
//   }

//   const getStatusBadge = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "completed":
//         return (
//           <Badge className="bg-[#15941f] text-white">
//             <CheckCircle className="h-3 w-3 mr-1" />
//             Completed
//           </Badge>
//         )
//       case "in progress":
//         return (
//           <Badge variant="secondary" className="bg-blue-600 text-white">
//             <Loader className="h-3 w-3 mr-1" />
//             In Progress
//           </Badge>
//         )
//       case "pending":
//         return (
//           <Badge variant="secondary" className="bg-yellow-600 text-white">
//             <AlertCircle className="h-3 w-3 mr-1" />
//             Pending
//           </Badge>
//         )
//       case "cancelled":
//         return (
//           <Badge variant="destructive">
//             <XCircle className="h-3 w-3 mr-1" />
//             Cancelled
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   const formatDateTime = (dateTime: string) => {
//     return new Date(dateTime).toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   return (
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
//           <SidebarTrigger className="text-white hover:bg-gray-800" />
//           <div className="flex-1">
//             <h1 className="text-xl font-semibold text-white">Trips</h1>
//             <p className="text-sm text-gray-400">Manage waste collection and delivery trips</p>
//           </div>
//           <div className="flex gap-2">
//             <Button
//               onClick={() => handleExport("csv")}
//               variant="outline"
//               className="border-gray-600 text-gray-300 hover:bg-gray-700"
//             >
//               <Download className="h-4 w-4 mr-2" />
//               Export CSV
//             </Button>
//             <Button onClick={() => handleExport("pdf")} className="primary-button">
//               <Download className="h-4 w-4 mr-2" />
//               Export PDF
//             </Button>
//           </div>
//         </header>

//         <main className="flex-1 p-6">
//           {/* Filters and Controls */}
//           <Card className="dashboard-card mb-6">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-white flex items-center gap-2">
//                   <MapPin className="h-5 w-5" />
//                   Trips Management ({filteredTrips.length})
//                 </CardTitle>
//                 <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//                   <DialogTrigger asChild>
//                     <Button className="primary-button">
//                       <Plus className="h-4 w-4 mr-2" />
//                       New Trip
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
//                     <DialogHeader>
//                       <DialogTitle>Create New Trip</DialogTitle>
//                       <DialogDescription className="text-gray-400">
//                         Schedule a new waste collection or delivery trip.
//                       </DialogDescription>
//                     </DialogHeader>
//                     <div className="grid gap-4 py-4">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <Label htmlFor="client" className="text-gray-300">
//                             Client / Organization
//                           </Label>
//                           <Select
//                             value={formData.clientOrganization}
//                             onValueChange={(value) => setFormData({ ...formData, clientOrganization: value })}
//                           >
//                             <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
//                               <SelectValue placeholder="Select client" />
//                             </SelectTrigger>
//                             <SelectContent className="bg-gray-700 border-gray-600">
//                               {clients.map((client) => (
//                                 <SelectItem key={client} value={client}>
//                                   {client}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
//                         <div>
//                           <Label htmlFor="driver" className="text-gray-300">
//                             Driver Assigned
//                           </Label>
//                           <Select
//                             value={formData.driverAssigned}
//                             onValueChange={(value) => setFormData({ ...formData, driverAssigned: value })}
//                           >
//                             <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
//                               <SelectValue placeholder="Select driver" />
//                             </SelectTrigger>
//                             <SelectContent className="bg-gray-700 border-gray-600">
//                               {drivers.map((driver) => (
//                                 <SelectItem key={driver} value={driver}>
//                                   {driver}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       </div>
//                       <div>
//                         <Label htmlFor="pickup" className="text-gray-300">
//                           Pickup Address
//                         </Label>
//                         <Input
//                           id="pickup"
//                           value={formData.pickupLocation}
//                           onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
//                           placeholder="Enter pickup location"
//                           className="bg-gray-700 border-gray-600 text-white"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="dropoff" className="text-gray-300">
//                           Dropoff Address
//                         </Label>
//                         <Input
//                           id="dropoff"
//                           value={formData.dropoffLocation}
//                           onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
//                           placeholder="Enter dropoff location"
//                           className="bg-gray-700 border-gray-600 text-white"
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <Label htmlFor="datetime" className="text-gray-300">
//                             Trip Date & Time
//                           </Label>
//                           <Input
//                             id="datetime"
//                             type="datetime-local"
//                             value={formData.dateTime}
//                             onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
//                             className="bg-gray-700 border-gray-600 text-white"
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="status" className="text-gray-300">
//                             Status
//                           </Label>
//                           <Select
//                             value={formData.status}
//                             onValueChange={(value) => setFormData({ ...formData, status: value })}
//                           >
//                             <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent className="bg-gray-700 border-gray-600">
//                               <SelectItem value="Pending">Pending</SelectItem>
//                               <SelectItem value="In Progress">In Progress</SelectItem>
//                               <SelectItem value="Completed">Completed</SelectItem>
//                               <SelectItem value="Cancelled">Cancelled</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       </div>
//                       <div>
//                         <Label htmlFor="notes" className="text-gray-300">
//                           Notes / Special Instructions
//                         </Label>
//                         <Textarea
//                           id="notes"
//                           value={formData.notes}
//                           onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                           placeholder="Enter any special instructions or notes"
//                           className="bg-gray-700 border-gray-600 text-white"
//                           rows={3}
//                         />
//                       </div>
//                     </div>
//                     <DialogFooter>
//                       <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
//                         Cancel
//                       </Button>
//                       <Button onClick={handleCreateTrip} className="primary-button">
//                         Create Trip
//                       </Button>
//                     </DialogFooter>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <Input
//                     placeholder="Search by trip ID, driver, client, or location..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//                   />
//                 </div>
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
//                     <Filter className="h-4 w-4 mr-2" />
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-700 border-gray-600">
//                     <SelectItem value="all">All Status</SelectItem>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="in progress">In Progress</SelectItem>
//                     <SelectItem value="completed">Completed</SelectItem>
//                     <SelectItem value="cancelled">Cancelled</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select value={dateFilter} onValueChange={setDateFilter}>
//                   <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     <SelectValue placeholder="Date" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-700 border-gray-600">
//                     <SelectItem value="all">All Dates</SelectItem>
//                     <SelectItem value="2025-08-24">Today</SelectItem>
//                     <SelectItem value="2025-08-23">Yesterday</SelectItem>
//                     <SelectItem value="2025-08-22">2 days ago</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Trips Table */}
//           <Card className="dashboard-card">
//             <CardContent className="p-0">
//               {filteredTrips.length === 0 ? (
//                 <div className="text-center py-12">
//                   <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-white mb-2">No trips found</h3>
//                   <p className="text-gray-400">No trips match your current search and filter criteria.</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="rounded-md border border-gray-700">
//                     <Table>
//                       <TableHeader>
//                         <TableRow className="border-gray-700 hover:bg-gray-800">
//                           <TableHead className="text-gray-300">Trip ID</TableHead>
//                           <TableHead className="text-gray-300">Client / Organization</TableHead>
//                           <TableHead className="text-gray-300">Route</TableHead>
//                           <TableHead className="text-gray-300">Driver</TableHead>
//                           <TableHead className="text-gray-300">Status</TableHead>
//                           <TableHead className="text-gray-300">Date & Time</TableHead>
//                           <TableHead className="text-gray-300">Actions</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {paginatedTrips.map((trip) => (
//                           <TableRow key={trip.id} className="border-gray-700 hover:bg-gray-800">
//                             <TableCell className="font-medium text-white">{trip.id}</TableCell>
//                             <TableCell className="text-gray-300">{trip.clientOrganization}</TableCell>
//                             <TableCell className="text-gray-300">
//                               <div className="flex flex-col gap-1">
//                                 <span className="text-sm flex items-center gap-1">
//                                   <Navigation className="h-3 w-3 text-green-500" />
//                                   {trip.pickupLocation.split(",")[0]}
//                                 </span>
//                                 <span className="text-sm flex items-center gap-1">
//                                   <MapPin className="h-3 w-3 text-red-500" />
//                                   {trip.dropoffLocation.split(",")[0]}
//                                 </span>
//                               </div>
//                             </TableCell>
//                             <TableCell className="text-gray-300 flex items-center gap-1">
//                               <User className="h-3 w-3" />
//                               {trip.driverAssigned}
//                             </TableCell>
//                             <TableCell>{getStatusBadge(trip.status)}</TableCell>
//                             <TableCell className="text-gray-300">
//                               <div className="flex items-center gap-1">
//                                 <Clock className="h-3 w-3" />
//                                 {formatDateTime(trip.dateTime)}
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <div className="flex items-center gap-2">
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => handleViewDetails(trip)}
//                                   className="border-gray-600 text-gray-300 hover:bg-gray-700"
//                                 >
//                                   <Eye className="h-3 w-3 mr-1" />
//                                   View
//                                 </Button>
//                                 <DropdownMenu>
//                                   <DropdownMenuTrigger asChild>
//                                     <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-700">
//                                       <MoreHorizontal className="h-4 w-4" />
//                                     </Button>
//                                   </DropdownMenuTrigger>
//                                   <DropdownMenuContent align="end" className="bg-gray-700 border-gray-600">
//                                     <DropdownMenuItem
//                                       className="text-gray-300 hover:bg-gray-600"
//                                       onClick={() => handleEdit(trip)}
//                                     >
//                                       <Edit className="mr-2 h-4 w-4" />
//                                       Edit Trip
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem
//                                       className="text-gray-300 hover:bg-gray-600"
//                                       onClick={() => handleQuickStatusUpdate(trip.id, "Completed")}
//                                       disabled={trip.status === "Completed"}
//                                     >
//                                       <CheckCircle className="mr-2 h-4 w-4" />
//                                       Mark Complete
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem
//                                       className="text-red-400 hover:bg-gray-600"
//                                       onClick={() => setTripToDelete(trip.id)}
//                                     >
//                                       <Trash2 className="mr-2 h-4 w-4" />
//                                       Delete
//                                     </DropdownMenuItem>
//                                   </DropdownMenuContent>
//                                 </DropdownMenu>
//                               </div>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="flex items-center justify-between mt-6 px-6 pb-6">
//                       <div className="text-sm text-gray-400">
//                         Showing {startIndex + 1}-{Math.min(startIndex + tripsPerPage, filteredTrips.length)} of{" "}
//                         {filteredTrips.length}
//                       </div>
//                       <div className="flex gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                           disabled={currentPage === 1}
//                           className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
//                         >
//                           Previous
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                           disabled={currentPage === totalPages}
//                           className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
//                         >
//                           Next
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         </main>

//         {/* Trip Details Modal */}
//         <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
//           <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-3xl">
//             <DialogHeader>
//               <DialogTitle className="flex items-center gap-2">
//                 <MapPin className="h-5 w-5" />
//                 Trip Details - {selectedTrip?.id}
//               </DialogTitle>
//               <DialogDescription className="text-gray-400">
//                 Complete information about this waste collection trip.
//               </DialogDescription>
//             </DialogHeader>

//             {selectedTrip && (
//               <div className="space-y-6 py-4 max-h-96 overflow-y-auto">
//                 {/* Trip Metadata */}
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Trip Information</h3>
//                     <div className="space-y-3">
//                       <div>
//                         <Label className="text-gray-400 text-sm">Trip ID</Label>
//                         <p className="text-white font-medium">{selectedTrip.id}</p>
//                       </div>
//                       <div>
//                         <Label className="text-gray-400 text-sm">Client / Organization</Label>
//                         <p className="text-white">{selectedTrip.clientOrganization}</p>
//                       </div>
//                       <div>
//                         <Label className="text-gray-400 text-sm">Driver Assigned</Label>
//                         <p className="text-white flex items-center gap-2">
//                           <User className="h-4 w-4" />
//                           {selectedTrip.driverAssigned}
//                         </p>
//                       </div>
//                       <div>
//                         <Label className="text-gray-400 text-sm">Status</Label>
//                         <div className="mt-1">{getStatusBadge(selectedTrip.status)}</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Schedule</h3>
//                     <div className="space-y-3">
//                       <div>
//                         <Label className="text-gray-400 text-sm">Scheduled Date & Time</Label>
//                         <p className="text-white flex items-center gap-2">
//                           <Clock className="h-4 w-4" />
//                           {formatDateTime(selectedTrip.dateTime)}
//                         </p>
//                       </div>
//                       <div>
//                         <Label className="text-gray-400 text-sm">Created Date</Label>
//                         <p className="text-white flex items-center gap-2">
//                           <Calendar className="h-4 w-4" />
//                           {selectedTrip.createdDate}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route Details */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Route Details</h3>
//                   <div className="grid grid-cols-1 gap-4">
//                     <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
//                       <Label className="text-gray-400 text-sm flex items-center gap-2">
//                         <Navigation className="h-4 w-4 text-green-500" />
//                         Pickup Location
//                       </Label>
//                       <p className="text-white mt-1">{selectedTrip.pickupLocation}</p>
//                     </div>
//                     <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
//                       <Label className="text-gray-400 text-sm flex items-center gap-2">
//                         <MapPin className="h-4 w-4 text-red-500" />
//                         Dropoff Location
//                       </Label>
//                       <p className="text-white mt-1">{selectedTrip.dropoffLocation}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Notes */}
//                 {selectedTrip.notes && (
//                   <div className="space-y-2">
//                     <Label className="text-gray-400 text-sm">Notes / Special Instructions</Label>
//                     <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
//                       <p className="text-gray-300 text-sm">{selectedTrip.notes}</p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Status History */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Status Timeline</h3>
//                   <div className="space-y-3">
//                     {selectedTrip.statusHistory.map((entry, index) => (
//                       <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
//                         <div className="flex-shrink-0">{getStatusBadge(entry.status)}</div>
//                         <div className="flex-1">
//                           <p className="text-white text-sm">{entry.note}</p>
//                           <p className="text-gray-400 text-xs">{entry.timestamp}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>
//                 Close
//               </Button>
//               <Button onClick={() => selectedTrip && handleEdit(selectedTrip)} className="primary-button">
//                 <Edit className="h-4 w-4 mr-2" />
//                 Edit Trip
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Edit Trip Modal */}
//         <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//           <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>Edit Trip - {selectedTrip?.id}</DialogTitle>
//               <DialogDescription className="text-gray-400">Update trip information and status.</DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="edit-client" className="text-gray-300">
//                     Client / Organization
//                   </Label>
//                   <Select
//                     value={formData.clientOrganization}
//                     onValueChange={(value) => setFormData({ ...formData, clientOrganization: value })}
//                   >
//                     <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-700 border-gray-600">
//                       {clients.map((client) => (
//                         <SelectItem key={client} value={client}>
//                           {client}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-driver" className="text-gray-300">
//                     Driver Assigned
//                   </Label>
//                   <Select
//                     value={formData.driverAssigned}
//                     onValueChange={(value) => setFormData({ ...formData, driverAssigned: value })}
//                   >
//                     <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-700 border-gray-600">
//                       {drivers.map((driver) => (
//                         <SelectItem key={driver} value={driver}>
//                           {driver}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="edit-pickup" className="text-gray-300">
//                   Pickup Address
//                 </Label>
//                 <Input
//                   id="edit-pickup"
//                   value={formData.pickupLocation}
//                   onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="edit-dropoff" className="text-gray-300">
//                   Dropoff Address
//                 </Label>
//                 <Input
//                   id="edit-dropoff"
//                   value={formData.dropoffLocation}
//                   onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="edit-datetime" className="text-gray-300">
//                     Trip Date & Time
//                   </Label>
//                   <Input
//                     id="edit-datetime"
//                     type="datetime-local"
//                     value={formData.dateTime}
//                     onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
//                     className="bg-gray-700 border-gray-600 text-white"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-status" className="text-gray-300">
//                     Status
//                   </Label>
//                   <Select
//                     value={formData.status}
//                     onValueChange={(value) => setFormData({ ...formData, status: value })}
//                   >
//                     <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-700 border-gray-600">
//                       <SelectItem value="Pending">Pending</SelectItem>
//                       <SelectItem value="In Progress">In Progress</SelectItem>
//                       <SelectItem value="Completed">Completed</SelectItem>
//                       <SelectItem value="Cancelled">Cancelled</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="edit-notes" className="text-gray-300">
//                   Notes / Special Instructions
//                 </Label>
//                 <Textarea
//                   id="edit-notes"
//                   value={formData.notes}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   className="bg-gray-700 border-gray-600 text-white"
//                   rows={3}
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setIsEditModalOpen(false)
//                   resetForm()
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleUpdateTrip} className="primary-button">
//                 Update Trip
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Delete Confirmation Dialog */}
//         <AlertDialog open={!!tripToDelete} onOpenChange={() => setTripToDelete(null)}>
//           <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
//             <AlertDialogHeader>
//               <AlertDialogTitle>Delete Trip</AlertDialogTitle>
//               <AlertDialogDescription className="text-gray-400">
//                 Are you sure you want to delete this trip? This action cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-700">Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => tripToDelete && handleDelete(tripToDelete)}
//                 className="bg-red-600 hover:bg-red-700 text-white"
//               >
//                 Delete Trip
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//   )
// }
