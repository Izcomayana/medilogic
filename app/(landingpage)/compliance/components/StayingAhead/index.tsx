"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { TrendingUp, RefreshCw, FileText, CheckCircle } from "lucide-react";

export default function StayingAhead() {
  const [aheadRef, aheadInView] = useInView(0.1);

  const updateFeatures = [
    {
      icon: RefreshCw,
      text: "Ongoing alignment with NHS DSP Toolkit updates",
    },
    {
      icon: FileText,
      text: "Internal security reviews and policy updates",
    },
    {
      icon: TrendingUp,
      text: "Transparent change logs when features impact compliance",
    },
  ];

  return (
    <section ref={aheadRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${aheadInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-4 h-4" />
              Staying Ahead
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              We stay ahead, so you don&apos;t fall behind
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Regulations evolve. So do we. Our team continuously updates
              Medilogic to ensure ongoing compliance.
            </p>

            <div className="space-y-4">
              {updateFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                    aheadInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={staggerDelay(index)}
                >
                  <div className="w-12 h-12 bg-[#15941f]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#15941f]/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-[#15941f]" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-3">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative ${fadeInUp} ${aheadInView ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-95"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="bg-gradient-to-br from-[#15941f]/5 to-green-50 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-32 h-32 bg-[#15941f]/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-200/30 rounded-full animate-pulse delay-1000"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#15941f] rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Your Responsibility. Our Infrastructure.
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Whether you&apos;re an NHS clinic, a private practice, or a
                  medical logistics firm — we help you meet your legal
                  obligations with confidence.
                </p>
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#15941f]" />
                    <span className="font-semibold text-gray-900">
                      Continuous Updates
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Always aligned with the latest regulatory requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
