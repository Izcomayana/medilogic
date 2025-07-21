"use client";

import type React from "react";
import { useState, useRef, useEffect, type FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Login: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    otp?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: { otp?: string } = {};

    if (!otpCode.trim()) {
      newErrors.otp = "OTP code is required";
    } else if (otpCode.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    } else if (!/^\d+$/.test(otpCode)) {
      newErrors.otp = "OTP must contain only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear errors when user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(value);
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: undefined }));
    }
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

  // Handle Step 1 form submit
  const handleStep1Submit = async (e: FormEvent) => {
    e.preventDefault();
    // setErrorMessage(null)
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/access/login-step-1",
        {
          email,
          password,
        },
      );

      if (response.data.session_id) {
        setSessionId(response.data.session_id);
        setStep(2);
        setSuccessMessage(
          "Step 1 successful. Please enter the OTP sent to your email.",
        );
      } else {
        setErrors({ general: "Login step 1 failed: session_id not received." });
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({
          general: "An error occurred during login. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2 form submit
  const handleStep2Submit = async (e: FormEvent) => {
    e.preventDefault();
    // setErrorMessage(null)
    setSuccessMessage(null);

    if (!validateOtp()) {
      return;
    }

    if (!sessionId) {
      setErrors({ general: "Session ID missing. Please restart login." });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/access/login-step-2",
        {
          session_id: sessionId,
          code: otpCode,
        },
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setSuccessMessage("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setErrors({ general: "Login step 2 failed: token not received." });
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: "Invalid OTP code. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Request OTP Again button
  const handleRequestOtpAgain = async () => {
    if (!email || !password) {
      setErrors({
        general: "Email and password are required to request OTP again.",
      });
      return;
    }

    setLoading(true);
    // setErrorMessage(null)
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/access/login-step-1",
        {
          email,
          password,
        },
      );

      if (response.data.session_id) {
        setSessionId(response.data.session_id);
        setSuccessMessage("OTP has been resent. Please check your email.");
      } else {
        setErrors({
          general: "Failed to resend OTP: session_id not received.",
        });
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: "An error occurred while requesting OTP again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 group mb-6"
          >
            <div className="bg-[#15941f] rounded transition-transform duration-200 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                className="lucide lucide-plus h-10 w-10 text-white rotate-0 transition-transform duration-300 group-hover:rotate-90"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </div>
            <span className="text-[#15941f] text-2xl font-bold tracking-tight">
              Medilogic
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-50 mb-2">Welcome Back</h1>
          <p className="text-gray-300">
            {step === 1
              ? "Sign in to your Medilogic account"
              : "Enter the verification code sent to your email"}
          </p>
        </div>

        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    ref={emailRef}
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className={`pl-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.email
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
                    }`}
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                  {errors.email && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                  )}
                </div>
                {errors.email && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    ref={passwordRef}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.password
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
                    }`}
                    required
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors p-2 h-auto"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                  {errors.password && (
                    <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                  )}
                </div>
                {errors.password && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* General Error Message */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {errors.general}
                    </span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-green-700">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {successMessage}
                    </span>
                  </div>
                </div>
              )}

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) =>
                      setRememberMe(checked as boolean)
                    }
                    className="border-gray-300 data-[state=checked]:bg-[#15941f] data-[state=checked]:border-[#15941f]"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#15941f] hover:text-[#117a1a] font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-[#15941f] hover:text-[#117a1a] font-semibold transition-colors"
                  >
                    Create one here
                  </Link>
                </p>
              </div>

              {/* Additional Links */}
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-[#15941f] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#15941f] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="otp"
                  className="text-sm font-medium text-gray-700"
                >
                  Verification Code
                </Label>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    ref={otpRef}
                    value={otpCode}
                    onChange={handleOtpChange}
                    placeholder="Enter 6-digit code"
                    className={`h-12 text-center text-lg font-mono tracking-widest transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.otp
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
                    }`}
                    required
                    disabled={loading}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    autoComplete="one-time-code"
                  />
                  {errors.otp && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                  )}
                </div>
                {errors.otp && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.otp}</span>
                  </div>
                )}
              </div>

              {/* General Error Message */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {errors.general}
                    </span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-green-700">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {successMessage}
                    </span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Verify & Login</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              <div className="flex flex-col space-y-3">
                <Button
                  type="button"
                  onClick={handleRequestOtpAgain}
                  disabled={loading}
                  variant="outline"
                  className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
                >
                  {loading ? "Requesting..." : "Resend Code"}
                </Button>

                <div className="text-center space-y-2">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#15941f] hover:text-[#117a1a] font-medium transition-colors"
                  >
                    Forgot Password?
                  </Link>
                  <span className="text-gray-400 mx-2">•</span>
                  <Link
                    href="/register"
                    className="text-sm text-[#15941f] hover:text-[#117a1a] font-medium transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Support Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-300 mb-2">
            Need help getting started?
          </p>
          <Link
            href="/help"
            className="text-[#15941f] hover:text-[#117a1a] font-medium text-sm transition-colors"
          >
            Visit our Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
