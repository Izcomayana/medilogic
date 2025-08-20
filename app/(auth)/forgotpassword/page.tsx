'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowRight, Mail } from 'lucide-react';
import { HomeLogo } from '@/components/HomeLogo';

const Forgotpassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    email?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = 'Email address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    if (!validateForm()) return;
    setLoading(true);

    try {
      await axios.post(
        'https://medilogic-backend.onrender.com/access/request-password-reset',
        { email }
      );
      setSuccessMessage(
        'If the email exists, a password reset link has been sent.'
      );
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
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  disabled={loading}
                  autoComplete="email"
                  className={`pl-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                    errors.email
                      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20'
                  }`}
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
            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{errors.general}</span>
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
                  <span className="text-sm font-medium">{successMessage}</span>
                </div>
              </div>
            )}
          </form>

          <nav
            style={{
              marginTop: 20,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 14,
            }}
          >
            <Link
              href="/login"
              className="underline text-[#15941f] hover:text-[#117a1a]"
            >
              Go back to Login
            </Link>
            <Link
              href="/register"
              className="underline text-[#15941f] hover:text-[#117a1a]"
            >
              Go back to Register
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
