'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Building2, Users, UserCheck, ArrowRight } from 'lucide-react';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { fadeInUp } from '@/app/(landingpage)/hooks/annimation';

const DRIVER_RATE = 150;
const CLIENT_RATE = 50;

export default function SubscriptionPlans() {
  const [plansRef, plansInView] = useInView(0.1);
  const [drivers, setDrivers] = useState(7);
  const [clients, setClients] = useState(12);

  const driverCost = drivers * DRIVER_RATE;
  const clientCost = clients * CLIENT_RATE;
  const total = driverCost + clientCost;

  const fmt = (n: number) =>
    '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 0 });

  return (
    <section
      ref={plansRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Heading */}
        <div
          className={`text-center mb-16 ${fadeInUp} ${
            plansInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Building2 className="w-4 h-4" />
            Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Usage-Based Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pay only for the drivers and clients in your organisation — no
            hidden tiers, no surprises.
          </p>
        </div>

        {/* Formula pills */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 ${fadeInUp} ${
            plansInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="flex items-center gap-3 bg-white rounded-2xl shadow-md px-6 py-4 border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Per driver</p>
              <p className="text-2xl font-bold text-gray-900">
                £{DRIVER_RATE}
                <span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
            </div>
          </div>

          <div className="flex items-center self-center text-2xl font-light text-gray-400 px-2">
            +
          </div>

          <div className="flex items-center gap-3 bg-white rounded-2xl shadow-md px-6 py-4 border border-gray-100">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Per client</p>
              <p className="text-2xl font-bold text-gray-900">
                £{CLIENT_RATE}
                <span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div
          className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-10 ${fadeInUp} ${
            plansInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Estimate your monthly cost
          </h3>

          {/* Sliders */}
          <div className="space-y-8 mb-10">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Drivers
                </label>
                <span className="text-lg font-bold text-gray-900 min-w-[3rem] text-right">
                  {drivers}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={drivers}
                onChange={(e) => setDrivers(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>200</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-500" />
                  Clients
                </label>
                <span className="text-lg font-bold text-gray-900 min-w-[3rem] text-right">
                  {clients}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={1}
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
                className="w-full h-2 bg-purple-100 rounded-full appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>500</span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-xs text-blue-600 font-medium mb-1">
                {drivers} drivers × £{DRIVER_RATE}
              </p>
              <p className="text-2xl font-bold text-blue-700">
                {fmt(driverCost)}
              </p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-5">
              <p className="text-xs text-purple-600 font-medium mb-1">
                {clients} clients × £{CLIENT_RATE}
              </p>
              <p className="text-2xl font-bold text-purple-700">
                {fmt(clientCost)}
              </p>
            </div>
          </div>

          {/* Total + CTA */}
          <div className="bg-gradient-to-r from-[#15941f]/10 to-green-50 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border border-[#15941f]/20">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly total</p>
              <p className="text-4xl font-bold text-gray-900">{fmt(total)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Billed monthly · cancel any time
              </p>
            </div>
            <Button
              // onClick={handleGetStarted}
              className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-3 rounded-xl text-base font-semibold whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contact */}
        <div
          className={`text-center ${fadeInUp} ${
            plansInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Need a custom arrangement or volume discount?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our team for flexible pricing options.
            </p>
            <Button
              variant="outline"
              className="border-[#15941f] text-[#15941f] hover:bg-[#15941f] hover:text-white transition-all duration-300 bg-transparent"
            >
              Contact Sales Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
