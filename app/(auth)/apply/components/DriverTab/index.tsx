'use client';

import {
  CircleUserRound,
  Mail,
  Phone,
  Globe,
  MapPin,
  Home,
  Hash,
  Car,
  Calendar,
  Briefcase,
  Lock,
} from 'lucide-react';

import { useApplyDriver } from './useApplyDriver';
import { ApplicationForm, Field } from '../ApplicationForm';

export const DriverTab = () => {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleSubmit,
    formData,
    handleChange,
    error,
    loading,
    handleCheckboxChange,
    showCookiePopup,
    handleAcceptCookies,
    showSuccessModal,
    setShowSuccessModal,
  } = useApplyDriver();

  const fields: Field[] = [
    {
      label: 'Full Name',
      name: 'name',
      placeholder: 'John Doe',
      icon: (
        <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'admin@email.com',
      icon: (
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Create your password',
      icon: (
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
      password: true,
      show: showPassword,
      setShow: setShowPassword,
    },
    {
      label: 'Confirm Password',
      name: 'confirm_password',
      type: 'password',
      placeholder: 'Re-enter your password',
      icon: (
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
      password: true,
      show: showConfirmPassword,
      setShow: setShowConfirmPassword,
    },
    {
      label: 'Phone Number',
      name: 'phone_number',
      placeholder: '+44 7123 456789',
      icon: (
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Country',
      name: 'country',
      placeholder: 'United Kingdom',
      icon: (
        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Region',
      name: 'region',
      placeholder: 'London',
      icon: (
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Address',
      name: 'address',
      placeholder: '123 Baker Street',
      icon: (
        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Postal Code',
      name: 'zip_code',
      placeholder: 'NW1 6XE',
      icon: (
        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
  ];

  return (
    <ApplicationForm
      title="Driver Application"
      description="Submit your details to apply as a Medilogic driver."
      fields={fields}
      formData={formData}
      error={error}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      acceptTerms={formData.acceptTerms}
      handleCheckboxChange={handleCheckboxChange}
      showCookiePopup={showCookiePopup}
      handleAcceptCookies={handleAcceptCookies}
      showSuccessModal={showSuccessModal}
      setShowSuccessModal={setShowSuccessModal}
    />
  );
};
