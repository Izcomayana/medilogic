'use client';

import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import {
  Puzzle,
  CheckCircle,
  Lock,
  Users,
  TrendingUp,
  Settings,
} from 'lucide-react';

export default function UnifiedPlatformSection() {
  const [unifiedRef, unifiedInView] = useInView(0.1);

  const platformFeatures = [
    {
      icon: Lock,
      title: 'Centralized Access',
      desc: 'Single secure platform for all your logistics operations',
    },
    {
      icon: Users,
      title: 'Role-Based Permissions',
      desc: "Granular access control tailored to each user's responsibilities",
    },
    {
      icon: TrendingUp,
      title: 'Scalable Infrastructure',
      desc: 'Grows with your organization from startup to enterprise',
    },
    {
      icon: Settings,
      title: 'Customizable Trip Data',
      desc: 'Flexible data fields to match your specific workflow needs',
    },
  ];

  return (
    <section
      ref={unifiedRef}
      className="py-20 px-4 bg-gradient-to-br from-[#15941f] to-green-600 text-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative">
        <div
          className={`text-center mb-16 ${fadeInUp} ${unifiedInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <Puzzle className="w-4 h-4" />
            One Platform, Multiple Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Medilogic adapts to the unique demands of each organization
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            But keeps everything on a single, secure platform for seamless
            operations and unified oversight.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {platformFeatures.map((item, index) => (
            <Card
              key={index}
              className={`bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 group hover:-translate-y-2 hover:scale-105 ${fadeInUp} ${
                unifiedInView
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
          className={`text-center mt-16 ${fadeInUp} ${unifiedInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-white font-medium">
                  Centralized Access
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-white font-medium">
                  Role-Based Permissions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-white font-medium">
                  Scalable Infrastructure
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-white font-medium">
                  Customizable Trip Data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
