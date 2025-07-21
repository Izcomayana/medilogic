"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Forgotpassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await axios.post(
        "https://medilogic-backend.onrender.com/access/request-password-reset",
        { email }
      );
      setSuccessMessage("If the email exists, a password reset link has been sent.");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      if (err.response?.data?.detail) {
        setErrorMessage(err.response.data.detail);
      } else {
        setErrorMessage("An error occurred while requesting password reset.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password - Medilogic</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ maxWidth: 400, margin: "auto", padding: 20, display: "flex", flexDirection: "column", justifyContent: "center", height: "100vh" }}>
        <header style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <Link href="/" aria-label="Home" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
            Logo
          </Link>
          <Link href="/" aria-label="Home" style={{ marginLeft: 40, fontWeight: "bold", fontSize: 24, textDecoration: "none", color: "inherit" }}>
            Medilogic
          </Link>
        </header>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>
          <Button type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
          {(successMessage || errorMessage) && (
            <div
              role="alert"
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 4,
                backgroundColor: errorMessage ? "#fee2e2" : "#d1fae5",
                color: errorMessage ? "#b91c1c" : "#065f46",
              }}
            >
              {errorMessage || successMessage}
            </div>
          )}
        </form>
        <nav style={{ marginTop: 20, display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <Link href="/login" className="underline">
            Go back to Login
          </Link>
          <Link href="/register" className="underline">
            Go back to Register
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Forgotpassword;