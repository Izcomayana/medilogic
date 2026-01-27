'use client';

import { Hero } from '@/components/Hero';
import { Star, Users } from 'lucide-react';
import GridSection from './components/GridSection';
import SubmitSection from './components/SubmitSection';
import Verification from './components/Verification';
// import { CTA } from '@/components/CTA';

export const Testimonials = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero
        badgeIcon={<Star className="w-4 h-4" />}
        badgeText="Client Testimonials"
        heading={'This is what the'}
        heading2={'Clients Are Saying'}
        subText={
          'Trusted by healthcare professionals, logistics firms, and waste management providers across the UK. Hear how Medilogic is transforming clinical logistics for real teams like yours.'
        }
        descBadgeIcon={<Users className="w-4 h-4 mr-2" />}
        descBadgeText={'Real Healthcare Teams'}
        descBadgeIcon2={<Star className="w-4 h-4 mr-2" />}
        descBadgeText2={'Verified Reviews'}
        descSubText="Trusted by 200+ healthcare organizations"
      />
      <GridSection />
      <SubmitSection />
      <Verification />
    </div>
  );
};
