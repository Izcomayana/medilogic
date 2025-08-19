'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  Mail,
  Lock,
  ShieldUser,
  CarTaxiFront,
  Code,
  ArrowRight,
  CircleUserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
// import TermsModal from "./components/TermsModal";
import CookiePopup from '../components/CookiePopup';
import { RegisterFormHeader } from './components/Header';
import { InputField } from '../components/InputField';
import { useRegister } from './useRegister';

const Register: React.FC = () => {
  const {
    formData,
    errors,
    handleChange,
    handleSignup,
    loading,
    showPassword,
    setShowPassword,
    showRetypePassword,
    setShowRetypePassword,
    handleCheckboxChange,
    successMessage,
    errorMessage,
    handleRoleChange,
    showCookiePopup,
    handleAcceptCookies,
  } = useRegister();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <RegisterFormHeader />

          <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            <form onSubmit={handleSignup} className="space-y-4">
              <InputField
                label="Full Name"
                icon={
                  <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                }
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={loading}
              />

              <InputField
                label="Email"
                icon={
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                }
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={loading}
              />

              <InputField
                label="Password"
                icon={
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                }
                name="password"
                type="password"
                placeholder="Create your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={loading}
                password={true}
                show={showPassword}
                setShow={setShowPassword}
              />

              <InputField
                label="Confirm Password"
                icon={
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                }
                name="retypePassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.retypePassword}
                onChange={handleChange}
                error={errors.retypePassword}
                disabled={loading}
                password={true}
                show={showRetypePassword}
                setShow={setShowRetypePassword}
              />

              <div>
                <Select
                  name="role"
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  disabled={loading}
                >
                  <SelectTrigger
                    className={`w-full relative cursor-pointer pl-9 transition-all duration-200 focus:outline-none focus:ring-1 ${
                      errors.role
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20'
                    }`}
                  >
                    <SelectValue className="" placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem
                      className="relative cursor-pointer pl-9"
                      value="client"
                    >
                      <ShieldUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 !h-5 !w-5" />
                      Client
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
                {errors.role && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.role}</span>
                  </div>
                )}
              </div>

              <InputField
                label="Invite Code"
                icon={
                  <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                }
                name="inviteCode"
                type="text"
                placeholder="Invite Code"
                value={formData.inviteCode}
                onChange={handleChange}
                error={errors.inviteCode}
                disabled={loading}
              />

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

              <div
                className="flex items-center space-x-2"
                // onClick={() => setShowTermsModal(true)}
              >
                <Checkbox
                  id="terms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('acceptTerms', checked)
                  }
                  disabled={loading}
                  required
                />
                <Label htmlFor="terms">
                  I accept the{' '}
                  <Link
                    href="/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#15941f] hover:underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  <br className="md:hidden" />
                  and{' '}
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
                    className="text-[#15941f] hover:text-[#117a1a] hover:underline font-semibold transition-colors"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Terms and Conditions Modal */}
          {/* <TermsModal
            isOpen={showTermsModal}
            onClose={() => setShowTermsModal(false)}
          /> */}

          {/* Cookie Consent Popup */}
          {showCookiePopup && <CookiePopup onAccept={handleAcceptCookies} />}
        </div>
      </div>
    </>
  );
};

export default Register;
