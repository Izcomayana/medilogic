'use client';

import { fadeInUp, staggerDelay } from '../../../hooks/annimation';
import { useInView } from '../../../hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, Lock, Download, Eye } from 'lucide-react';

export default function ComplianceSection() {
  const [complianceRef, complianceInView] = useInView(0.1);

  const complianceFeatures = [
    {
      icon: CheckCircle,
      title: 'GDPR-Compliant User Workflows',
      desc: 'Every user interaction follows GDPR principles from signup to data deletion',
    },
    {
      icon: Lock,
      title: 'ISO 27001-Aligned Security Protocols',
      desc: 'Enterprise-grade security architecture meeting international standards',
    },
    {
      icon: Shield,
      title: 'NHS DSP Toolkit Compatibility',
      desc: 'Ready for NHS Digital Service Provider Toolkit requirements',
    },
    {
      icon: Download,
      title: 'Data Portability & Export',
      desc: 'Full data export capabilities ensuring you always own your information',
    },
    {
      icon: Eye,
      title: 'Full Audit Trails for Every Action',
      desc: 'Complete transparency with detailed logs of all system activities',
    },
  ];

  return (
    <section
      ref={complianceRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${complianceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Shield className="w-4 h-4" />
            Compliance by Design
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Built with compliance at the foundation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature, every workflow, every data point is designed with
            regulatory compliance and security as the top priority.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {complianceFeatures.slice(0, 3).map((item, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                complianceInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
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

        <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {complianceFeatures.slice(3).map((item, index) => (
            <Card
              key={index + 3}
              className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                complianceInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={staggerDelay(index + 3)}
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
      </div>
    </section>
  );
}
