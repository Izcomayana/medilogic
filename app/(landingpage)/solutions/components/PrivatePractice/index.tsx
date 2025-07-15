"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Brain,
  Heart,
} from "lucide-react";

export default function PrivatePractice() {
  const [practiceRef, practiceInView] = useInView(0.1);

  const features = [
    {
      icon: Clock,
      text: "Get automated reminders and scheduling for clinical waste collections",
    },
    {
      icon: FileText,
      text: "Track every trip and expense in real time",
    },
    {
      icon: CheckCircle,
      text: "Download reports for inspections or internal review",
    },
    {
      icon: Users,
      text: "Offer staff role-specific access to manage tasks without overlap",
    },
    {
      icon: Brain,
      text: "Use AI-powered insights to keep deliveries on time and under budget",
    },
  ];

  return (
    <section
      ref={practiceRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${practiceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Stethoscope className="w-4 h-4" />
            For Private Medical Practices
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Save time, reduce admin burden, and stay compliant.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Private clinics often lack dedicated logistics teams. Medilogic
            makes it simple so you can focus on what matters most.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`space-y-4 ${fadeInUp} ${practiceInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  practiceInView
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

          <div
            className={`${fadeInUp} ${practiceInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <Card className="bg-gradient-to-br from-[#15941f]/5 to-green-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#15941f] to-green-400 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  You Focus on Patients — We Handle the Logistics
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Streamlined operations designed for busy private practices
                  without dedicated logistics staff.
                </p>
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-[#15941f]" />
                    <span className="font-semibold text-gray-900">
                      Automated Scheduling
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Never miss a collection with smart reminders and automation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
