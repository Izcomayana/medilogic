"use client";

import { Hero } from "@/components/Hero";
import { Shield } from "lucide-react";
import React from "react";
import WhoWeAre from "./components/WhoWeAre";
import InformationCollection from "./components/InformationCollection";
import DataUsage from "./components/DataUsage";

export const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen">
      <Hero
        badgeIcon={<Shield className="h-8 w-8 text-white" />}
        badgeText="Effective Date: July 10, 2025"
        heading={"How We"}
        heading2={"Collect, Use, and Protect"}
        heading3="Your Information"
        subText={
          "Welcome to Medilogic! These Terms of Service govern your access to and use of the Medilogic platform, website, and services. By accessing or using our Service, you agree to these Terms."
        }
        descBadgeIcon={undefined}
        descBadgeText={""}
        descBadgeIcon2={undefined}
        descBadgeText2={""}
        descSubText="Important: If you do not agree to these Terms, please do not use Medilogic."
      />
      <WhoWeAre />
      <InformationCollection />
      <DataUsage />
      {/* <DataSecurity /> */}
      {/* <GDPRCompliance /> */}
      {/* <DataSharing /> */}
      {/* <InternationalTransfers /> */}
      {/* <DataRetention /> */}
      {/* <CookiesSection /> */}
      {/* <PolicyChangesSection /> */}
      {/* <ContactSection /> */}
    </main>
  );
};
