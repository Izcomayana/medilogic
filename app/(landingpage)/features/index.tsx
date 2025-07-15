"use client";
import React from "react";
import Hero from "./components/Hero";
import SuperAdmin from "./components/SuperAdmin";

export const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero />
      <SuperAdmin />

      {/* <ClinicAdminSection /> */}

      {/* <DriverSection /> */}

      {/* <ClientSection /> */}

      {/* <AIAnalyticsSection /> */}

      {/* <SecuritySection /> */}

      {/* <FeaturesCTASection /> */}
    </div>
  );
};
