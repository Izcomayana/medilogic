'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, CheckCircle } from 'lucide-react';

export default function ClinicAdminSection() {
  const [clinicRef, clinicInView] = useInView(0.1);

  const features = [
    'Invite staff via unique organization-based invite codes',
    'View and manage logistics trips (waste pickups, deliveries)',
    'Assign and reassign trips to available drivers',
    'Track trip status, cost, and time in real time',
    'Generate invoices for completed services',
    'Export compliance and audit-ready reports (CSV, PDF)',
    'View organization-specific analytics and performance metrics',
  ];

  return (
    <section
      ref={clinicRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${clinicInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Building2 className="w-4 h-4" />
            Clinic & Waste Company Admin Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Keep your organization running smoothly
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Admins are in charge of day-to-day operations within their
            organization with comprehensive management tools.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`space-y-4 ${fadeInUp} ${clinicInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  clinicInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-6 h-6 bg-[#15941f]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#15941f]/20 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-[#15941f]" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div
            className={`${fadeInUp} ${clinicInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <Card className="bg-gradient-to-br from-[#15941f]/5 to-green-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#15941f] to-green-400 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Operational Excellence
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Complete control over your organization&apos;s logistics
                  operations with real-time tracking, reporting, and analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
