"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import {
  Truck,
  CheckCircle,
  Shield,
  MapPin,
  Clock,
  BarChart3,
  FileText,
} from "lucide-react";

export default function CourierSection() {
  const [courierRef, courierInView] = useInView(0.1);

  const features = [
    {
      icon: Shield,
      text: "Maintain a digital chain of custody with time-stamped records",
    },
    {
      icon: MapPin,
      text: "Give drivers access to routes, instructions, and delivery notes",
    },
    {
      icon: BarChart3,
      text: "Optimize routes with trip prediction and performance analytics",
    },
    {
      icon: Clock,
      text: "Track deliveries, delays, and completion status in real time",
    },
    {
      icon: CheckCircle,
      text: "Provide clients with a transparent and secure delivery experience",
    },
  ];

  return (
    <section
      ref={courierRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${courierInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Truck className="w-4 h-4" />
            For Medical Couriers & Logistics Providers
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Power your deliveries with AI-backed efficiency.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            If you specialize in transporting sensitive medical materials or lab
            samples, Medilogic helps you maintain the highest standards.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`space-y-4 ${fadeInUp} ${courierInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  courierInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-3">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <div
            className={`${fadeInUp} ${courierInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  From Lab Tests to Urgent Deliveries
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Complete chain of custody and real-time tracking for sensitive
                  medical materials and lab samples.
                </p>
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-gray-900">
                      Digital Chain of Custody
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Time-stamped records for complete traceability and
                    compliance
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
