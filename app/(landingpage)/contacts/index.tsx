"use client";

import { Hero } from "@/components/Hero";
import { Hand, HelpCircle, Mail } from "lucide-react";
import React from "react";
import ContactForm from "./components/Form";
import ContactInfo from "./components/Info";
import SocialMedia from "./components/SocialMedia";
import { CTA } from "@/components/CTA";

export const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero
        badgeIcon={<Mail className="w-4 h-4" />}
        badgeText="Contact Us"
        heading={"Have a Question?"}
        heading2={"We're Here to Help"}
        subText={
          "Need support? Want to partner with us? We're here to help — whether you're an NHS clinic, private practice, logistics firm, or simply curious about how Medilogic works."
        }
        descBadgeIcon={<Mail className="w-4 h-4 mr-2" />}
        descBadgeText={"Get in Touch"}
        descBadgeIcon2={<HelpCircle className="w-4 h-4 mr-2" />}
        descBadgeText2={"Dedicated Support"}
        descSubText="Fill out the form below or reach out directly to the right team."
      />
      <ContactForm />
      <ContactInfo />
      <SocialMedia />
      <CTA
        badgeText={"Reach out to us"}
        badgeIcon={<Hand />}
        heading={"We're Ready to Help"}
        subText="Whether you’re looking for a demo, need support, or want to explore how Medilogic fits your workflow — we’re just a message away."
      />
    </div>
  );
};
