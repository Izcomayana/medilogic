"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CircleUserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldUser,
  CarTaxiFront,
  Code,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";

const Register: React.FC = () => {
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

  // State for terms and conditions modal visibility
  const [showTermsModal, setShowTermsModal] = useState(false);

  // State for cookie consent popup visibility
  const [showCookiePopup, setShowCookiePopup] = useState(false);

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

  // Password validation: at least 6 characters
  // const isValidPassword = (password: string) => {
  //   return password.length >= 6;
  // };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    // if (!formData.acceptTerms) {
    //   setErrorMessage("You must accept the terms and conditions.");
    //   return;
    // }

    // if (!isValidPassword(formData.password)) {
    //   setErrorMessage("Password must be at least 6 characters long.");
    //   return;
    // }

    // if (formData.password !== formData.retypePassword) {
    //   setErrorMessage("Passwords do not match.");
    //   return;
    // }

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
            inviteCode: formData.inviteCode,
            acceptTerms: formData.acceptTerms,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Signup failed.");
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

  const handleAcceptCookies = () => {
    setFormData((prev) => ({ ...prev, acceptCookies: true }));
    setShowCookiePopup(false);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  return (
    <>
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
            <h1 className="text-3xl font-bold text-gray-50 mb-2">
              Welcome to Medilogic! 🙂
            </h1>
            <p className="text-gray-300">Create your Medilogic account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="name"
                    className={`pl-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.name
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
                    }`}
                  />
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
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    disabled={loading}
                    className={`pl-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.email
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
                    }`}
                  />
                </div>
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
                    name="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="current-password"
                    className={`pl-10 pr-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.password
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
                    }`}
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
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmpassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="confirmpassword"
                    type={showRetypePassword ? "text" : "password"}
                    name="retypePassword"
                    placeholder="Re-enter Password"
                    value={formData.retypePassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={`pl-10 pr-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.retypePassword
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
                    }`}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowRetypePassword(!showRetypePassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors p-2 h-auto"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                  {errors.retypePassword && (
                    <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                  )}
                </div>
              </div>

              <div>
                <Select
                  name="role"
                  required
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full relative cursor-pointer pl-9">
                    <SelectValue className="" placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem
                      className="relative cursor-pointer pl-9"
                      value="clientadmin"
                    >
                      <ShieldUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 !h-5 !w-5" />
                      Client Admin
                    </SelectItem>
                    <SelectItem
                      className="relative cursor-pointer pl-9"
                      value="driver"
                    >
                      <CarTaxiFront className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 !h-5 !w-5" />
                      Driver
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="invitecode"
                  className="text-sm font-medium text-gray-700"
                >
                  Invite Code
                </Label>
                <div className="relative">
                  <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 !h-5 !w-5" />

                  <Input
                    id="invitecode"
                    type="text"
                    name="inviteCode"
                    placeholder="Invite Code"
                    value={formData.inviteCode}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={`pl-10 pr-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.inviteCode
                        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
                    }`}
                  />
                </div>
              </div>

              {/* General Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{errorMessage}</span>
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("acceptTerms", checked)
                  }
                  disabled={loading}
                  required
                />
                <Label htmlFor="terms">
                  I accept the{" "}
                  <Link
                    href="/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#15941f] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#15941f] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={loading || !formData.acceptTerms}
                  className="w-full cursor-pointer h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>Register</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>

              {/* Divider */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Already have an account?
                  <Link
                    href="/login"
                    className="text-[#15941f] hover:text-[#117a1a] font-semibold transition-colors"
                  >
                    Log in
                  </Link>
                </p>
              </div>

              <div style={{ marginTop: "10px" }}>
                Already have an account? <Link href="/login">Log in</Link>
              </div>
            </form>
          </div>

          {/* Terms and Conditions Modal */}
          {showTermsModal && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
              <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 space-y-4">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Medilogic – Terms of Service
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-300">
                  Effective Date: July 10, 2025
                </p>
                <p>
                  Welcome to Medilogic! These Terms of Service (“Terms”) govern
                  your access to and use of the Medilogic platform and services.
                </p>
                <p>
                  By creating an account or using our services, you agree to
                  these Terms. If you do not agree, please do not use our
                  platform.
                </p>

                <hr className="my-2" />

                <div className="space-y-3 text-sm leading-relaxed">
                  <h3 className="font-semibold">1. Use of Service</h3>
                  <p>
                    Medilogic provides software to manage medical logistics
                    operations. You may use the service only in compliance with
                    applicable laws, regulations, and these Terms.
                  </p>

                  <h3 className="font-semibold">2. Eligibility</h3>
                  <p>
                    You must be at least 18 years old or authorized by an
                    organization to use Medilogic. Accounts must be registered
                    with accurate and up-to-date information.
                  </p>

                  <h3 className="font-semibold">3. User Responsibilities</h3>
                  <ul className="list-disc list-inside ml-4">
                    <li>Use Medilogic lawfully and responsibly.</li>
                    <li>Keep your login credentials confidential.</li>
                    <li>
                      Immediately report any unauthorized use of your account.
                    </li>
                  </ul>

                  <h3 className="font-semibold">4. Organization Accounts</h3>
                  <p>
                    If you are an admin, you are responsible for all activity
                    under your organization. You must ensure your users comply
                    with these terms.
                  </p>

                  <h3 className="font-semibold">5. Payment & Subscriptions</h3>
                  <p>
                    Some features require a paid subscription. By subscribing,
                    you authorize Medilogic to charge you periodically. Prices
                    may vary by country and user type (e.g., UK vs. Nigeria).
                  </p>

                  <h3 className="font-semibold">6. Data & Privacy</h3>
                  <p>
                    Our Privacy Policy explains how we collect and use your
                    data. You agree to our use of your data as described there.
                  </p>

                  <h3 className="font-semibold">7. Suspension & Termination</h3>
                  <ul className="list-disc list-inside ml-4">
                    <li>Violate these terms</li>
                    <li>Fail to pay subscription fees</li>
                    <li>Misuse the platform</li>
                  </ul>

                  <h3 className="font-semibold">8. Changes to Terms</h3>
                  <p>
                    We may update these Terms from time to time. You will be
                    notified of material changes. Continued use means you accept
                    the revised Terms.
                  </p>

                  <h3 className="font-semibold">9. Governing Law</h3>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      <strong>UK law</strong> for users in the United Kingdom.
                    </li>
                    <li>
                      <strong>Nigerian law</strong> for users in Nigeria.
                    </li>
                  </ul>

                  <h3 className="font-semibold">10. Contact</h3>
                  <p>
                    If you have any questions about these terms, contact us at:{" "}
                    <br />
                    📧 <strong>support@medilogicapp.com</strong>
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleCloseTermsModal}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cookie Consent Popup */}
          {showCookiePopup && (
            <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-white dark:bg-zinc-900 shadow-lg rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                This site uses cookies to improve your experience. By continuing
                to use the site, you accept our use of cookies.
              </p>
              <div className="mt-4 text-right">
                <button
                  onClick={handleAcceptCookies}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                  Accept Cookies
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
