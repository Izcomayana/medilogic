"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Shield,
  Calendar,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";

export default function NHSSolution() {
  const [nhsRef, nhsInView] = useInView(0.1);

  const features = [
    {
      icon: Calendar,
      text: "Schedule and manage clinical waste pickups without manual coordination",
    },
    {
      icon: FileText,
      text: "Get instant access to full trip records and digital audit logs",
    },
    {
      icon: Shield,
      text: "Export data for regulatory compliance (e.g NHS DSP Toolkit)",
    },
    {
      icon: Users,
      text: "Assign staff and view their logistics activity in one secure platform",
    },
    {
      icon: BarChart3,
      text: "Predict trip costs and durations based on distance, waste type, and more",
    },
  ];

  return (
    <section ref={nhsRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${nhsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Building2 className="w-4 h-4" />
            For NHS Clinics & Hospitals
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline compliance. Automate collections. Protect patient data.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NHS institutions rely on efficiency, traceability, and full
            compliance. Medilogic helps your team operate with confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${nhsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Trusted Security for Public Healthcare
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Built with NHS-grade security standards and compliance
                  requirements from day one.
                </p>
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      NHS DSP Toolkit Ready
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Pre-configured for NHS Digital Service Provider requirements
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div
            className={`space-y-4 ${fadeInUp} ${nhsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  nhsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-3">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
