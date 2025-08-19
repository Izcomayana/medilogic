'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { HomeLogo } from '@/components/HomeLogo';

const COOLDOWN_DURATION = 60;
const STORAGE_KEY = 'medilogic_verify_cooldown';

const VerifyPrompt = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    if (!email) {
      toast.error('Missing email', {
        description: 'Please try registering again.',
      });
      return;
    }
    setLoading(true);

    try {
      await axios.post(
        `https://medilogic-backend.onrender.com/auth/resend-verification-email?email=${email}`,
        {
          email,
        }
      );
      toast.success('Verification Sent', {
        description: 'Check your inbox for the verification link.',
      });

      startCooldown();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      const errorMsg =
        err.response?.data?.detail ||
        'An error occurred while resending verification link.';

      toast.error('Error', {
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Starts the cooldown
  const startCooldown = () => {
    const expiresAt = Date.now() + COOLDOWN_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, expiresAt.toString());
    setCooldown(COOLDOWN_DURATION);
    startCountdown(COOLDOWN_DURATION);
  };

  // ⏲️ Handles ticking countdown
  const startCountdown = (start: number) => {
    let timeLeft = start;
    const interval = setInterval(() => {
      timeLeft -= 1;
      setCooldown(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 1000);
  };

  // ⏱️ Restore cooldown if it was active
  useEffect(() => {
    const storedExpiry = localStorage.getItem(STORAGE_KEY);
    if (storedExpiry) {
      const expiresAt = parseInt(storedExpiry);
      const secondsLeft = Math.floor((expiresAt - Date.now()) / 1000);
      if (secondsLeft > 0) {
        setCooldown(secondsLeft);
        startCountdown(secondsLeft);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-md text-center">
        <HomeLogo />

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
            'Resend Verification Email'
          )}
        </Button>

        <p className="text-sm text-gray-100 mt-4">
          Already verified?{' '}
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
