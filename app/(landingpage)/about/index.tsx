import React from "react";
import Hero from "./components/Hero";
import WhyMedilogic from "./components/WhyMedilogic";
import WhatMakesUsDiff from "./components/WhatMakesUsDiff";
import WhoWeServe from "./components/WhoWeServe";
import Vision from "./components/Vision";
import Compliance from "./components/Compliance";

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Hero />
      <WhyMedilogic />
      <WhatMakesUsDiff />
      <WhoWeServe />
      <Vision />
      <Compliance />

      {/* CTA Section */}
      {/* <CTASection /> */}

      {/* Footer */}
      {/* <FooterSection /> */}
    </div>
  );
};
