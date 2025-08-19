'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Plus, Minus } from 'lucide-react';

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
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
}

export default function GettingStarted() {
  const [startedRef, startedInView] = useInView(0.1);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const fadeInUp = 'transition-all duration-700 ease-out';
  const staggerDelay = (index: number) => ({
    transitionDelay: `${index * 100}ms`,
  });

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      question: 'How do I sign up for Medilogic?',
      answer:
        "Organizations must be invited by a Super Admin. Once you receive your unique invite code, you can sign up using your organization's secure link.",
    },
    {
      question: 'Can I invite my team members?',
      answer:
        'Yes. Once your organization is onboarded, your admin can generate user-specific invite links for staff members (drivers, managers, support).',
    },
    {
      question: 'What roles are available?',
      answer:
        'Super Admin – Oversees the entire platform\nAdmin – Manages an organization (clinic or waste firm)\nDriver – Handles pickups and deliveries\nClient/User – Tracks trips and interacts with logistics teams',
    },
  ];

  return (
    <section ref={startedRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${startedInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Rocket className="w-4 h-4" />
            Getting Started
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            New to Medilogic? Start here.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`group hover:shadow-lg transition-all duration-500 border border-gray-200 hover:border-blue-300 ${fadeInUp} ${
                startedInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedItems.includes(index) ? (
                      <Minus className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedItems.includes(index)
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
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
