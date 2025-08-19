'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle } from 'lucide-react';

export default function SuperAdmin() {
  const [adminRef, adminInView] = useInView(0.1);

  const features = [
    'Create and deactivate organizations (e.g. clinics, waste companies)',
    'Generate secure, single-use invite codes for onboarding',
    'View full audit logs of all activity across the platform',
    'Monitor usage across organizations in real-time',
    'Manage global settings, roles, and permissions',
    'Enforce compliance rules platform-wide',
  ];

  return (
    <section ref={adminRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${adminInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Shield className="w-4 h-4" />
            Super Admin Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Full control over the entire ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Super Admins manage the platform at the highest level, with tools
            built for scalability, oversight, and security.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${adminInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Platform-Wide Control
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Comprehensive oversight and management capabilities for
                  enterprise-level healthcare logistics operations.
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            className={`space-y-4 ${fadeInUp} ${adminInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  adminInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-blue-200 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
