'use client';

import axios from 'axios';
import { useApplicationForm } from '../ApplicationForm/useApplicationForm';

export type DriverFormData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  country: string;
  region: string;
  address: string;
  zip_code: string;
  acceptTerms: boolean;
  acceptCookies: boolean;
};

const initialDriverFormData: DriverFormData = {
  name: '',
  email: '',
  phone_number: '',
  password: '',
  confirm_password: '',
  country: '',
  region: '',
  address: '',
  zip_code: '',
  acceptTerms: false,
  acceptCookies: false,
};

const validateDriverForm = (data: DriverFormData) => {
  const errors: Partial<Record<keyof DriverFormData, string>> = {};

  if (!data.name.trim()) errors.name = 'Full name is required';

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email';
  }

  if (!data.password.trim()) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!data.confirm_password.trim()) {
    errors.confirm_password = 'Please confirm your password';
  } else if (data.password !== data.confirm_password) {
    errors.confirm_password = 'Passwords do not match';
  }

  if (!data.phone_number.trim())
    errors.phone_number = 'Phone number is required';

  if (!data.country.trim()) errors.country = 'Country is required';
  if (!data.region.trim()) errors.region = 'Region is required';
  if (!data.address.trim()) errors.address = 'Address is required';
  if (!data.zip_code.trim()) errors.zip_code = 'Zip code is required';

  if (!data.acceptTerms) errors.acceptTerms = 'You must accept the terms';

  return errors;
};

const submitDriver = async (data: DriverFormData) => {
  await axios.post(
    'https://medilogic-backend.onrender.com/Medilogic_drivers/basic',
    {
      name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      phone_number: data.phone_number,
      country: data.country,
      region: data.region,
      address: data.address,
      zip_code: data.zip_code,
      accept_terms: data.acceptTerms,

      status: 'submitted',
      subscription_status: 'none',
      subscription_plan: 'free',
      badge_type: 'none',
    },
    { headers: { 'Content-Type': 'application/json' } }
  );
};

export const useApplyDriver = () =>
  useApplicationForm<DriverFormData>({
    initialState: initialDriverFormData,
    validate: validateDriverForm,
    submit: submitDriver,
  });
