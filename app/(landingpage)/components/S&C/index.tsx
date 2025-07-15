import {
  Award,
  Globe,
  Shield,
  Lock,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import React from "react";
import { useInView } from "../../hooks/useInView";
import { fadeInUp, staggerDelay } from "../../hooks/annimation";
import { Card, CardContent } from "@/components/ui/card";

export const Security = () => {
  const [securityRef, securityInView] = useInView(0.1);

  return (
    <>
      {/* Security & Compliance 54*/}
      <section
        ref={securityRef}
        className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0  opacity-20"></div>

        <div className="container mx-auto max-w-7xl relative">
          <div
            className={`text-center mb-16 ${fadeInUp} ${securityInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
              <Shield className="w-4 h-4" />
              Serious About Security & Compliance
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              We&apos;re compliant and audit-ready so you don&apos;t have to
              worry
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: UserCheck,
                title: "GDPR-Compliant",
                desc: "Signup & Data Handling",
              },
              { icon: Lock, title: "Field-Level", desc: "Encryption" },
              { icon: Award, title: "ISO 27001-Aligned", desc: "Architecture" },
              { icon: Globe, title: "NHS DSP Toolkit", desc: "Ready" },
            ].map((item, index) => (
              <Card
                key={index}
                className={`bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 group hover:-translate-y-2 hover:scale-105 ${fadeInUp} ${
                  securityInView
                    ? "opacity-100 translate-y-0 rotate-0"
                    : "opacity-0 translate-y-12 rotate-3"
                }`}
                style={staggerDelay(index)}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 backdrop-blur-sm">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.desc}</p>
                  <CheckCircle className="w-6 h-6 text-green-400 mx-auto group-hover:scale-125 transition-transform duration-300" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <h3 className="text-xl font-bold">
              ✅ Real-Time Compliance Dashboard
            </h3>
            <p className="text-base mt-4">
              Instantly monitor GDPR, NHS, ISO 27001, and UK waste regulation
              compliance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
