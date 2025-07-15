"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Building2 } from "lucide-react";
import { useInView } from "../../../hooks/useInView";

export default function AboutHeroSection() {
  const [heroRef, heroInView] = useInView(0.1);
  const fadeInUp = "transition-all duration-700 ease-out";

  return (
    <section
      ref={heroRef}
      className="relative pt-24 lg:pt-32 pb-16 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#15941f]/5 to-transparent"></div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#15941f]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto max-w-7xl relative">
        <div
          className={`text-center ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div
            className={`inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#15941f]/20 ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <Building2 className="w-4 h-4" />
            About Medilogic
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            Revolutionizing{" "}
            <span className="text-[#15941f] relative">
              Clinical Logistics
              <div
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#15941f] to-green-400 rounded-full transition-all duration-1000 ${heroInView ? "w-full" : "w-0"}`}
                style={{ transitionDelay: "800ms" }}
              ></div>
            </span>{" "}
            Across the UK
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            Medilogic is a Software-as-a-Service (SaaS) platform revolutionizing
            clinical logistics across the UK healthcare sector. We empower
            clinics, hospitals, waste companies, and logistics providers with an
            AI-driven, secure, and fully compliant system.
          </p>

          <div
            className={`flex flex-wrap justify-center gap-4 mb-10 ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Badge
              variant="outline"
              className="bg-white border-[#15941f]/30 text-[#15941f] px-4 py-2 text-sm hover:scale-105 transition-transform duration-300"
            >
              <Shield className="w-4 h-4 mr-2" />
              Fully Compliant System
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#15941f]/30 text-[#15941f] px-4 py-2 text-sm hover:scale-105 transition-transform duration-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              AI-Driven Platform
            </Badge>
          </div>

          <div
            className={`max-w-3xl mx-auto ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "1000ms" }}
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you&apos;re handling thousands of trips a month or just
              beginning to digitize your operations, Medilogic gives you the
              tools to stay efficient, compliant, and in control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
