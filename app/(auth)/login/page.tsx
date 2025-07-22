"use client";

import React from "react";
import LoginForm from "./components/LoginForm";
import OTPForm from "./components/OTPForm";
import { useLogin } from "./useLogin";
import Link from "next/link";

export default function Login() {
  const login = useLogin();

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
            {login.step === 1
              ? "Sign in to your Medilogic account"
              : "Enter the verification code sent to your email"}
          </p>
        </div>

        {login.step === 1 ? <LoginForm {...login} /> : <OTPForm {...login} />}

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
}
