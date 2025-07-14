"use client";

import { Building2, CheckCircle, Shield, Truck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "../../hooks/useInView";
import { fadeInUp, staggerDelay } from "../../hooks/annimation";

export const PlatformFeatures = () => {
  const [featuresRef, featuresInView] = useInView(0.1);

  return (
    <section
      ref={featuresRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Truck className="w-4 h-4" />
            Everything You Need, All in One Platform
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Complete Logistics Management
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {[
            {
              icon: Shield,
              title: "Super Admin Dashboard",
              features: [
                "Manage organizations & users",
                "Full platform audit logs",
                "Global settings & access control",
              ],
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Building2,
              title: "Clinic & Waste Company Tools",
              features: [
                "Assign trips to drivers",
                "Monitor costs and compliance",
                "Export invoices and reports",
              ],
              color: "from-[#15941f] to-green-500",
            },
            {
              icon: Truck,
              title: "Driver Tools",
              features: [
                "Access routes and trip info",
                "Update delivery status in real time",
                "View personal trip history",
              ],
              color: "from-orange-500 to-red-500",
            },
            {
              icon: Users,
              title: "Client Access",
              features: [
                "Track collections",
                "View trip history",
                "Request support",
              ],
              color: "from-purple-500 to-pink-500",
            },
          ].map((section, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-1 ${fadeInUp} ${
                featuresInView
                  ? "opacity-100 translate-x-0 scale-100"
                  : `opacity-0 ${index % 2 === 0 ? "-translate-x-12" : "translate-x-12"} scale-95`
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10`}
                >
                  <section.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#15941f] transition-colors duration-300 relative z-10">
                  {section.title}
                </h3>
                <ul className="space-y-4 relative z-10">
                  {section.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#15941f] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
