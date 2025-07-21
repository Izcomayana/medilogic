"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Plus, Minus } from "lucide-react";
import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";

export default function ComplianceSecuritySection() {
  const [complianceRef, complianceInView] = useInView(0.1);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqs = [
    {
      question: "Is Medilogic GDPR compliant?",
      answer:
        "Yes. We follow strict GDPR guidelines including user consent, data minimization, data export, and deletion features.",
    },
    {
      question: "Can I download my data?",
      answer:
        "Yes. Every user has the ability to download their personal or organization-specific data in PDF or CSV format.",
    },
    {
      question: "What audit trails are available?",
      answer:
        "Admins and Super Admins have full access to platform activity logs, which track all critical actions with timestamps.",
    },
    {
      question: "Is data encrypted?",
      answer:
        "Yes. All data is encrypted in transit (TLS/SSL) and optionally at the field level for sensitive records.",
    },
  ];

  return (
    <section
      ref={complianceRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-4xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${complianceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Shield className="w-4 h-4" />
            Compliance & Data Security
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Security and compliance questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`group hover:shadow-lg transition-all duration-500 border border-gray-200 hover:border-green-300 ${fadeInUp} ${
                complianceInView
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
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedItems.includes(index) ? (
                      <Minus className="w-5 h-5 text-green-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
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
                    <div className="bg-green-50 rounded-lg p-4">
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
