import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OTPForm({
  otpCode,
  loading,
  errors,
  otpRef,
  successMessage,
  handleOtpChange,
  handleStep2Submit,
  handleRequestOtpAgain,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <form onSubmit={handleStep2Submit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
            Verification Code
          </Label>
          <div className="relative">
            <Input
              id="otp"
              type="text"
              ref={otpRef}
              value={otpCode}
              onChange={handleOtpChange}
              placeholder="Enter 4-digit code"
              className={`h-12 text-center text-lg font-mono tracking-widest transition-all duration-200 focus:outline-none focus:ring-1 ${
                errors.otp
                  ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
              }`}
              required
              disabled={loading}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              autoComplete="one-time-code"
            />
            {errors.otp && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
            )}
          </div>
          {errors.otp && (
            <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.otp}</span>
            </div>
          )}
        </div>

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
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
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

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <span>Verify & Login</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        <div className="flex flex-col space-y-3">
          <Button
            type="button"
            onClick={handleRequestOtpAgain}
            disabled={loading}
            variant="outline"
            className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
          >
            {loading ? "Requesting..." : "Resend Code"}
          </Button>

          <div className="text-center space-y-2">
            <Link
              href="/forgot-password"
              className="text-sm text-[#15941f] hover:text-[#117a1a] font-medium transition-colors"
            >
              Forgot Password?
            </Link>
            <span className="text-gray-400 mx-2">•</span>
            <Link
              href="/register"
              className="text-sm text-[#15941f] hover:text-[#117a1a] font-medium transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
