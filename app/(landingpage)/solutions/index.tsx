import React from "react";
import Hero from "./components/Hero";
import NHSSolution from "./components/NHSSolutions";
import PrivatePractice from "./components/PrivatePractice";
import WasteDisposal from "./components/WasteDisposal";

export const Solutions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero />
      <NHSSolution />
      <PrivatePractice />
      <WasteDisposal />

      {/* Medical Couriers & Logistics Providers */}
      {/* <CourierSection /> */}

      {/* One Platform, Multiple Solutions */}
      {/* <UnifiedPlatformSection /> */}

      {/* CTA Section */}
      {/* <CTASection /> */}
    </div>
  );
};
