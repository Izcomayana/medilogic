'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import {
  Recycle,
  CheckCircle,
  Truck,
  BarChart3,
  Users,
  FileText,
  TrendingUp,
} from 'lucide-react';

export default function WasteDisposal() {
  const [wasteRef, wasteInView] = useInView(0.1);

  const features = [
    {
      icon: Truck,
      text: 'Assign and manage trips for multiple clinics or hospitals',
    },
    {
      icon: CheckCircle,
      text: 'Enable drivers to update collection status from the field',
    },
    {
      icon: BarChart3,
      text: 'Track cost per route and per client with built-in analytics',
    },
    {
      icon: Users,
      text: 'Offer clients a branded, seamless experience via the Medilogic interface',
    },
    {
      icon: FileText,
      text: 'Export reports and maintain compliance with regulatory partners',
    },
  ];

  return (
    <section ref={wasteRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${wasteInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Recycle className="w-4 h-4" />
            For Medical Waste Disposal Companies
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Smarter scheduling. Faster collections. Better oversight.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Medilogic gives you the tools to operate more efficiently and serve
            more clients with complete visibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${wasteInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Scale Operations Without Losing Control
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Manage multiple clients and routes while maintaining complete
                  visibility and compliance.
                </p>
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-gray-900">
                      Advanced Analytics
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Track performance metrics and optimize routes automatically
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div
            className={`space-y-4 ${fadeInUp} ${wasteInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  wasteInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-3">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
