"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
    role: "",
    inviteCode: "",
    acceptTerms: false,
    acceptCookies: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookiePopup, setShowCookiePopup] = useState(true);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    retypePassword?: string;
    role?: string;
    inviteCode?: string;
    acceptTerms?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.retypePassword.trim()) {
      newErrors.retypePassword = "Please confirm your password";
    } else if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Role selection is required";
    }

    if (!formData.inviteCode.trim()) {
      newErrors.inviteCode = "Invite code is required";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // Show cookie popup on page load if not accepted
    if (!formData.acceptCookies) {
      setShowCookiePopup(true);
    }
  }, [formData.acceptCookies]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://medilogic-backend.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            invite_code: formData.inviteCode,
            accept_terms: formData.acceptTerms,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();

        // Default fallback
        let generalMessage = "Signup failed.";
        const fieldErrors: typeof errors = {};

        if (Array.isArray(errorData.detail)) {
          // Backend validation errors — try mapping to fields
          for (const err of errorData.detail) {
            const field = err.loc?.[1]; // e.g. "inviteCode", "email", etc.
            const msg = err.msg;

            if (typeof field === "string" && msg) {
              fieldErrors[field as keyof typeof errors] = msg;
            }
          }

          // Fallback general message (first error)
          if (errorData.detail.length > 0) {
            generalMessage = errorData.detail[0].msg;
          }
        } else if (typeof errorData.detail === "string") {
          // Generic error from backend
          generalMessage = errorData.detail;
        }

        // Only show general error if no specific field errors were found
        if (Object.keys(fieldErrors).length === 0) {
          setErrorMessage(generalMessage);
        }

        setErrors(fieldErrors);
        setLoading(false);
        return;
      }

      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    // Show terms modal when invite code length reaches 7 and terms not already accepted
    if (name === "inviteCode" && value.length === 7 && !formData.acceptTerms) {
      setShowTermsModal(true);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleCheckboxChange = (
    name: string,
    checked: boolean | "indeterminate",
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
    showPassword,
    setShowPassword,
    showRetypePassword,
    setShowRetypePassword,
    loading,
    setLoading,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    showTermsModal,
    setShowTermsModal,
    showCookiePopup,
    setShowCookiePopup,
    errors,
    setErrors,
    handleChange,
    handleRoleChange,
    handleCheckboxChange,
    handleSignup,
    handleAcceptCookies,
  };
};
