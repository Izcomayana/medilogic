"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { HomeLogo } from "@/components/HomeLogo";

const VerifyEmail: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://medilogic-backend.onrender.com/auth/verify-email?token=${token}`,
        )
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    } else {
      setStatus("error");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <HomeLogo />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center space-y-4">
          {status === "verifying" && (
            <>
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-600" />
              <p className="text-sm text-gray-700">Verifying your email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="mx-auto h-6 w-6 text-green-600" />
              <p className="text-sm font-medium text-green-700">
                ✅ Your email has been verified successfully!
              </p>
              <Link
                href="/login"
                className="inline-block mt-2 text-[#15941f] hover:text-[#117a1a] underline"
              >
                Go to Login
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="mx-auto h-6 w-6 text-red-600" />
              <p className="text-sm font-medium text-red-700">
                ❌ Verification failed. The link may be invalid or expired.
              </p>
              <Link
                href="/register"
                className="inline-block mt-2 text-[#15941f] hover:text-[#117a1a] underline"
              >
                Go back to Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
