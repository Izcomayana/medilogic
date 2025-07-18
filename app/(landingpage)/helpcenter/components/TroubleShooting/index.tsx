"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Plus, Minus } from "lucide-react";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";

export default function Troubleshooting() {
  const [troubleRef, troubleInView] = useInView(0.1);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqs = [
    {
      question: "I didn't receive my invite code. What do I do?",
      answer:
        "Check your spam folder. If it's not there, contact your organization admin to resend it.",
    },
    {
      question: "I can't log in — what should I check?",
      answer:
        "Ensure your invite code hasn't expired and you're using the correct email. Try resetting your password or contact support.",
    },
    {
      question: "My dashboard is not loading properly.",
      answer:
        "Try clearing your browser cache or using an updated browser. If the issue persists, reach out to support@medilogic.uk.",
    },
  ];

  return (
    <section ref={troubleRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${troubleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Wrench className="w-4 h-4" />
            Troubleshooting
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Common issues and solutions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`group hover:shadow-lg transition-all duration-500 border border-gray-200 hover:border-orange-300 ${fadeInUp} ${
                troubleInView
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
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedItems.includes(index) ? (
                      <Minus className="w-5 h-5 text-orange-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors duration-200" />
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
                    <div className="bg-orange-50 rounded-lg p-4">
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
