// super-admin/(pages)/organizations/org.ts

import axios from 'axios';

export interface Organization {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  createdDate: string;
  userCount: number;
  tripCount?: number;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  invite_code?: string;
  ico_registered?: boolean;
  data_retention_years?: number;
  postal_code?: string;
  license_number?: string;
  waste_processing_capability?: string;
  delivery_capacity?: 0;
  contact_person_name?: 'string';
  contact_person_role?: 'string';
  latitude?: number;
  longitude?: number;
  supported_waste_type?: string[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
// 👆 make sure you set NEXT_PUBLIC_API_BASE_URL in your .env

// ✅ Activate Organization
export async function activateOrganization(
  orgId: string
): Promise<Organization> {
  const res = await axios.patch(`${API_BASE}/super/${orgId}/activate`);
  return res.data;
}

// ✅ Deactivate Organization
export async function deactivateOrganization(
  orgId: string
): Promise<Organization> {
  const res = await axios.delete(`${API_BASE}/super/${orgId}`);
  return res.data;
}

// ✅ Fetch all organizations
export async function fetchOrganizations(): Promise<Organization[]> {
  const res = await axios.get(`${API_BASE}/super/organizations`);
  return res.data;
}

// ✅ Fetch single organization
export async function fetchOrganization(orgId: string): Promise<Organization> {
  const res = await axios.get(`${API_BASE}/super/organizations/${orgId}`);
  return res.data;
}

// ✅ Create new organization
export async function createOrganization(
  data: Partial<Organization>
): Promise<Organization> {
  const res = await axios.post(`${API_BASE}/super/organizations`, data);
  return res.data;
}

// ✅ Update organization
export async function updateOrganization(
  orgId: string,
  data: Partial<Organization>
): Promise<Organization> {
  const res = await axios.patch(
    `${API_BASE}/super/organizations/${orgId}`,
    data
  );
  return res.data;
}
