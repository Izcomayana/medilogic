'use client';

import { CircleUserRound, Mail, Lock, Globe, MapPinHouse } from 'lucide-react';
import { useApplyRegulator } from './useApplyRegulator';
import { ApplicationForm, Field } from '../ApplicationForm';

export const RegulatorTab = () => {
  const {
    handleSubmit,
    formData,
    handleChange,
    error,
    loading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleCheckboxChange,
    showCookiePopup,
    handleAcceptCookies,
    showSuccessModal,
    setShowSuccessModal,
  } = useApplyRegulator();

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
      name: 'confirmPassword',
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
      label: 'Registration Country',
      name: 'regCountry',
      type: 'text',
      placeholder: 'England',
      icon: (
        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Registration State',
      name: 'regState',
      type: 'text',
      placeholder: 'London',
      icon: (
        <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Registration Region',
      name: 'regRegion',
      type: 'text',
      placeholder: 'London',
      icon: (
        <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
    {
      label: 'Additional Message',
      name: 'adminMessage',
      type: 'textarea',
      placeholder: 'Message to Super Admin...',
      icon: (
        <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      ),
    },
  ];

  return (
    <ApplicationForm
      title="Admin Application"
      description="Submit your details to request access as a clinic or waste company admin."
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
