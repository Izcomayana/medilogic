"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { FileText, Clock, Download, Shield, CheckCircle } from "lucide-react";

export default function AuditTrails() {
  const [auditRef, auditInView] = useInView(0.1);

  const auditFeatures = [
    {
      icon: FileText,
      text: "View activity logs per organization or across the entire platform",
    },
    {
      icon: Download,
      text: "Export logs for audits or compliance reviews",
    },
    {
      icon: Shield,
      text: "Monitor user behavior to detect anomalies",
    },
  ];

  return (
    <section ref={auditRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${auditInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
              <FileText className="w-4 h-4" />
              Transparent Audit Trails
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Every key action is time-stamped and logged
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Every key action on the platform — sign-ups, updates, trip logs,
              data exports — is time-stamped and logged.
            </p>
            <div className="bg-gradient-to-br from-[#15941f]/5 to-green-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#15941f]" />
                <h3 className="text-lg font-bold text-gray-900">
                  Complete Transparency
                </h3>
              </div>
              <p className="text-gray-700">
                Your team has full visibility. Your regulators have full
                traceability.
              </p>
            </div>

            <div className="space-y-4">
              {auditFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                    auditInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={staggerDelay(index)}
                >
                  <div className="w-6 h-6 bg-[#15941f]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#15941f]/20 transition-colors duration-300">
                    <CheckCircle className="w-4 h-4 text-[#15941f]" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative ${fadeInUp} ${auditInView ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-95"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 w-32 h-32 bg-[#15941f]/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-200/10 rounded-full animate-pulse delay-1000"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-300">
                    Audit Log Activity
                  </span>
                  <FileText className="w-5 h-5 text-[#15941f] animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">User Login</span>
                      <span className="text-xs text-gray-300">2 min ago</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      admin@nhstrust.uk
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Trip Status Updated
                      </span>
                      <span className="text-xs text-gray-300">5 min ago</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      Trip #MW-2024-001 → Completed
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Data Export</span>
                      <span className="text-xs text-gray-300">12 min ago</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      Compliance report generated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
