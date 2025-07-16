"use client";

import React from "react";
import Hero from "./components/Hero";
import SuperAdmin from "./components/SuperAdmin";
import ClinicAdmin from "./components/ClinicAdmin";
import Driver from "./components/Driver";
import Client from "./components/Client";
import AIAnalytics from "@/components/AIAnalytics";
import { Security } from "@/components/Security";
import { CTA } from "@/components/CTA";
import { Calendar } from "lucide-react";

export const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero />
      <SuperAdmin />
      <ClinicAdmin />
      <Driver />
      <Client />
      <AIAnalytics />
      <Security
        badgeText={"Security Across All Roles"}
        heading={"Every action is tracked and secured"}
        subText={
          "Regardless of role, every action in Medilogic is tracked and secured with enterprise-grade protection."
        }
        featuresTitle="Role-based permission control"
        featuresDesc="Granular access controls ensuring users only see what they need"
        featuresTitle2="Full audit trail of every action"
        featuresDesc2="Complete transparency with detailed logs for compliance"
      />
      <CTA
        badgeIcon={<Calendar className="w-4 h-4 animate-pulse" />}
        badgeText={"Want to See These Features in Action?"}
        heading={
          "Let us show you how Medilogic fits your role, your workflow, and your organization."
        }
      />
    </div>
  );
};
