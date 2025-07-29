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
import {
  CircleUserRound,
  Mail,
  Lock,
  AlertCircle,
  Globe,
  MapPinHouse,
} from "lucide-react";
import { useApplyRegulator } from "./useApplyRegulator";
import CookiePopup from "../../../components/CookiePopup";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
    showCookiePopup,
    handleAcceptCookies,
    showSuccessModal,
    setShowSuccessModal,
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
              label="Registration Country"
              icon={
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              }
              name="regCountry"
              type="text"
              placeholder="England"
              value={formData.regCountry}
              onChange={handleChange}
              error={error.regCountry}
              disabled={loading}
            />

            <InputField
              label="Registration State"
              icon={
                <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              }
              name="regState"
              type="text"
              placeholder="London"
              value={formData.regState}
              onChange={handleChange}
              error={error.regState}
              disabled={loading}
            />

            <InputField
              label="Registration Region"
              icon={
                <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              }
              name="regRegion"
              type="text"
              placeholder="London"
              value={formData.regRegion}
              onChange={handleChange}
              error={error.regRegion}
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

      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#15941f] text-lg">
              🎉 Application Submitted Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600 mt-2">
              Your application has been submitted successfully. <br />
              The Super Admin will get back to you via the email you provided.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#15941f] hover:bg-[#117a1a] text-white"
            >
              <Link href="/">Okay, got it!</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
