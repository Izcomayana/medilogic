"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

export default function RevenueTransparency() {
  const [revenueRef, revenueInView] = useInView(0.1);

  const revenueData = [
    {
      channel: "Starter Clinics",
      accounts: "2,000",
      monthlyRevenue: "£98,000",
      annualRevenue: "£1.17M",
      color: "from-blue-500 to-blue-600",
    },
    {
      channel: "Pro Clinics/Firms",
      accounts: "500",
      monthlyRevenue: "£89,500",
      annualRevenue: "£1.07M",
      color: "from-[#15941f] to-green-500",
    },
    {
      channel: "Enterprise Hospitals",
      accounts: "200",
      monthlyRevenue: "£89,800",
      annualRevenue: "£1.07M",
      color: "from-purple-500 to-pink-500",
    },
    {
      channel: "Regulators",
      accounts: "150",
      monthlyRevenue: "£44,850",
      annualRevenue: "£538K",
      color: "from-orange-500 to-red-500",
    },
    {
      channel: "Add-ons (30% Estimate)",
      accounts: "–",
      monthlyRevenue: "~£20K",
      annualRevenue: "~£240K",
      color: "from-gray-500 to-gray-600",
    },
  ];

  return (
    <section
      ref={revenueRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative">
        <div
          className={`text-center mb-16 ${fadeInUp} ${revenueInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <BarChart3 className="w-4 h-4" />
            Revenue Transparency
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            📈 Projected Revenue Impact
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            For transparency — here&#39;s how we project our revenue growth
            across different market segments
          </p>
        </div>

        <div className="overflow-x-auto mb-8">
          <div className="min-w-full">
            <div className="grid grid-cols-4 gap-4 mb-4 text-sm font-semibold text-white/80">
              <div>Channel</div>
              <div># Accounts</div>
              <div>Monthly Revenue</div>
              <div>Annual Revenue</div>
            </div>
            {revenueData.map((row, index) => (
              <Card
                key={index}
                className={`bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 mb-3 ${fadeInUp} ${
                  revenueInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={staggerDelay(index)}
              >
                <CardContent className="p-4">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 bg-gradient-to-r ${row.color} rounded-full`}
                      ></div>
                      <span className="text-white font-medium">
                        {row.channel}
                      </span>
                    </div>
                    <div className="text-white/90">{row.accounts}</div>
                    <div className="text-white/90">{row.monthlyRevenue}</div>
                    <div className="text-white font-semibold">
                      {row.annualRevenue}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div
          className={`text-center ${fadeInUp} ${revenueInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-300" />
              <div>
                <div className="text-3xl font-bold text-white">£4M+</div>
                <div className="text-white/80">TOTAL (Yearly)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
