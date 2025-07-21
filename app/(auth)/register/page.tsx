"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

  // Password validation: at least 6 characters
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.acceptTerms) {
      setErrorMessage("You must accept the terms and conditions.");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.retypePassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

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
      <Head>
        <title>Medilogic Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Medilogic Logo"
              width={200}
              height={200}
              style={{ height: "40px", marginRight: "10px" }}
            />
          </Link>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>Medilogic</div>
        </div>
        <form onSubmit={handleSignup} style={{ textAlign: "left" }}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              style={{ marginLeft: "10px" }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <input
              type={showRetypePassword ? "text" : "password"}
              name="retypePassword"
              placeholder="Re-enter Password"
              value={formData.retypePassword}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button
              type="button"
              onClick={() => setShowRetypePassword((prev) => !prev)}
              disabled={loading}
              style={{ marginLeft: "10px" }}
            >
              {showRetypePassword ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option value="">Select Role</option>
              <option value="client_admin">Client Admin</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="inviteCode"
              placeholder="Invite Code"
              value={formData.inviteCode}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                disabled={loading}
                required
              />
              I accept the{" "}
              <a
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading || !formData.acceptTerms}
              style={{ width: "100%" }}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            Already have an account? <Link href="/login">Log in</Link>
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </form>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              maxWidth: "500px",
              maxHeight: "80vh",
              overflowY: "auto",
              borderRadius: "8px",
              textAlign: "left",
            }}
          >
            <h2>Medilogic – Terms of Service</h2>
            <p>Effective Date: July 10, 2025</p>
            <p>
              Welcome to Medilogic! These Terms of Service (“Terms”) govern your
              access to and use of the Medilogic platform and services.
            </p>
            <p>
              By creating an account or using our services, you agree to these
              Terms. If you do not agree, please do not use our platform.
            </p>
            <hr />
            <h3>1. Use of Service</h3>
            <p>
              Medilogic provides software to manage medical logistics
              operations. You may use the service only in compliance with
              applicable laws, regulations, and these Terms.
            </p>
            <h3>2. Eligibility</h3>
            <p>
              You must be at least 18 years old or authorized by an organization
              to use Medilogic. Accounts must be registered with accurate and
              up-to-date information.
            </p>
            <h3>3. User Responsibilities</h3>
            <ul>
              <li>Use Medilogic lawfully and responsibly.</li>
              <li>Keep your login credentials confidential.</li>
              <li>Immediately report any unauthorized use of your account.</li>
            </ul>
            <h3>4. Organization Accounts</h3>
            <p>
              If you are an admin, you are responsible for all activity under
              your organization. You must ensure your users comply with these
              terms.
            </p>
            <h3>5. Payment & Subscriptions</h3>
            <p>
              Some features require a paid subscription. By subscribing, you
              authorize Medilogic to charge you periodically. Prices may vary by
              country and user type (e.g., UK vs. Nigeria).
            </p>
            <h3>6. Data & Privacy</h3>
            <p>
              Our Privacy Policy explains how we collect and use your data. You
              agree to our use of your data as described there.
            </p>
            <h3>7. Suspension & Termination</h3>
            <ul>
              <li>Violate these terms</li>
              <li>Fail to pay subscription fees</li>
              <li>Misuse the platform</li>
            </ul>
            <h3>8. Changes to Terms</h3>
            <p>
              We may update these Terms from time to time. You will be notified
              of material changes. Continued use means you accept the revised
              Terms.
            </p>
            <h3>9. Governing Law</h3>
            <ul>
              <li>
                <strong>UK law</strong> for users in the United Kingdom.
              </li>
              <li>
                <strong>Nigerian law</strong> for users in Nigeria.
              </li>
            </ul>
            <h3>10. Contact</h3>
            <p>
              If you have any questions about these terms, contact us at:
              <br />
              📧 <strong>support@medilogicapp.com</strong>
            </p>
            <button
              onClick={handleCloseTermsModal}
              style={{ marginTop: "10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cookie Consent Popup */}
      {showCookiePopup && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            backgroundColor: "#eee",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
            maxWidth: "300px",
          }}
        >
          <p>
            This site uses cookies to improve your experience. By continuing to
            use the site, you accept our use of cookies.
          </p>
          <button onClick={handleAcceptCookies} style={{ marginTop: "10px" }}>
            Accept Cookies
          </button>
        </div>
      )}
    </>
  );
};

export default Register;
