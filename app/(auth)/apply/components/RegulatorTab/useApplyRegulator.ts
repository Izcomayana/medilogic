"use client";

import { useApplicationForm } from "../ApplicationForm/useApplicationForm";

const initialRegulatorFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  regCountry: "",
  regState: "",
  regRegion: "",
  adminMessage: "",
  acceptTerms: false,
  acceptCookies: false,
};

type RegulatorFormData = typeof initialRegulatorFormData;

const validateRegulatorForm = (data: RegulatorFormData) => {
  const errors: Partial<Record<keyof RegulatorFormData, string>> & {
    general?: string;
  } = {};

  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email";
  }
  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!data.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (!data.regCountry.trim()) errors.regCountry = "Country is required";
  if (!data.regState.trim()) errors.regState = "State is required";
  if (!data.regRegion.trim()) errors.regRegion = "Region is required";
  if (!data.acceptTerms)
    errors.acceptTerms = "You must accept the terms and conditions";

  return errors;
};

const transformRegulatorForm = (data: RegulatorFormData) => ({
  full_name: data.name,
  email: data.email,
  password: data.password,
  regulated_country: data.regCountry,
  regulated_state: data.regState,
  regulated_region: data.regRegion,
  message: data.adminMessage,
});

export const useApplyRegulator = () =>
  useApplicationForm<RegulatorFormData>({
    initialState: initialRegulatorFormData,
    validate: validateRegulatorForm,
    transformSubmit: transformRegulatorForm,
    role: "regulator",
  });
