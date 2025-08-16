export interface Organization {
  id: string;
  name: string;
  type: string;
  status: boolean;
  createdDate: string;
  userCount: number;
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
  contact_person_name?: "string";
  contact_person_role?: "string";
  latitude?: number;
  longitude?: number;
}
