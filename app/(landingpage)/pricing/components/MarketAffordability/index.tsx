'use client';

import { fadeInUp } from '@/app/(landingpage)/hooks/annimation';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, MapPin, TrendingUp, DollarSign } from 'lucide-react';

export default function MarketAffordability() {
  const [marketRef, marketInView] = useInView(0.1);

  return (
    <section ref={marketRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${marketInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Globe className="w-4 h-4" />
            Market Affordability
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            🌍 Designed for Global Healthcare Markets
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card
            className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
              marketInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <CardContent className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                🇬🇧 For the UK Market
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Clinics typically spend £1,000s/year on logistics and
                    penalties due to non-compliance
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Medilogic reduces cost through optimization, automation, and
                    fewer errors
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    NHS trusts and logistics firms can easily justify upper-tier
                    pricing with ROI from Day 1
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
              marketInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <CardContent className="p-8 bg-gradient-to-br from-[#15941f]/5 to-green-50">
              <div className="w-16 h-16 bg-gradient-to-br from-[#15941f] to-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#15941f] transition-colors duration-300">
                🌍 For African Markets
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-[#15941f] flex-shrink-0 mt-0.5" />
                  <span>
                    Local currency pricing (e.g., ₦‎ pricing in Nigeria)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#15941f] flex-shrink-0 mt-0.5" />
                  <span>
                    Flexible payment models: quarterly, annual, or pay-as-you-go
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#15941f] flex-shrink-0 mt-0.5" />
                  <span>
                    Subsidized options for regulatory bodies via NGOs or public
                    health grants
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
