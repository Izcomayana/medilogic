'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText, Trash2, CheckCircle } from 'lucide-react';

export default function DataExport() {
  const [exportRef, exportInView] = useInView(0.1);

  const exportFeatures = [
    {
      icon: Download,
      title: 'One-click exports for users and admins',
      desc: 'Quick and easy data export functionality',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileText,
      title: 'Downloadable CSV or PDF reports for compliance use',
      desc: 'Multiple formats to meet your reporting needs',
      color: 'from-[#15941f] to-green-500',
    },
    {
      icon: Trash2,
      title: 'Support for data deletion requests (GDPR-compliant)',
      desc: 'Full compliance with right to erasure requirements',
      color: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <section
      ref={exportRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${exportInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Download className="w-4 h-4" />
            Secure Data Export & Portability
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            We believe in data ownership
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in data ownership — that&apos;s why we offer
            comprehensive data export and portability features.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {exportFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                exportInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-[#15941f] flex-shrink-0" />
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#15941f] transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
