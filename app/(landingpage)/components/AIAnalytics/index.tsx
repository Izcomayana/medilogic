import React from "react";
import { useInView } from "../../hooks/useInView";
import { BarChart3, Clock, FileText, TrendingUp } from "lucide-react";
import { fadeInUp, staggerDelay } from "../../hooks/annimation";

export const AIAnalytics = () => {
  const [aiRef, aiInView] = useInView(0.1);

  return (
    <section ref={aiRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${aiInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
              <BarChart3 className="w-4 h-4" />
              AI & Trip Analytics Engine
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Predictive insights for smarter decisions
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Medilogic&apos;s AI engine helps optimize routes, reduce costs,
              and streamline operations.
            </p>

            <div className="space-y-6">
              {[
                { icon: Clock, text: "Estimated trip duration and cost" },
                { icon: TrendingUp, text: "Visual reports and trends" },
                { icon: FileText, text: "Exportable CSV/PDF analytics" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                    aiInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={staggerDelay(index)}
                >
                  <div className="w-12 h-12 bg-[#15941f]/10 rounded-xl flex items-center justify-center group-hover:bg-[#15941f]/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-[#15941f]" />
                  </div>
                  <span className="text-lg text-gray-700 group-hover:text-[#15941f] transition-colors duration-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative ${fadeInUp} ${aiInView ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-95"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="bg-gradient-to-br from-[#15941f]/10 to-green-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-32 h-32 bg-[#15941f]/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-200/50 rounded-full animate-pulse delay-1000"></div>
              <div className="relative z-10">
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg mb-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${fadeInUp} ${aiInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      Trip Efficiency
                    </span>
                    <TrendingUp className="w-5 h-5 text-[#15941f] animate-pulse" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">94.2%</div>
                  <div className="text-sm text-green-600">
                    +12% from last month
                  </div>
                </div>
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${fadeInUp} ${aiInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: "700ms" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Cost Savings</span>
                    <BarChart3 className="w-5 h-5 text-[#15941f] animate-pulse delay-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    £24,580
                  </div>
                  <div className="text-sm text-green-600">This quarter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
