'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CheckCircle } from 'lucide-react';

export default function Client() {
  const [clientRef, clientInView] = useInView(0.1);

  const features = [
    'View upcoming and historical collection requests',
    'Track the status of ongoing trips',
    'Communicate with logistics teams or admins',
    'Request support or flag a logistics issue',
    'Download personal or trip-related data for records',
  ];

  return (
    <section
      ref={clientRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${clientInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Users className="w-4 h-4" />
            Client / Regular User Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Clear visibility for healthcare staff and internal clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clinics and hospital personnel can easily track and manage their
            logistics needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`space-y-4 ${fadeInUp} ${clientInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group hover:translate-x-2 transition-all duration-300 ${fadeInUp} ${
                  clientInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={staggerDelay(index)}
              >
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-purple-200 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div
            className={`${fadeInUp} ${clientInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  User-Friendly Interface
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Intuitive design that makes it easy for healthcare staff to
                  track collections and communicate with logistics teams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
