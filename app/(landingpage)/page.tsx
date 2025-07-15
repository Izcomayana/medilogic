"use client";

import { PlatformFeatures } from "./components/PlatformFeatures";
import { AIAnalytics } from "./components/AIAnalytics";
import { Hero } from "./components/Hero";
import { BFHP } from "./components/BFHP";
import { Security } from "./components/S&C";
import { QuickStart } from "./components/QuickStart";
import { CTA } from "./components/CTA";
import { KeyFeatures } from "./components/KeyFeatures";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero />
      <BFHP />
      <KeyFeatures />
      <PlatformFeatures />
      <AIAnalytics />
      <Security />
      <QuickStart />
      <CTA />
    </div>
  );
}
