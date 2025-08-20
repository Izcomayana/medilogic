'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { HomeLogo } from '@/components/HomeLogo';

const Resetpassword: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    if (!validateForm() || !token) return;
    setLoading(true);

    try {
      const res = await fetch(
        'https://medilogic-backend.onrender.com/access/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            new_password: formData.password,
            token,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to reset password');
      }

      setSuccessMessage(
        '✅ Password has been successfully reset. You may now log in.'
      );
      setFormData({ password: '', confirmPassword: '' });
      setTimeout(() => router.push('/login'), 1500);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      if (err.response?.data?.detail) {
        setErrors({ general: err.response.data.detail || 'Login failed.' });
      } else {
        setErrors({
          general: 'An error occurred while requesting password reset.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <HomeLogo />
          <div className="">
            <p className="text-base text-gray-100 font-semibold">
              🔐 Reset Your Password
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Enter your new password below.
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={loading}
                  autoComplete="password"
                  className={`pl-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                    errors.password
                      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20'
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
              </div>
              {errors.password && (
                <div className="flex items-center text-red-600 text-sm space-x-1 mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmpassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm your new password below.
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

                <Input
                  id="confirmpassword"
                  name="confirmpassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  disabled={loading}
                  autoComplete="confirm password"
                  className={`pl-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                    errors.confirmPassword
                      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20'
                  }`}
                />
                <Button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors p-2 h-auto"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center text-red-600 text-sm space-x-1 mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
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
                  <span>Reset Password</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

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
                  <span className="text-sm font-medium">{successMessage}</span>
                </div>
              </div>
            )}

            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{errors.general}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
