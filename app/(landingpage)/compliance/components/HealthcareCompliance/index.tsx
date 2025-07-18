"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, Award, Building2 } from "lucide-react";

export default function HealthcareCompliance() {
  const [complianceRef, complianceInView] = useInView(0.1);

  const standards = [
    {
      icon: Shield,
      title: "GDPR",
      subtitle: "General Data Protection Regulation",
      desc: "Full compliance with EU data protection standards for healthcare data handling",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: Award,
      title: "ISO/IEC 27001",
      subtitle: "Information Security Management",
      desc: "International standard for information security management systems",
      color: "from-[#15941f] to-green-500",
      bgColor: "from-[#15941f]/5 to-green-50",
    },
    {
      icon: Building2,
      title: "NHS DSP Toolkit",
      subtitle: "Data Security & Protection Toolkit",
      desc: "Mandatory compliance for NHS-connected organizations and suppliers",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <section ref={complianceRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${complianceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Shield className="w-4 h-4" />
            Built for Healthcare Compliance
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Designed from the ground up to meet the strictest standards
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Medilogic is designed from the ground up to meet the strictest
            standards in the UK healthcare system. Our platform helps you stay
            compliant without slowing down operations.
          </p>
        </div>

        <div
          className={`text-center mb-12 ${fadeInUp} ${complianceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Key Standards We Align With:
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {standards.map((standard, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-2 ${fadeInUp} ${
                complianceInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={staggerDelay(index)}
            >
              <CardContent
                className={`p-8 bg-gradient-to-br ${standard.bgColor} relative text-center`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${standard.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10`}
                >
                  <standard.icon className="w-8 h-8 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-[#15941f] flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#15941f] transition-colors duration-300">
                      {standard.title}
                    </h3>
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 mb-4">
                    {standard.subtitle}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {standard.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
