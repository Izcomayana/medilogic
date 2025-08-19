'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Brain, FileText, Zap, Users } from 'lucide-react';

export default function ValueProposition() {
  const [valueRef, valueInView] = useInView(0.1);

  const valuePoints = [
    {
      icon: Shield,
      title: 'NHS-aligned & GDPR-compliant',
      desc: 'Built from the ground up for healthcare compliance',
    },
    {
      icon: Brain,
      title: 'AI-driven savings and smart scheduling',
      desc: 'Intelligent optimization reduces costs and improves efficiency',
    },
    {
      icon: FileText,
      title: 'Automated reporting and full audit trails',
      desc: 'Complete transparency and compliance documentation',
    },
    {
      icon: Zap,
      title: 'Fast onboarding and dedicated support',
      desc: 'Get up and running quickly with expert guidance',
    },
    {
      icon: Users,
      title: 'Designed specifically for healthcare logistics',
      desc: 'Purpose-built for medical waste, deliveries, and compliance',
    },
  ];

  return (
    <section
      ref={valueRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${valueInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <CheckCircle className="w-4 h-4" />
            Why Choose Medilogic
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            🧠 Why Medilogic is Worth It
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            More than just software — a complete transformation of your
            healthcare logistics operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuePoints.slice(0, 3).map((point, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                valueInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#15941f] to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <point.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-[#15941f] flex-shrink-0" />
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#15941f] transition-colors duration-300">
                    {point.title}
                  </h3>
                </div>
                <p className="text-gray-600">{point.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {valuePoints.slice(3).map((point, index) => (
            <Card
              key={index + 3}
              className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                valueInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={staggerDelay(index + 3)}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#15941f] to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <point.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-[#15941f] flex-shrink-0" />
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#15941f] transition-colors duration-300">
                    {point.title}
                  </h3>
                </div>
                <p className="text-gray-600">{point.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
