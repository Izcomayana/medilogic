"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Plus, Minus } from "lucide-react";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";

export default function PlatformUsageSection() {
  const [usageRef, usageInView] = useInView(0.1);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqs = [
    {
      question: "How do I assign a trip to a driver?",
      answer:
        "Admins can assign trips from the dashboard by selecting a trip and choosing an available driver from their organization's roster.",
    },
    {
      question: "What happens if a trip is delayed or missed?",
      answer:
        "Drivers can mark trips as delayed with a reason. The system logs this, notifies the admin, and includes it in the audit report.",
    },
    {
      question: "Can I track past trips?",
      answer:
        "Yes. All users (with the right access) can view completed trip history, including time stamps, cost, and delivery notes.",
    },
  ];

  return (
    <section
      ref={usageRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-4xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${usageInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Settings className="w-4 h-4" />
            Platform Usage
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Using Medilogic day-to-day
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`group hover:shadow-lg transition-all duration-500 border border-gray-200 hover:border-[#15941f]/30 ${fadeInUp} ${
                usageInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#15941f] transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedItems.includes(index) ? (
                      <Minus className="w-5 h-5 text-[#15941f]" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#15941f] transition-colors duration-200" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedItems.includes(index)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="bg-[#15941f]/5 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
