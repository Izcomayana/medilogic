"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
    Users,
  Truck,
  //   BarChart3,
    CheckCircle,
  ArrowRight,
  Play,
  Building2,
  Stethoscope,
  Recycle,
  //   Clock,
  //   FileText,
  //   TrendingUp,
  //   Lock,
  Award,
  //   Zap,
  //   Phone,
  //   ChevronRight,
  //   Globe,
  //   Database,
  //   UserCheck,
} from "lucide-react";

// Custom hook for intersection observer
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
}

export default function HomePage() {
  // const [isVisible, setIsVisible] = useState(false)
  const [heroRef, heroInView] = useInView(0.1);
  const [audienceRef, audienceInView] = useInView(0.1);
  const [featuresRef, featuresInView] = useInView(0.1)
  // const [aiRef, aiInView] = useInView(0.1)
  // const [securityRef, securityInView] = useInView(0.1)
  // const [quickStartRef, quickStartInView] = useInView(0.1)
  // const [ctaRef, ctaInView] = useInView(0.1)

  // useEffect(() => {
  //   setIsVisible(true)
  // }, [])

  const fadeInUp = "transition-all duration-700 ease-out";
  const staggerDelay = (index: number) => ({
    transitionDelay: `${index * 150}ms`,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#15941f]/5 to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#15941f]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto max-w-7xl relative text-center my-10">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            Transforming Clinical Logistics with{" "}
            <span className="text-[#15941f] relative">
              AI-Powered Precision
              <div
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#15941f] to-green-400 rounded-full transition-all duration-1000 ${heroInView ? "w-full" : "w-0"}`}
                style={{ transitionDelay: "800ms" }}
              ></div>
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            A secure, intelligent platform for managing clinical waste
            transport, medical deliveries, and NHS-compliant reporting.
          </p>

          <div
            className={`flex flex-wrap justify-center gap-4 mb-10 ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Badge
              variant="outline"
              className="bg-white border-[#15941f]/30 text-[#15941f] px-4 py-2 text-sm hover:scale-105 transition-transform duration-300"
            >
              <Shield className="w-4 h-4 mr-2" />
              GDPR & ISO 27001 Ready
            </Badge>
            <Badge
              variant="outline"
              className="bg-white border-[#15941f]/30 text-[#15941f] px-2 py-2 text-xs md:text-sm hover:scale-105 transition-transform duration-300"
            >
              <Award className="w-4 h-4 mr-2" />
              Built for NHS Clinics, Private Practices & Medical Couriers
            </Badge>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${fadeInUp} ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "1000ms" }}
          >
            <Button
              size="lg"
              className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              Get a Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#15941f] text-[#15941f] hover:bg-[#15941f] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group bg-transparent hover:scale-105"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Learn How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Built for Healthcare Professionals */}
      <section ref={audienceRef} className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 ${fadeInUp} ${audienceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
              <Stethoscope className="w-4 h-4" />
              Built for Healthcare Professionals, by Healthcare Experts
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Medilogic is designed to serve:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "NHS clinics & hospitals",
                desc: "Streamlined operations for public healthcare",
              },
              {
                icon: Stethoscope,
                title: "Private medical practices",
                desc: "Efficient logistics for private care",
              },
              {
                icon: Recycle,
                title: "Medical waste disposal companies",
                desc: "Compliant waste management solutions",
              },
              {
                icon: Truck,
                title: "Healthcare logistics firms",
                desc: "Optimized delivery and transport",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                  audienceInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={staggerDelay(index)}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#15941f] to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#15941f] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={`text-center mt-12 ${fadeInUp} ${audienceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From scheduling pickups to full audit trails, Medilogic is your
              all-in-one logistics command center.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section ref={featuresRef} className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className={`text-center mb-16 ${fadeInUp} ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
              <Truck className="w-4 h-4" />
              Everything You Need, All in One Platform
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Complete Logistics Management</h2>
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
                features: ["Assign trips to drivers", "Monitor costs and compliance", "Export invoices and reports"],
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
                features: ["Track collections", "View trip history", "Request support"],
                color: "from-purple-500 to-pink-500",
              },
            ].map((section, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-1 ${fadeInUp} ${
                  featuresInView ? "opacity-100 translate-x-0 scale-100" : `opacity-0 ${index % 2 === 0 ? "-translate-x-12" : "translate-x-12"} scale-95`
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#15941f] transition-colors duration-300 relative z-10">{section.title}</h3>
                  <ul className="space-y-4 relative z-10">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${idx * 100}ms` }}>
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

      
    </div>
  );
}
