"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Truck,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  Building2,
  Stethoscope,
  Recycle,
  Clock,
  FileText,
  TrendingUp,
  Lock,
  Award,
  Zap,
  Phone,
  ChevronRight,
  Globe,
  Database,
  UserCheck,
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
  const [heroRef, heroInView] = useInView(0.1);
  const [audienceRef, audienceInView] = useInView(0.1);
  const [featuresRef, featuresInView] = useInView(0.1);
  const [aiRef, aiInView] = useInView(0.1);
  const [securityRef, securityInView] = useInView(0.1);
  const [quickStartRef, quickStartInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

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

      {/* AI Analytics */}
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
                    <div className="text-3xl font-bold text-gray-900">
                      94.2%
                    </div>
                    <div className="text-sm text-green-600">
                      +12% from last month
                    </div>
                  </div>
                  <div
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${fadeInUp} ${aiInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: "700ms" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        Cost Savings
                      </span>
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

      {/* Security & Compliance */}
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
        </div>
      </section>

      {/* Quick Start */}
      <section ref={quickStartRef} className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 ${fadeInUp} ${quickStartInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
              <Zap className="w-4 h-4 animate-pulse" />
              Start Fast, Stay in Control
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Quick organization onboarding with secure invite codes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: UserCheck,
                title: "Role-based access",
                desc: "with data isolation",
              },
              {
                icon: Database,
                title: "Scalable infrastructure",
                desc: "for NHS-level operations",
              },
              {
                icon: Shield,
                title: "Secure invite codes",
                desc: "for quick onboarding",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center group hover:-translate-y-2 transition-all duration-500 ${fadeInUp} ${
                  quickStartInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-90"
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#15941f] to-green-400 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#15941f] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 px-4 bg-gradient-to-br from-[#15941f] to-green-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20"></div>

        <div className="container mx-auto max-w-4xl text-center relative">
          <div
            className={`${fadeInUp} ${ctaInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
              <Phone className="w-4 h-4 animate-pulse" />
              Ready to Modernize Your Logistics?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Take the first step toward secure, AI-enhanced logistics.
            </h2>
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 ${fadeInUp} ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <Button
                size="lg"
                className="bg-white text-[#15941f] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                Book a Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#15941f] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-transparent hover:scale-105"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6 group">
                <div className="bg-[#15941f] rounded p-2 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="text-white group-hover:rotate-90 transition-transform duration-300"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <span className="text-2xl font-bold">Medilogic</span>
              </div>
              <p className="text-gray-400 text-lg max-w-md">
                Transforming healthcare logistics with AI-powered precision and
                NHS-compliant security.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {["About", "Features", "Compliance", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {["Terms of Use", "Privacy Policy"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Medilogic Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
