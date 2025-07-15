"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, CheckCircle } from "lucide-react";

export default function Driver() {
  const [driverRef, driverInView] = useInView(0.1);

  const features = [
    "Access daily pickup/delivery schedules",
    "View instructions for each trip (e.g. location, contact, waste type)",
    "Update status: started, completed, delayed, cancelled",
    "Record notes and attach relevant proof or feedback",
    "Access historical trip logs and performance history",
  ];

  return (
    <section ref={driverRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${driverInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Truck className="w-4 h-4" />
            Driver Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, mobile-friendly tools for field operations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Drivers have a streamlined interface to stay focused and informed on
            the move.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${driverInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Mobile-First Design
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Optimized for smartphones and tablets, ensuring drivers can
                  efficiently manage their routes and deliveries on the go.
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            className={`space-y-4 ${fadeInUp} ${driverInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  driverInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-orange-200 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
