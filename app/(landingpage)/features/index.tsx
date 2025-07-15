"use client";
import React from "react";
import Hero from "./components/Hero";
import SuperAdmin from "./components/SuperAdmin";
import ClinicAdmin from "./components/ClinicAdmin";
import Driver from "./components/Driver";
import Client from "./components/Client";
import AIAnalytics from "./components/AIAnalytics";

export const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero />
      <SuperAdmin />
      <ClinicAdmin />
      <Driver />
      <Client />
      <AIAnalytics />
      {/* <Security /> */}
      {/* <FeaturesCTA /> */}
    </div>
  );
};
