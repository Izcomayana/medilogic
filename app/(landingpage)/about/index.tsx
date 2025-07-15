"use client";

import React from "react";
import Hero from "./components/Hero";
import WhyMedilogic from "./components/WhyMedilogic";
import WhatMakesUsDiff from "./components/WhatMakesUsDiff";
import WhoWeServe from "./components/WhoWeServe";
import Vision from "./components/Vision";
import Compliance from "./components/Compliance";
import { CTA } from "../../../components/CTA";
import { Rocket } from "lucide-react";

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero />
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
