'use client';

import { useInView } from '../../../hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, FileText, Shield, TrendingUp } from 'lucide-react';

export default function WhyMedilogicSection() {
  const [whyRef, whyInView] = useInView(0.1);
  const fadeInUp = 'transition-all duration-700 ease-out';

  return (
    <section ref={whyRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${whyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Brain className="w-4 h-4" />
            Why Medilogic Exists
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Modern healthcare logistics demand more than spreadsheets
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            With strict compliance requirements (GDPR, ISO 27001, NHS DSP
            Toolkit) and the growing complexity of clinical waste handling, we
            saw a gap. So, we built Medilogic — a platform designed specifically
            for healthcare logistics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${whyInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <Card className="bg-gradient-to-br from-[#15941f]/5 to-green-50 border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#15941f] to-green-400 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To bring clarity, automation, and compliance to the critical
                  workflows behind healthcare transport.
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            className={`space-y-6 ${fadeInUp} ${whyInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-[#15941f]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#15941f]/20 transition-all duration-300">
                <FileText className="w-6 h-6 text-[#15941f]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Beyond Generic Tools
                </h4>
                <p className="text-gray-600">
                  Healthcare logistics require specialized solutions, not
                  one-size-fits-all delivery platforms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-[#15941f]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#15941f]/20 transition-all duration-300">
                <Shield className="w-6 h-6 text-[#15941f]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Compliance-First Approach
                </h4>
                <p className="text-gray-600">
                  Built from the ground up with GDPR, ISO 27001, and NHS
                  requirements at the core.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-[#15941f]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#15941f]/20 transition-all duration-300">
                <Brain className="w-6 h-6 text-[#15941f]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  AI-Powered Intelligence
                </h4>
                <p className="text-gray-600">
                  Smart automation that learns from your operations to optimize
                  routes and reduce costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
