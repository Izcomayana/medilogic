"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VerifyPrompt = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    if (!email) {
      toast.error("Missing email", {
        description: "Please try registering again.",
      });
      return;
    }
    setLoading(true);

    const startCooldown = () => {
      setCooldown(60);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    try {
      await axios.post(
        `https://medilogic-backend.onrender.com/auth/resend-verification-email?email=${email}`,
        {
          email,
        },
      );
      toast.success("✅ Verification Sent", {
        description: "Check your inbox for the verification link.",
      });
      startCooldown();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      const errorMsg =
        err.response?.data?.detail ||
        "An error occurred while resending verification link.";
      toast.error("Error", {
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-md text-center">
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
              className="lucide lucide-plus h-10 w-10 text-white group-hover:rotate-90 transition-transform duration-300"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </div>
          <span className="text-[#15941f] text-2xl font-bold tracking-tight">
            Medilogic
          </span>
        </Link>

        <h2 className="text-xl font-semibold text-gray-100 mb-3">
          🔒 Verify Your Email Address
        </h2>
        <p className="text-sm text-gray-100">
          We’ve sent a verification link to your email. Please check your inbox
          or spam folder and click the link to confirm your email address.
        </p>

        <p className="text-sm text-gray-100 mt-4">
          Didn’t receive the email? You can request a new one below.
        </p>

        <Button
          onClick={handleResend}
          disabled={loading || cooldown > 0}
          className="mt-5 bg-[#15941f] hover:bg-[#117a1a] text-white w-full h-12 font-medium rounded-lg transition cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : cooldown > 0 ? (
            `Resend in ${cooldown}s`
          ) : (
            "Resend Verification Email"
          )}
        </Button>

        <p className="text-sm text-gray-100 mt-4">
          Already verified?{" "}
          <Link
            href="/login"
            className="text-[#15941f] underline hover:text-[#117a1a]"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyPrompt;
