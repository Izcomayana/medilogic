'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Handshake, LifeBuoy } from 'lucide-react';
import Image from 'next/image';

export default function ContactInfo() {
  const [infoRef, infoInView] = useInView(0.1);

  const contactDetails = [
    {
      icon: Mail,
      title: 'General Inquiries',
      email: 'hello@medilogic.uk',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Handshake,
      title: 'Partnership Opportunities',
      email: 'partnerships@medilogic.uk',
      color: 'from-[#15941f] to-green-500',
    },
    {
      icon: LifeBuoy,
      title: 'Support Team',
      email: 'support@medilogic.uk',
      phone: '+44 20 1234 5678 (Weekdays 9AM–5PM)',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section
      ref={infoRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Phone className="w-4 h-4" />
            Contact Information
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Reach out directly to the right team
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {contactDetails.map((item, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-2 ${fadeInUp} ${
                infoInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#15941f] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  <a href={`mailto:${item.email}`} className="hover:underline">
                    {item.email}
                  </a>
                </p>
                {item.phone && <p className="text-gray-600">{item.phone}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`mt-16 text-center ${fadeInUp} ${infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ transitionDelay: '450ms' }}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <MapPin className="w-4 h-4" />
            Our Office
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Medilogic HQ
          </h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            123 HealthTech Park, London, United Kingdom
          </p>
          <div className="mt-8 w-full max-w-2xl mx-auto aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg">
            {/* Placeholder for Google Maps embed */}
            <Image
              width={200}
              height={200}
              src="/placeholder.svg?height=400&width=600"
              alt="Office Location Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
