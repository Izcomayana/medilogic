'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Users, UserCheck, Database, Eye } from 'lucide-react';

export default function DataProtection() {
  const [dataRef, dataInView] = useInView(0.1);

  const protectionFeatures = [
    {
      icon: Lock,
      title: 'Field-Level Encryption (Optional)',
      desc: 'Protect sensitive data down to the form field level',
    },
    {
      icon: Users,
      title: 'Role-Based Access Control',
      desc: 'Only the right people see the right data',
    },
    {
      icon: UserCheck,
      title: 'Secure Invite-Only Onboarding',
      desc: 'No public registration loopholes',
    },
    {
      icon: Database,
      title: 'Data Minimization',
      desc: "We store only what's needed, for only as long as needed",
    },
  ];

  return (
    <section
      ref={dataRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${dataInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Eye className="w-4 h-4" />
            Data Protection by Design
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            We don&apos;t just meet compliance — we embed it into every
            interaction
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {protectionFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                dataInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : `opacity-0 ${index % 2 === 0 ? '-translate-x-12' : 'translate-x-12'} scale-95`
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#15941f]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#15941f]/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-[#15941f]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#15941f] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
