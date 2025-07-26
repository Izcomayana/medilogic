import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginForm({
  email,
  password,
  loading,
  errors,
  successMessage,
  emailRef,
  passwordRef,
  handleEmailChange,
  handlePasswordChange,
  handleStep1Submit,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <form onSubmit={handleStep1Submit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="email"
              type="email"
              ref={emailRef}
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={`pl-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
              }`}
              required
              autoComplete="email"
              disabled={loading}
            />
            {errors.email && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
            )}
          </div>
          {errors.email && (
            <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              ref={passwordRef}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className={`pl-10 pr-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
              }`}
              required
              autoComplete="current-password"
              disabled={loading}
            />
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors p-2 h-auto"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
            {errors.password && (
              <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
            )}
          </div>
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

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked: boolean) =>
                setRememberMe(checked as boolean)
              }
              className="border-gray-300 data-[state=checked]:bg-[#15941f] data-[state=checked]:border-[#15941f]"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-[#15941f] hover:text-[#117a1a] font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer h-12 bg-[#15941f] hover:bg-[#117a1a] text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#15941f] hover:text-[#117a1a] font-semibold transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>

        {/* Additional Links */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link
              target="_blank"
              href="/terms"
              className="text-[#15941f] hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              target="_blank"
              href="/privacy"
              className="text-[#15941f] hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
