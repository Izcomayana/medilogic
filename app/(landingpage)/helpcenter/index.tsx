"use client";

import { Hero } from "@/components/Hero";
import { BookOpen, HelpCircle } from "lucide-react";
import GettingStarted from "./components/GettingStarted";
import PlatformUsage from "./components/PlatformUsage";
import Troubleshooting from "./components/TroubleShooting";
import ComplianceSecurity from "./components/ComplianceSecurity";
import ContactSupport from "./components/ContactSupport";

export const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero
        badgeIcon={<HelpCircle className="w-4 h-4" />}
        badgeText="Help Center & FAQs"
        heading={"Welcome to the"}
        heading2={"Medilogic Help Center"}
        subText={
          "Your go-to resource for quick answers and helpful guidance. Whether you're just getting started or need support with compliance, we've got you covered."
        }
        descBadgeIcon={<BookOpen className="w-4 h-4 mr-2" />}
        descBadgeText={"Quick Answers"}
        descBadgeIcon2={<HelpCircle className="w-4 h-4 mr-2" />}
        descBadgeText2={"Helpful Guidance"}
        descSubText='Try searching for "invite code", "assign trip", or "GDPR compliance"'
      />
      <GettingStarted />
      <PlatformUsage />
      <Troubleshooting />
      <ComplianceSecurity />
      <ContactSupport />
    </div>
  );
};
