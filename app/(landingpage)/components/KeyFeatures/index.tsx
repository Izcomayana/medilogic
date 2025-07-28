import React from "react";
// import { fadeInUp, staggerDelay } from "../../hooks/annimation";
import {
  Brain,
  CheckCircle,
  ClipboardCheck,
  Gauge,
  MapPin,
  Monitor,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
// import { useInView } from "../../hooks/useInView";

export const KeyFeatures = () => {
  // const [keyFeaturesRef, keyFeaturesInView] = useInView(0.1);

  const features = [
    {
      icon: Brain,
      title: "AI-Optimized Waste Routing & Scheduling",
      desc: "Cut transport costs and boost efficiency with intelligent trip planning.",
      image: "/ai-optimized.png",
      color: "from-gray-500 to-gray-600",
    },
    {
      icon: Monitor,
      title: "Real-Time Compliance Dashboard",
      desc: "Instantly monitor GDPR, NHS, ISO 27001, and UK waste regulation compliance.",
      image: "/compliance-dashboard.png",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Live Trip Tracking for Clinics, Drivers & Clients",
      desc: "Track medical waste movements in real time — from pickup to disposal.",
      image: "/trip-tracking.png",
      color: "from-[#15941f] to-green-500",
    },
    {
      icon: ClipboardCheck,
      title: "Automated Consignment Notes & Digital Logs",
      desc: "Generate and store all required legal documents automatically.",
      image: "/notesandlogs.png",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Gauge,
      title: "Role-Based Smart Dashboards",
      desc: "Personalized views and KPIs for Admins, Clinics, Drivers, and Waste Firms.",
      image: "/rolebasedashboard.png",
      color: "from-orange-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto"
        >
          <div className="text-center mb-16 opacity-100 translate-y-12">
            <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-4 h-4" />
              Key Features That Set Us Apart
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Advanced Healthcare Logistics Solutions
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-2 p-0"
                >
                  <CardContent className="p-0">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        width={400}
                        height={400}
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div
                        className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-[#15941f] flex-shrink-0" />
                        <span className="text-sm font-medium text-[#15941f]">
                          Feature
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#15941f] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
