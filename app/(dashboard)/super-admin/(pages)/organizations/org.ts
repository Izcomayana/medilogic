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
  ico_registration_number?: string;
  data_retention_years?: number;
  postal_code?: string;
  license_expiry?: string;
  license_number?: string;
  waste_processing_capability?: string;
  delivery_capacity?: 0;
  contact_person_name?: 'string';
  contact_person_role?: 'string';
  latitude?: number;
  longitude?: number;
  supported_waste_type?: string[];
}
