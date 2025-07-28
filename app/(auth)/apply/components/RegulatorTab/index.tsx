"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { InputField } from "@/app/(auth)/components/InputField";
import { CircleUserRound, Mail, Lock, AlertCircle } from "lucide-react";
import { useApplyRegulator } from "../useApplyRegulator";
import CookiePopup from "../../../components/CookiePopup";

export const RegulatorTab = () => {
  const {
    handleRegulatorRegister,
    formData,
    handleChange,
    error,
    loading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleCheckboxChange,
    successMessage,
    showCookiePopup,
    handleAcceptCookies,
  } = useApplyRegulator();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Regulator Application</CardTitle>
          <CardDescription>
            Submit your details to apply as a healthcare logistics regulator.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegulatorRegister}>
          <CardContent className="grid gap-4">
            <InputField
              label="Full Name"
              icon={
                <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              }
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={error.name}
              disabled={loading}
            />

            <InputField
              label="Email"
              icon={
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              }
              name="email"
              type="email"
              placeholder="admin@email.com"
              value={formData.email}
              onChange={handleChange}
              error={error.email}
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
              error={error.password}
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
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={error.confirmPassword}
              disabled={loading}
              password={true}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />

            <InputField
              label="Organization Type"
              icon={
                <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              }
              name="regCountry"
              type="text"
              placeholder="Clinic, Waste Company, etc."
              value={formData.regCountry}
              onChange={handleChange}
              error={error.regCountry}
              disabled={loading}
            />

            <InputField
              label="Organization Name"
              icon={
                <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              }
              name="regState"
              type="text"
              placeholder="HealthCare Plus"
              value={formData.regState}
              onChange={handleChange}
              error={error.regState}
              disabled={loading}
            />

            <InputField
              label="Additional Message"
              icon={
                <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              }
              name="adminMessage"
              type="textarea"
              placeholder="Message to Super Admin..."
              value={formData.adminMessage}
              onChange={handleChange}
              disabled={loading}
            />

            <div
              className="flex items-center space-x-2"
              // onClick={() => setShowTermsModal(true)}
            >
              <Checkbox
                id="terms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("acceptTerms", checked)
                }
                disabled={loading}
                required
              />
              <Label htmlFor="terms">
                I accept the{" "}
                <Link
                  href="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#15941f] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                <br className="md:hidden" />
                and{" "}
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
          </CardContent>

          {/* General Error Message */}
          {error.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{error.general}</span>
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

          <CardFooter className="mt-4">
            <Button
              type="submit"
              disabled={loading || !formData.acceptTerms}
              className="w-full cursor-pointer h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Submit for Review</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Cookie Consent Popup */}
      {showCookiePopup && <CookiePopup onAccept={handleAcceptCookies} />}
    </>
  );
};
