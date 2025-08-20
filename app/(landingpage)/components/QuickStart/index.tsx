import React from 'react';
import { fadeInUp, staggerDelay } from '../../hooks/annimation';
import { useInView } from '../../hooks/useInView';
import { Database, Shield, UserCheck, Zap } from 'lucide-react';

export const QuickStart = () => {
  const [quickStartRef, quickStartInView] = useInView(0.1);

  return (
    <section ref={quickStartRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${quickStartInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Zap className="w-4 h-4 animate-pulse" />
            Start Fast, Stay in Control
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Quick organization onboarding with secure invite codes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: UserCheck,
              title: 'Role-based access',
              desc: 'with data isolation',
            },
            {
              icon: Database,
              title: 'Scalable infrastructure',
              desc: 'for NHS-level operations',
            },
            {
              icon: Shield,
              title: 'Secure invite codes',
              desc: 'for quick onboarding',
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`text-center group hover:-translate-y-2 transition-all duration-500 ${fadeInUp} ${
                quickStartInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-90'
              }`}
              style={staggerDelay(index)}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#15941f] to-green-400 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#15941f] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
