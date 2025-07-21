"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login: React.FC = () => {
  const router = useRouter();

  // Step state: 1 or 2
  const [step, setStep] = useState<1 | 2>(1);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // Session ID from step 1 response
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Loading state for async requests
  const [loading, setLoading] = useState(false);

  // Success and error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/access/login-step-1",
        { email, password }
      );

      if (response.data.session_id) {
        setSessionId(response.data.session_id);
        setStep(2);
        setSuccessMessage("Step 1 successful. Please enter the OTP sent to your email.");
      } else {
        setErrorMessage("Login step 1 failed: session_id not received.");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An error occurred during login step 1.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2 form submit
  const handleStep2Submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!sessionId) {
      setErrorMessage("Session ID missing. Please restart login.");
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/access/login-step-2",
        { session_id: sessionId, code: otpCode }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setSuccessMessage("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setErrorMessage("Login step 2 failed: token not received.");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An error occurred during login step 2.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Request OTP Again button
  const handleRequestOtpAgain = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required to request OTP again.");
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "https://medilogic-backend.onrender.com/access/login-step-1",
        { email, password }
      );

      if (response.data.session_id) {
        setSessionId(response.data.session_id);
        setSuccessMessage("OTP has been resent. Please check your email.");
      } else {
        setErrorMessage("Failed to resend OTP: session_id not received.");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An error occurred while requesting OTP again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4">
      <header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/" aria-label="Home" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
            Logo
          </Link>
          <Link href="/" aria-label="Home">
            Medilogic
          </Link>
        </div>
      </header>

      {step === 1 && (
        <form onSubmit={handleStep1Submit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          <div className="mt-4 flex justify-between text-sm">
            <Link href="/forgotpassword" className="underline">
              Forgot Password?
            </Link>
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleStep2Submit}>
          <div>
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              ref={otpRef}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
              disabled={loading}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoComplete="one-time-code"
            />
          </div>
          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
          <div>
            <Button
              type="button"
              onClick={handleRequestOtpAgain}
              disabled={loading}
            >
              {loading ? "Requesting..." : "Request OTP Again"}
            </Button>
          </div>
          <div>
            <Link href="/forgotpassword" className="underline">
              Forgot Password?
            </Link>
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </form>
      )}

      {(errorMessage || successMessage) && (
        <div
          role="alert"
          className={`mt-4 p-3 rounded ${
            errorMessage ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {errorMessage || successMessage}
        </div>
      )}
    </div>
  );
};

export default Login;