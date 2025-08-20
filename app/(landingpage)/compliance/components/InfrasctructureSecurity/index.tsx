'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Shield, RefreshCw, Key, CheckCircle } from 'lucide-react';

export default function InfrastructureSecurity() {
  const [infraRef, infraInView] = useInView(0.1);

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Encrypted storage and transit (SSL/TLS)',
      desc: 'End-to-end encryption for all data',
    },
    {
      icon: Server,
      title: 'Frequent vulnerability scanning and penetration testing',
      desc: 'Regular security assessments and testing',
    },
    {
      icon: RefreshCw,
      title: 'Regular backups and version control',
      desc: 'Automated backup systems and data recovery',
    },
    {
      icon: Key,
      title: 'Strict API authentication and rate limiting',
      desc: 'Secure API access with comprehensive controls',
    },
  ];

  return (
    <section
      ref={infraRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative">
        <div
          className={`text-center mb-16 ${fadeInUp} ${infraInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <Server className="w-4 h-4" />
            Infrastructure Security
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Hosted on secure cloud infrastructure
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Medilogic is hosted on secure cloud infrastructure with
            enterprise-grade security measures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 group hover:-translate-y-2 hover:scale-105 ${fadeInUp} ${
                infraInView
                  ? 'opacity-100 translate-y-0 rotate-0'
                  : 'opacity-0 translate-y-12 rotate-3'
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 backdrop-blur-sm">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <h3 className="text-lg font-bold group-hover:text-green-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-white/80 leading-relaxed">
                      {feature.desc}
                    </p>
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
