"use client";

import { useInView } from "../../../hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Shield, Brain, Settings } from "lucide-react";

export default function WhatMakesDifferentSection() {
  const [differentRef, differentInView] = useInView(0.1);
  const fadeInUp = "transition-all duration-700 ease-out";
  const staggerDelay = (index: number) => ({
    transitionDelay: `${index * 150}ms`,
  });

  const differentiators = [
    {
      icon: Target,
      title: "Industry-Focused",
      desc: "Tailored for healthcare — not retail, not food, not general logistics.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Shield,
      title: "Security-First",
      desc: "From field-level encryption to audit trails, everything is built with compliance and patient data protection in mind.",
      color: "from-[#15941f] to-green-500",
    },
    {
      icon: Brain,
      title: "AI Intelligence",
      desc: "Medilogic predicts trip durations, flags inefficiencies, and helps you plan smarter with real-time analytics.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Settings,
      title: "Role-Based Access",
      desc: "Drivers, admins, and clients only see what they need — keeping your organization secure and streamlined.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      ref={differentRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${differentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <CheckCircle className="w-4 h-4" />
            What Makes Medilogic Different
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Built specifically for healthcare logistics
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {differentiators.map((item, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-2 ${fadeInUp} ${
                differentInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : `opacity-0 ${index % 2 === 0 ? "-translate-x-12" : "translate-x-12"} scale-95`
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <CheckCircle className="w-5 h-5 text-[#15941f] flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#15941f] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
