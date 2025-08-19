/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

export interface FormDataBase {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminMessage: string;
  acceptTerms: boolean;
  acceptCookies: boolean;
  [key: string]: any;
}

export type UseApplicationFormOptions<T extends FormDataBase> = {
  initialState: T;
  validate: (data: T) => Partial<Record<keyof T | 'general', string>>;
  transformSubmit: (data: T) => any;
  role: string;
};

export const useApplicationForm = <T extends FormDataBase>({
  initialState,
  validate,
  transformSubmit,
  role,
}: UseApplicationFormOptions<T>) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCookiePopup, setShowCookiePopup] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<T>(initialState);
  const [error, setError] = useState<
    Partial<Record<keyof T, string>> & { general?: string }
  >({});

  useEffect(() => {
    if (!formData.acceptCookies) {
      setShowCookiePopup(true);
    }
  }, [formData.acceptCookies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});

    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setError(validation);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...transformSubmit(formData),
        role,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      };

      const response = await axios.post(
        'https://medilogic-backend.onrender.com/apply',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success('Signup successful!', {
          description: 'Awaiting Super Admin approval.',
        });
        setFormData({ ...initialState, acceptCookies: formData.acceptCookies });
        setShowSuccessModal(true);
      } else {
        setError((prev) => ({
          ...prev,
          general: 'Something went wrong. Please try again later.',
        }));
      }
    } catch (err: any) {
      toast.error('Error', {
        description:
          err?.response?.data?.detail || 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (
    name: string,
    checked: boolean | 'indeterminate'
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Boolean(checked),
    }));
  };

  const handleAcceptCookies = () => {
    setFormData((prev) => ({ ...prev, acceptCookies: true }));
    setShowCookiePopup(false);
  };

  return {
    formData,
    setFormData,
    error,
    setError,
    loading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    showSuccessModal,
    setShowSuccessModal,
    showCookiePopup,
    setShowCookiePopup,
    handleSubmit,
    handleChange,
    handleCheckboxChange,
    handleAcceptCookies,
  };
};
