'use client';

import axios from 'axios';
import { useApplicationForm } from '../ApplicationForm/useApplicationForm';

const initialAdminState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  orgType: '',
  orgName: '',
  country: '',
  region: '',
  state: '',
  dry: '',
  icoRegistered: false, // toggle
  icoNumber: '', // conditional input
  adminMessage: '',
  acceptTerms: false,
  acceptCookies: false,
};

type AdminForm = typeof initialAdminState;

const validateAdmin = (formData: AdminForm) => {
  const errors: Partial<Record<keyof AdminForm, string>> & {
    general?: string;
  } = {};

  if (!formData.name.trim()) errors.name = 'Full name is required';
  if (!formData.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = 'Enter a valid email';

  if (!formData.password) errors.password = 'Password is required';
  else if (formData.password.length < 6)
    errors.password = 'Password must be at least 6 characters';

  if (!formData.confirmPassword)
    errors.confirmPassword = 'Please confirm your password';
  else if (formData.password !== formData.confirmPassword)
    errors.confirmPassword = 'Passwords do not match';

  if (!formData.orgType.trim())
    errors.orgType = 'Organization type is required';
  if (!formData.orgName.trim())
    errors.orgName = 'Organization name is required';
  if (!formData.country.trim()) errors.country = 'Country  is required';
  if (!formData.region.trim()) errors.region = 'Region  is required';
  if (!formData.state.trim()) errors.state = 'state is required';

  if (!formData.dry.trim()) errors.dry = 'Data Retention Years is required';

  if (formData.icoRegistered && !formData.icoNumber.trim()) {
    errors.icoNumber = 'ICO registration number is required';
  }

  if (!formData.acceptTerms)
    errors.acceptTerms = 'You must accept the terms and conditions';

  return errors;
};

const transformAdminData = (formData: AdminForm) => ({
  full_name: formData.name,
  email: formData.email,
  password: formData.password,
  organization_type: formData.orgType,
  organization_name: formData.orgName,
  organization_country: formData.country,
  organization_region: formData.region,
  organization_state: formData.state,
  data_retention_years: formData.dry,
  ico_registered: formData.icoRegistered,
  ico_registration_number: formData.icoNumber || null,
  message: formData.adminMessage,
});

const submitAdmin = async (data: AdminForm) => {
  await axios.post(
    'https://medilogic-backend.onrender.com/apply',
    {
      ...transformAdminData(data),
      role: 'admin',
      status: 'pending',
      submitted_at: new Date().toISOString(),
    }
  );
};

export const useApplyAdmin = () =>
  useApplicationForm<AdminForm>({
    initialState: initialAdminState,
    validate: validateAdmin,
    transformSubmit: transformAdminData,
    role: 'admin',
    submit: submitAdmin,
  });
