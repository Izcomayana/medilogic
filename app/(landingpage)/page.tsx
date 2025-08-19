'use client';

import { PlatformFeatures } from './components/PlatformFeatures';
import AIAnalytics from '@/components/AIAnalytics';
import { Hero } from '@/components/Hero';
import { BFHP } from './components/BFHP';
import { Security } from '@/components/Security';
import { QuickStart } from './components/QuickStart';
import { CTA } from '@/components/CTA';
import { KeyFeatures } from './components/KeyFeatures';
import { ArrowRight, Award, Phone, Play, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero
        heading="Transforming Clinical Logistics with"
        heading2="AI-Powered Precision"
        subText="A secure, intelligent platform for managing clinical waste transport,
          medical deliveries, and NHS-compliant reporting."
        descBadgeIcon={<Shield className="w-4 h-4 mr-2" />}
        descBadgeText="GDPR & ISO 27001 Ready"
        descBadgeIcon2={<Award className="w-4 h-4 mr-2" />}
        descBadgeText2="Built for NHS Clinics, Private Practices & Medical Couriers"
        CTABtn="Get a Demo"
        CTABtnIcon={
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        }
        CTABtn2Icon={
          <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
        }
        CTABtn2="Learn How It Works"
      />
      <BFHP />
      <KeyFeatures />
      <PlatformFeatures />
      <AIAnalytics />
      <Security
        badgeText={'Serious About Security & Compliance'}
        heading={"We're compliant and audit-ready so you don't have to worry"}
        // featuresIcon={<Award />}
        featuresTitle="ISO 27001-Aligned"
        featuresDesc="Architecture"
        featuresTitle2="NHS DSP Toolkit"
        featuresDesc2="Ready"
      />
      <QuickStart />
      <CTA
        badgeText={'Ready to Modernize Your Logistics?'}
        badgeIcon={<Phone className="w-4 h-4 animate-pulse" />}
        heading={'Take the first step toward secure, AI-enhanced logistics.'}
      />
    </div>
  );
}
