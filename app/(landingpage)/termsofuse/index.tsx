"use client";

import { Hero } from "@/components/Hero";
import { FileText } from "lucide-react";
import React from "react";
import UseOfService from "./components/UseOfService";
import Eligibility from "./components/Eligibility";

export const TermsOfUse = () => {
  return (
    <main className="min-h-screen">
      <Hero
        badgeIcon={<FileText className="h-8 w-8 text-white" />}
        badgeText="Terms of Service"
        heading={"Your Use of"}
        heading2={"Our Services,"}
        heading3="Explained"
        subText={
          "Welcome to Medilogic! These Terms of Service govern your access to and use of the Medilogic platform,  website, and services. By accessing or using our Service, you agree to these Terms."
        }
        descBadgeIcon={undefined}
        descBadgeText={""}
        descBadgeIcon2={undefined}
        descBadgeText2={""}
        descSubText="Important: If you do not agree to these Terms, please do not use Medilogic."
      />
      <UseOfService />
      <Eligibility />
      {/* <UserResponsibilities /> */}
      {/* <OrganizationAccounts /> */}
      {/* <PaymentSubscription /> */}
      {/* <DataPrivacy /> */}
      {/* <SuspensionTermination /> */}
      {/* <ChangesToTerms /> */}
      {/* <GoverningLaw /> */}
      {/* <Contact /> */}
    </main>
  );
};
