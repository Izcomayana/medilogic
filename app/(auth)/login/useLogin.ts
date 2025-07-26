/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import axios from "axios";
import qs from "qs";

export function useLogin() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    otp?: string;
    general?: string;
  }>({});

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password)
      setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOtpCode(value);
    if (errors.otp) setErrors((prev) => ({ ...prev, otp: undefined }));
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email address is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: { otp?: string } = {};
    if (!otpCode.trim()) newErrors.otp = "OTP code is required";
    else if (otpCode.length !== 4) newErrors.otp = "OTP must be 4 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Refs for inputs to autofocus
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  // Autofocus inputs on step change
  useEffect(() => {
    if (step === 1) {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    } else if (step === 2) {
      if (otpRef.current) {
        otpRef.current.focus();
      }
    }
  }, [step]);

const handleStep1Submit = async (e: FormEvent) => {
  e.preventDefault();
  setSuccessMessage(null);
  if (!validateForm()) return;

  setLoading(true);
  try {
    const response = await axios.post(
      "https://medilogic-backend.onrender.com/access/login-step-1",
      qs.stringify({ username: email, password }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data.session_id) {
      setSessionId(response.data.session_id);
      setStep(2);
      setSuccessMessage("OTP sent to your email.");
    } else {
      setErrors({ general: "Session ID not received. Please try again." });
    }
  } catch (error: any) {
    // Safe fallback parsing
    const msg =
      error?.response?.data?.message ??
      error?.response?.data?.detail ??
      "An unexpected error occurred. Please try again.";
    setErrors({ general: typeof msg === "string" ? msg : JSON.stringify(msg) });
  } finally {
    setLoading(false);
  }
};

  const handleStep2Submit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    if (!validateOtp() || !sessionId) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/access/login-step-2",
        { email, session_id: sessionId, code: otpCode },
        { headers: { "Content-Type": "application/json" } },
      );
      if (response.data.access_token) {
        localStorage.setItem("authToken", response.data.access_token);
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setErrors({ general: "Login step 2 failed: token not received." });
      }
    } catch (error: any) {
      setErrors({ general: error.response?.data?.message || "Invalid OTP." });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtpAgain = async () => {
    if (!email || !password) {
      setErrors({ general: "Email and password are required." });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/access/login-step-1",
        qs.stringify({ username: email, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );
      if (response.data.session_id) {
        setSessionId(response.data.session_id);
        setSuccessMessage("OTP resent to your email.");
      } else {
        setErrors({ general: "Failed to resend OTP." });
      }
    } catch (error: any) {
      const res = error.response?.data;
      let message = "Login failed.";

      if (Array.isArray(res?.detail)) {
        message = res.detail.map((err: { msg: string }) => err.msg).join(" | ");
      } else if (typeof res?.detail === "string") {
        message = res.detail;
      } else if (res?.message) {
        message = res.message;
      }

      setErrors({ general: message });
    }
  };

  return {
    step,
    email,
    password,
    otpCode,
    sessionId,
    loading,
    successMessage,
    errors,
    showPassword,
    rememberMe,
    emailRef,
    otpRef,
    passwordRef,
    setShowPassword,
    setRememberMe,
    handleEmailChange,
    handlePasswordChange,
    handleOtpChange,
    handleStep1Submit,
    handleStep2Submit,
    handleRequestOtpAgain,
  };
}
