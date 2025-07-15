"use client";

import { fadeInUp } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Users, ArrowRight, Play } from "lucide-react";

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
            <Settings className="w-4 h-4" />
            Platform Features
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            Every User Gets <br />
            <span className="text-[#15941f] relative">
              Exactly What They Need
              <div
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#15941f] to-green-400 rounded-full transition-all duration-1000 ${heroInView ? "w-full" : "w-0"}`}
                style={{ transitionDelay: "800ms" }}
              ></div>
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            Medilogic gives every user — from super admins to drivers — exactly
            what they need. No more, no less. Explore the platform&apos;s core
            features by user role below.
          </p>

          <div
            className={`flex flex-wrap justify-center gap-4 mb-10 ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Badge
              variant="outline"
              className="bg-white border-[#15941f]/30 text-[#15941f] px-4 py-2 text-sm hover:scale-105 transition-transform duration-300"
            >
              <Users className="w-4 h-4 mr-2" />
              Role-Based Features
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#15941f]/30 text-[#15941f] px-4 py-2 text-sm hover:scale-105 transition-transform duration-300"
            >
              <Settings className="w-4 h-4 mr-2" />
              Tailored Workflows
            </Badge>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "1000ms" }}
          >
            <Button
              size="lg"
              className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              Schedule a Live Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#15941f] text-[#15941f] hover:bg-[#15941f] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group bg-transparent hover:scale-105"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
