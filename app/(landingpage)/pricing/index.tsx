'use client';

import { Hero } from '@/components/Hero';
import { DollarSign, Shield, Zap } from 'lucide-react';
import React from 'react';
import FreeTrial from './components/FreeTrial';
import SubscriptionPlans from './components/SubscriptionsPlans';
import MarketAffordability from './components/MarketAffordability';
import RevenueTransparency from './components/RevenueTransparency';
import ValueProposition from './components/ValueProposition';
import PricingCTA from './components/PricingCTA/indes';

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero
        badgeIcon={<DollarSign className="w-4 h-4" />}
        badgeText="Simple, Transparent Pricing"
        heading={'Simple'}
        heading2={'Transparent Pricing'}
        subText={
          "Whether you're a small clinic or a nationwide logistics provider, Medilogic scales with you. Choose a plan that matches your operations — no hidden fees, no long-term commitments."
        }
        descBadgeIcon={<Shield className="w-4 h-4 mr-2" />}
        descBadgeText={'No Hidden Fees'}
        descBadgeIcon2={<Zap className="w-4 h-4 mr-2" />}
        descBadgeText2={'No Long-term Commitments'}
      />
      <FreeTrial />
      <SubscriptionPlans />
      <MarketAffordability />
      <RevenueTransparency />
      <ValueProposition />
      <PricingCTA />
    </div>
  );
};
