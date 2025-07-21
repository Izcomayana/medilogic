"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight,
  Play,
} from "lucide-react";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";

export default function ContactSupportSection() {
  const [contactRef, contactInView] = useInView(0.1);

  const contactMethods = [
    {
      icon: Mail,
      title: "General Support",
      detail: "support@medilogic.uk",
      desc: "Email us for general questions and support",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+44 20 1234 5678",
      desc: "Monday–Friday, 9AM–5PM (UK time)",
      color: "from-[#15941f] to-green-500",
      bgColor: "from-[#15941f]/5 to-green-50",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      detail: "Bottom right corner",
      desc: "Instant support during business hours",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <section ref={contactRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Phone className="w-4 h-4" />
            Need More Help?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            We&lsquo;re here to support you
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Monday–Friday, 9AM–5PM (UK time)</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-2 ${fadeInUp} ${
                contactInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={staggerDelay(index)}
            >
              <CardContent
                className={`p-8 bg-gradient-to-br ${method.bgColor} relative text-center`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#15941f] transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {method.detail}
                </p>
                <p className="text-gray-600">{method.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`text-center ${fadeInUp} ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "450ms" }}
        >
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Use the search bar above or browse by topic to find the answers
              you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                Contact Support
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#15941f] text-[#15941f] hover:bg-[#15941f] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group bg-transparent hover:scale-105"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
