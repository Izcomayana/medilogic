"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import WhyMedilogic from "./components/WhyMedilogic";
import WhatMakesUsDiff from "./components/WhatMakesUsDiff";
import WhoWeServe from "./components/WhoWeServe";
import Vision from "./components/Vision";
import Compliance from "./components/Compliance";
import { CTA } from "../../../components/CTA";
import { Building2, Rocket, Shield, Zap } from "lucide-react";

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero
        badgeIcon={<Building2 className="w-4 h-4" />}
        badgeText="About Medilogic"
        heading={"Revolutionizing"}
        heading2={" Clinical Logistics"}
        heading3="Across the UK"
        subText={
          "Medilogic is a Software-as-a-Service (SaaS) platform revolutionizing clinical logistics across the UK healthcare sector. We empower clinics, hospitals, waste companies, and logistics providers with an AI-driven, secure, and fully compliant system."
        }
        descBadgeIcon={<Shield className="w-4 h-4 mr-2" />}
        descBadgeText={"Fully Compliant System"}
        descBadgeIcon2={<Zap className="w-4 h-4 mr-2" />}
        descBadgeText2={"AI-Driven Platform"}
        descSubText={
          "Whether you're handling thousands of trips a month or just beginning to digitize your operations, Medilogic gives you the tools to stay efficient, compliant, and in control."
        }
      />
      <WhyMedilogic />
      <WhatMakesUsDiff />
      <WhoWeServe />
      <Vision />
      <Compliance />
      <CTA
        badgeText={"Ready to take control of your logistics?"}
        badgeIcon={<Rocket className="w-4 h-4 animate-pulse" />}
        heading={"Join the Movement"}
        subText={
          "Medilogic is already supporting healthcare providers across the UK — helping them save time, reduce costs, and meet compliance with confidence."
        }
      />
    </div>
  );
};
