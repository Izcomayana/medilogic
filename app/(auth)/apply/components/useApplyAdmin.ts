"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

export const useApplyAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showCookiePopup, setShowCookiePopup] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    orgType: "",
    orgName: "",
    adminMessage: "",
    acceptTerms: false,
    acceptCookies: false,
  });

  const [error, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    orgType?: string;
    orgName?: string;
    adminMessage?: string;
    acceptTerms?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newError: typeof error = {};

    if (!formData.name.trim()) {
      newError.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newError.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newError.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required";
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newError.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    if (!formData.orgType.trim()) {
      newError.orgType = "Organization type is required";
    }

    if (!formData.orgName.trim()) {
      newError.orgName = "Organization name is required";
    }

    if (!formData.acceptTerms) {
      newError.acceptTerms = "You must accept the terms and conditions";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  useEffect(() => {
    if (!formData.acceptCookies) {
      setShowCookiePopup(true);
    }
  }, [formData.acceptCookies]);

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setError({});

    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/auth/admin-signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          orgType: formData.orgType,
          orgName: formData.orgName,
          adminMessage: formData.adminMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Signup successful! Awaiting Super Admin approval.");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          orgType: "",
          orgName: "",
          adminMessage: "",
          acceptTerms: false,
          acceptCookies: formData.acceptCookies,
        });
        console.log(response.data);
      } else {
        setError({ general: "Something went wrong. Please try again later." });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Network error. Please try again.";
      setError({ general: message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    loading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    successMessage,
    setSuccessMessage,
    showCookiePopup,
    setShowCookiePopup,
    formData,
    setFormData,
    error,
    setError,
    handleAdminRegister,
    handleChange,
    handleCheckboxChange,
    handleAcceptCookies,
  };
};
