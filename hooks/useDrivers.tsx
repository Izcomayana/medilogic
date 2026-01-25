// useDriver.ts
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuthorizedRequest } from '@/hooks/useRequest';
import { toast } from 'sonner';

export type BackendDriver = {
  id: string;
  short_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_verified: boolean;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  region: string;
  address: string;
  zip_code: string;
  license_number: string;
  license_expiry: string;
  vehicle_type: string;
  preferred_role: string;
  experience_years: number;
  status: 'submitted' | 'approved' | 'rejected';
  subscription_status: string;
  subscription_plan: string;
  badge_type: string;
};

export type BackendDriverFull = BackendDriver & {
  date_of_birth?: string;
  drivers_license?: string;
  dvla_check_code?: string;
  proof_of_id_address?: string;
  mot_certificate?: string;
  vehicle_insurance?: string;
  waste_carrier_license?: string;
  adr_certificate?: string;
  dbs_check?: string;
  professional_id_photo?: string;
};

/* Only fields backend allows updating */
export type EditableDriverPayload = Partial<
  Pick<
    BackendDriverFull,
    | 'name'
    | 'email'
    | 'phone_number'
    | 'country'
    | 'state'
    | 'region'
    | 'address'
    | 'zip_code'
    | 'date_of_birth'
    | 'license_number'
    | 'license_expiry'
    | 'vehicle_type'
    | 'preferred_role'
    | 'experience_years'
  >
>;

export type PendingDriver = {
  id: string;
  backendId: string;
  name: string;
  email: string;
  submittedDate: string;
  status: 'pending';
};

export type ApprovedDriver = {
  id: string;
  backendId: string;
  name: string;
  email: string;
  approvedDate: string;
  status: 'approved';
};

export type Driver = PendingDriver | ApprovedDriver;

export function useDrivers() {
  const authorizedRequest = useAuthorizedRequest();

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] =
    useState<BackendDriverFull | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  // const [driver, setDriver] = useState

  const mapBackendDriverToUI = (d: BackendDriver): Driver | null => {
    if (d.status === 'submitted') {
      return {
        id: d.short_id,
        backendId: d.id,
        name: d.name,
        email: d.email,
        status: 'pending',
        submittedDate: d.created_at.split('T')[0],
      };
    }

    if (d.status === 'approved') {
      return {
        id: d.short_id,
        backendId: d.id,
        name: d.name,
        email: d.email,
        status: 'approved',
        approvedDate: d.updated_at.split('T')[0],
      };
    }

    return null;
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        await authorizedRequest(async (token) => {
          const res = await api.get<BackendDriver[]>('/Medilogic_drivers/', {
            headers: { Authorization: `Bearer ${token}` },
          });

          setDrivers(
            res.data
              .map(mapBackendDriverToUI)
              .filter((d): d is Driver => d !== null)
          );
        }, 'failed to get drivers');
      } catch {
        toast.error('Failed to fetch drivers');
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

    const viewDriver = async (driver: Driver) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.get<BackendDriverFull>(
          `/Medilogic_drivers/${driver.backendId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSelectedDriver(res.data);
        setDetailsOpen(true);
      }, 'Failed to fetch driver');
    } catch {
      toast.error('Unable to load driver details');
    }
  };

  const fetchDriverById = async (backendId: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.get<BackendDriverFull>(
          `/Medilogic_drivers/${backendId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSelectedDriver(res.data);
        // setDetailsOpen(true);
      }, 'failed to fetch driver');
    } catch {
      toast.error('Unable to load driver details');
    }
  };

  const updateDriver = async (
    backendId: string,
    payload: EditableDriverPayload
  ) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.put<BackendDriverFull>(
          `/Medilogic_drivers/${backendId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setSelectedDriver(res.data);
        toast.success('Driver profile updated');
      }, 'failed update to update driver');
    } catch {
      toast.error('Failed to update driver');
    }
  };

  const handleApprove = async (backendId: string) => {
    try {
      await authorizedRequest(async (token) => {
        const res = await api.patch<BackendDriver>(
          `/Medilogic_drivers/super/${backendId}/approve`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDrivers((prev) =>
          prev.map((d) =>
            d.backendId === res.data.id
              ? {
                  id: res.data.short_id,
                  backendId: res.data.id,
                  name: res.data.name,
                  email: res.data.email,
                  status: 'approved',
                  approvedDate: res.data.updated_at.split('T')[0],
                }
              : d
          )
        );

        setDetailsOpen(false);
        setSelectedDriver(null);
        toast.success('Driver approved');
      }, 'failed to approve driver');
    } catch {
      toast.error('Unable to approve driver');
    }
  };

  const handleReject = async (backendId: string) => {
    try {
      await authorizedRequest(async (token) => {
        await api.patch(
          `/Medilogic_drivers/${backendId}/reject`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDrivers((prev) => prev.filter((d) => d.backendId !== backendId));
        setDetailsOpen(false);
        setSelectedDriver(null);
        toast.success('Driver rejected');
      }, 'failed to reject driver');
    } catch {
      toast.error('Unable to reject driver');
    }
  };

    const pendingList = drivers.filter(
    (d): d is PendingDriver => d.status === 'pending'
  );

  return {
    drivers,
    loading,
    selectedDriver,
    detailsOpen,
    setDetailsOpen,
    viewDriver,
    fetchDriverById,
    updateDriver,
    handleApprove,
    handleReject,
    pendingList,
  };
}




// 'use client';

// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api';
// import { useAuthorizedRequest } from '@/hooks/useRequest';
// import { toast } from 'sonner';

// export type BackendDriver = {
//   id: string;
//   short_id: string;
//   created_at: string;
//   updated_at: string;
//   is_active: boolean;
//   is_verified: boolean;
//   name: string;
//   email: string;
//   phone_number: string;
//   country: string;
//   state: string;
//   region: string;
//   address: string;
//   zip_code: string;
//   license_number: string;
//   license_expiry: string;
//   vehicle_type: string;
//   preferred_role: string;
//   experience_years: number;
//   status: 'submitted' | 'approved' | 'rejected';
//   subscription_status: string;
//   subscription_plan: string;
//   badge_type: string;
// };

// export type BackendDriverFull = BackendDriver & {
//   date_of_birth?: string;
//   drivers_license?: string;
//   dvla_check_code?: string;
//   proof_of_id_address?: string;
//   mot_certificate?: string;
//   vehicle_insurance?: string;
//   waste_carrier_license?: string;
//   adr_certificate?: string;
//   dbs_check?: string;
//   professional_id_photo?: string;
// };

// export type PendingDriver = {
//   id: string;
//   backendId: string;
//   name: string;
//   email: string;
//   submittedDate: string;
//   status: 'pending';
// };

// export type ApprovedDriver = {
//   id: string;
//   backendId: string;
//   name: string;
//   email: string;
//   approvedDate: string;
//   status: 'approved';
// };

// export type Driver = PendingDriver | ApprovedDriver;

// export function useDrivers() {
  // const authorizedRequest = useAuthorizedRequest();
//   const [drivers, setDrivers] = useState<Driver[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDriver, setSelectedDriver] =
//     useState<BackendDriverFull | null>(null);
//   const [detailsOpen, setDetailsOpen] = useState(false);

//   const mapBackendDriverToUI = (d: BackendDriver): Driver | null => {
//     if (d.status === 'submitted') {
//       return {
//         id: d.short_id,
//         backendId: d.id,
//         name: d.name,
//         email: d.email,
//         status: 'pending',
//         submittedDate: d.created_at.split('T')[0],
//       };
//     }

//     if (d.status === 'approved') {
//       return {
//         id: d.short_id,
//         backendId: d.id,
//         name: d.name,
//         email: d.email,
//         status: 'approved',
//         approvedDate: d.updated_at.split('T')[0],
//       };
//     }

//     return null;
//   };

//   useEffect(() => {
//     const fetchDrivers = async () => {
//       try {
//         await authorizedRequest(async (token) => {
//           const res = await api.get<BackendDriver[]>('/Medilogic_drivers/', {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           const mappedDrivers = res.data
//             .map(mapBackendDriverToUI)
//             .filter((d): d is Driver => d !== null);

//           setDrivers(mappedDrivers);
//         }, 'failed to get drivers');
//       } catch (error) {
//         toast.error('Failed to fetch drivers');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDrivers();
//   }, []);

  // const viewDriver = async (driver: Driver) => {
  //   try {
  //     await authorizedRequest(async (token) => {
  //       const res = await api.get<BackendDriverFull>(
  //         `/Medilogic_drivers/${driver.backendId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setSelectedDriver(res.data);
  //       setDetailsOpen(true);
  //     }, 'Failed to fetch driver');
  //   } catch {
  //     toast.error('Unable to load driver details');
  //   }
  // };

//   const handleApprove = async (backendId: string) => {
//     try {
//       await authorizedRequest(async (token) => {
//         const res = await api.patch<BackendDriver>(
//           `/Medilogic_drivers/super/${backendId}/approve`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const approvedDriver = res.data;

//         setDrivers((prev) =>
//           prev.map((d) =>
//             d.backendId === approvedDriver.id
//               ? {
//                   id: approvedDriver.short_id,
//                   backendId: approvedDriver.id,
//                   name: approvedDriver.name,
//                   email: approvedDriver.email,
//                   status: 'approved',
//                   approvedDate: approvedDriver.updated_at.split('T')[0],
//                 }
//               : d
//           )
//         );

//         toast.success('Driver approved successfully');
//         setDetailsOpen(false);
//         setSelectedDriver(null);
//       }, 'Failed to approve driver');
//     } catch (error) {
//       console.error(error);
//       toast.error('Unable to approve driver');
//     }
//   };

//   const handleReject = async (backendId: string) => {
//     try {
//       await authorizedRequest(async (token) => {
//         await api.patch(
//           `/Medilogic_drivers/${backendId}/reject`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Remove from UI list (rejected not displayed for now)
//         setDrivers((prev) => prev.filter((d) => d.backendId !== backendId));

//         toast.success('Driver rejected successfully');
//         setDetailsOpen(false);
//         setSelectedDriver(null);
//       }, 'Failed to reject driver');
//     } catch (error) {
//       console.error(error);
//       toast.error('Unable to reject driver');
//     }
//   };

  // const pendingList = drivers.filter(
  //   (d): d is PendingDriver => d.status === 'pending'
  // );

//   return {
//     drivers,
//     setDrivers,
//     loading,
//     selectedDriver,
//     detailsOpen,
//     setDetailsOpen,
//     pendingList,
//     viewDriver,
//     handleApprove,
//     handleReject,
//   };
// }
