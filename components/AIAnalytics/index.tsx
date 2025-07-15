"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { BarChart3, TrendingUp, CheckCircle } from "lucide-react";

export default function AIAnalytics() {
  const [analyticsRef, analyticsInView] = useInView(0.1);

  const features = [
    "Predict trip duration using distance, cost, and waste type",
    "Visual dashboards for tracking trends and performance",
    "Filter data by driver, date range, trip status, organization",
    "Generate exportable reports for internal or regulatory use",
    "Spot bottlenecks or inefficiencies before they cause delays",
  ];

  return (
    <section ref={analyticsRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${analyticsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <BarChart3 className="w-4 h-4" />
            AI & Trip Analytics Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Smarter decisions, driven by data
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Medilogic includes a built-in intelligent analytics engine that
            helps optimize your operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${analyticsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-32 h-32 bg-emerald-200/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-teal-200/30 rounded-full animate-pulse delay-1000"></div>
              <div className="relative z-10">
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg mb-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${fadeInUp} ${analyticsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      Efficiency Score
                    </span>
                    <TrendingUp className="w-5 h-5 text-emerald-600 animate-pulse" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">92.4%</div>
                  <div className="text-sm text-emerald-600">
                    +8% improvement
                  </div>
                </div>
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${fadeInUp} ${analyticsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      Predicted Savings
                    </span>
                    <BarChart3 className="w-5 h-5 text-emerald-600 animate-pulse delay-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    £18,240
                  </div>
                  <div className="text-sm text-emerald-600">Next quarter</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`space-y-4 ${fadeInUp} ${analyticsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  analyticsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-emerald-200 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
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
