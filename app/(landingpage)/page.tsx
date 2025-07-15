"use client";

import { PlatformFeatures } from "./components/PlatformFeatures";
import { AIAnalytics } from "./components/AIAnalytics";
import { Hero } from "./components/Hero";
import { BFHP } from "./components/BFHP";
import { Security } from "./components/S&C";
import { QuickStart } from "./components/QuickStart";
import { CTA } from "../../components/CTA";
import { KeyFeatures } from "./components/KeyFeatures";
import { Phone } from "lucide-react";

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
      <CTA
        badgeText={"Ready to Modernize Your Logistics?"}
        badgeIcon={<Phone className="w-4 h-4 animate-pulse" />}
        heading={"Take the first step toward secure, AI-enhanced logistics."}
      />
    </div>
  );
}
