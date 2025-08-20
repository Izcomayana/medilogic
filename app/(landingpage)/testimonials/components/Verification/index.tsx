'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, Users, Star } from 'lucide-react';

export default function VerificationSection() {
  const [verificationRef, verificationInView] = useInView(0.1);

  const verificationPoints = [
    {
      icon: CheckCircle,
      title: 'Verified Users Only',
      desc: 'All testimonials come from active Medilogic users',
    },
    {
      icon: Users,
      title: 'Real Names & Companies',
      desc: 'No anonymous reviews or fake testimonials',
    },
    {
      icon: Star,
      title: 'Honest Feedback',
      desc: 'Unfiltered experiences from real healthcare teams',
    },
  ];

  return (
    <section
      ref={verificationRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative">
        <div
          className={`text-center mb-16 ${fadeInUp} ${verificationInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <Shield className="w-4 h-4" />
            Real Feedback, Real Impact
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Authentic testimonials you can trust
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            All testimonials are verified and sourced from active users. We
            never publish fake reviews or anonymous blurbs — just honest
            feedback from those who rely on Medilogic every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {verificationPoints.map((item, index) => (
            <Card
              key={index}
              className={`bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 group hover:-translate-y-2 hover:scale-105 ${fadeInUp} ${
                verificationInView
                  ? 'opacity-100 translate-y-0 rotate-0'
                  : 'opacity-0 translate-y-12 rotate-3'
              }`}
              style={staggerDelay(index)}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 backdrop-blur-sm">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`text-center mt-16 ${fadeInUp} ${verificationInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '450ms' }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-white ml-2">4.9/5</span>
            </div>
            <p className="text-white/90 text-lg">
              Average rating from 200+ verified healthcare organizations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
