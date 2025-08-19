'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import NHSSolution from './components/NHSSolutions';
import PrivatePractice from './components/PrivatePractice';
import WasteDisposal from './components/WasteDisposal';
import Courier from './components/Courier';
import UnifiedPlatform from './components/UnifiedPlatform';
import { CTA } from '@/components/CTA';
import { Building2, Puzzle, Rocket, Stethoscope } from 'lucide-react';

export const Solutions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero
        badgeIcon={<Puzzle className="w-4 h-4" />}
        badgeText="Solutions by Industry"
        heading={'Built for'}
        heading2={'Real-World Healthcare'}
        heading3="Logistics"
        subText={
          'Medilogic is built to serve real-world logistics needs in the UK healthcare system. Whether you&apos;re running a hospital, managing private practices, or collecting clinical waste — Medilogic fits your flow.'
        }
        descBadgeIcon={<Building2 className="w-4 h-4 mr-2" />}
        descBadgeText={'NHS & Private Healthcare'}
        descBadgeIcon2={<Stethoscope className="w-4 h-4 mr-2" />}
        descBadgeText2={'Waste & Logistics Providers'}
        descSubText="Explore how Medilogic works for your type of organization:"
      />
      <NHSSolution />
      <PrivatePractice />
      <WasteDisposal />
      <UnifiedPlatform />
      <Courier />
      <CTA
        badgeText={'Ready to take control of your logistics?'}
        badgeIcon={<Rocket className="w-4 h-4 animate-pulse" />}
        heading={'Discover How Medilogic Can Work for You'}
      />
    </div>
  );
};
