"use client";

import { fadeInUp } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Building2, Stethoscope } from "lucide-react";

export default function Hero() {
  const [heroRef, heroInView] = useInView(0.1);

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
            <Puzzle className="w-4 h-4" />
            Solutions by Industry
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            Built for{" "}
            <span className="text-[#15941f] relative">
              Real-World Healthcare
              <div
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#15941f] to-green-400 rounded-full transition-all duration-1000 ${heroInView ? "w-full" : "w-0"}`}
                style={{ transitionDelay: "800ms" }}
              ></div>
            </span>{" "}
            Logistics
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            Medilogic is built to serve real-world logistics needs in the UK
            healthcare system. Whether you&apos;re running a hospital, managing
            private practices, or collecting clinical waste — Medilogic fits
            your flow.
          </p>

          <div
            className={`flex flex-wrap justify-center gap-4 mb-10 ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Badge
              variant="outline"
              className="bg-white border-[#15941f]/30 text-[#15941f] px-4 py-2 text-sm hover:scale-105 transition-transform duration-300"
            >
              <Building2 className="w-4 h-4 mr-2" />
              NHS & Private Healthcare
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#15941f]/30 text-[#15941f] px-4 py-2 text-sm hover:scale-105 transition-transform duration-300"
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Waste & Logistics Providers
            </Badge>
          </div>

          <div
            className={`max-w-3xl mx-auto ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "1000ms" }}
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore how Medilogic works for your type of organization:
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
