"use client";

import React from "react";
import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, UserCheck, Award } from "lucide-react";

type SecurityProps = {
  badgeText: string;
  heading: string;
  subText?: string;
  featuresIcon?: React.ReactNode;
  featuresTitle?: string;
  featuresDesc?: string;
  featuresTitle2?: string;
  featuresDesc2?: string;
};

export const Security: React.FC<SecurityProps> = ({
  badgeText,
  heading,
  subText,
  featuresTitle,
  featuresDesc,
  featuresTitle2,
  featuresDesc2,
}) => {
  const [securityRef, securityInView] = useInView(0.1);

  const securityFeatures = [
    {
      icon: UserCheck,
      title: "GDPR-compliant access flows",
      desc: "Every user interaction follows strict data protection regulations",
    },
    {
      icon: Lock,
      title: "Optional field-level encryption",
      desc: "Advanced encryption for sensitive healthcare data protection",
    },
    {
      icon: Award,
      title: featuresTitle,
      desc: featuresDesc,
    },
    {
      icon: Eye,
      title: featuresTitle2,
      desc: featuresDesc2,
    },
  ];

  return (
    <section
      ref={securityRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative">
        <div
          className={`text-center mb-16 ${fadeInUp} ${securityInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <Shield className="w-4 h-4" />
            {badgeText}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{heading}</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">{subText}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {securityFeatures.map((item, index) => (
            <Card
              key={index}
              className={`bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 group hover:-translate-y-2 hover:scale-105 ${fadeInUp} ${
                securityInView
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-12 rotate-3"
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 backdrop-blur-sm">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
