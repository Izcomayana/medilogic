"use client";

import React from "react";
import LoginForm from "./components/LoginForm";
import OTPForm from "./components/OTPForm";
import { useLogin } from "./useLogin";
import Link from "next/link";
import { HomeLogo } from "@/components/HomeLogo";

export default function Login() {
  const login = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <HomeLogo />
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
