"use client";

import React from "react";
import Hero from "./components/Hero";
import NHSSolution from "./components/NHSSolutions";
import PrivatePractice from "./components/PrivatePractice";
import WasteDisposal from "./components/WasteDisposal";
import Courier from "./components/Courier";
import UnifiedPlatform from "./components/UnifiedPlatform";
import { CTA } from "@/components/CTA";
import { Rocket } from "lucide-react";

export const Solutions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero />
      <NHSSolution />
      <PrivatePractice />
      <WasteDisposal />
      <UnifiedPlatform />
      <Courier />
      <CTA
        badgeText={"Ready to take control of your logistics?"}
        badgeIcon={<Rocket className="w-4 h-4 animate-pulse" />}
        heading={"Discover How Medilogic Can Work for You"}
      />
    </div>
  );
};
