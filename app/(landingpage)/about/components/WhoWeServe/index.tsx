'use client';

import { useInView } from '../../../hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Stethoscope, Recycle, Truck, Users } from 'lucide-react';

export default function WhoWeServeSection() {
  const [serveRef, serveInView] = useInView(0.1);
  const fadeInUp = 'transition-all duration-700 ease-out';
  const staggerDelay = (index: number) => ({
    transitionDelay: `${index * 150}ms`,
  });

  const audiences = [
    {
      icon: Building2,
      title: 'NHS Clinics & Hospitals',
      desc: 'Comprehensive logistics management for public healthcare institutions',
    },
    {
      icon: Stethoscope,
      title: 'Private Healthcare Providers',
      desc: 'Streamlined operations for private practices and medical facilities',
    },
    {
      icon: Recycle,
      title: 'Medical Waste Disposal Companies',
      desc: 'Compliant waste management and tracking solutions',
    },
    {
      icon: Truck,
      title: 'Courier & Transport Firms',
      desc: 'Specialized tools for healthcare logistics providers',
    },
    {
      icon: Users,
      title: 'Super Admins Managing Multi-Org Networks',
      desc: 'Enterprise-level control for complex organizational structures',
    },
  ];

  return (
    <section ref={serveRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${serveInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Users className="w-4 h-4" />
            Who We Serve
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            From solo practices to nationwide providers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you&apos;re a solo practice or a nationwide logistics
            provider, Medilogic adapts to your scale and needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.slice(0, 3).map((item, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                serveInView
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
          {audiences.slice(3).map((item, index) => (
            <Card
              key={index + 3}
              className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                serveInView
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
