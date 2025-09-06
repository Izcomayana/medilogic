export const clients = [
  'Clinic ABC',
  'TechCorp Solutions',
  'PharmaCare Industries',
  'WasteTech Solutions',
  'HealthCare Plus',
];

export const drivers = [
  'John Smith',
  'Sarah Johnson',
  'Mike Davis',
  'Lisa Wilson',
  'Tom Brown',
  'Alex Chen',
];

export const trips = [
  {
    id: 'TRP001',
    clientOrganization: 'Clinic ABC',
    pickupLocation: '123 Medical Center Dr, Lagos',
    dropoffLocation: '456 Waste Facility Rd, Lagos',
    driverAssigned: 'John Smith',
    status: 'Completed',
    priority: 'Normal',
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
    priority: 'Urgent',
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
    priority: 'Normal',
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
