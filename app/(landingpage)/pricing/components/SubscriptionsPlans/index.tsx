'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Stethoscope,
  Building,
  Shield,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { fadeInUp, staggerDelay } from '@/app/(landingpage)/hooks/annimation';

export default function SubscriptionPlans() {
  const [plansRef, plansInView] = useInView(0.1);

  const plans = [
    {
      icon: Stethoscope,
      segment: 'Small Clinics',
      plan: 'Starter',
      price: '£59',
      features: [
        'Digital trip logs',
        'Basic compliance reports',
        'Email support',
        'Up to 5 users',
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-indigo-50',
      popular: false,
    },
    {
      icon: Building2,
      segment: 'Mid-tier Firms',
      plan: 'Pro',
      price: '£179',
      features: [
        'AI route optimization',
        'Automated reporting',
        'Multi-user access',
        'Priority support',
        'Advanced analytics',
      ],
      color: 'from-[#15941f] to-green-500',
      bgColor: 'from-[#15941f]/5 to-green-50',
      popular: true,
    },
    {
      icon: Building,
      segment: 'Enterprise Orgs',
      plan: 'Enterprise',
      price: '£449',
      features: [
        'Full automation',
        'Advanced AI analytics',
        'Real-time monitoring',
        'Priority support',
        'Custom integrations',
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      popular: false,
    },
    {
      icon: Shield,
      segment: 'Regulators',
      plan: 'Regulator',
      price: '£299',
      features: [
        'Compliance dashboards',
        'Audit trails',
        'Real-time alerts',
        'Oversight tools',
        'Regulatory reporting',
      ],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      popular: false,
    },
  ];

  return (
    <section
      ref={plansRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className={`text-center mb-16 ${fadeInUp} ${plansInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <Building2 className="w-4 h-4" />
            Subscription Plans
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            📦 Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scalable pricing designed for every type of healthcare organization
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-2 relative ${
                plan.popular ? 'ring-2 ring-[#15941f] ring-opacity-50' : ''
              } ${fadeInUp} ${
                plansInView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={staggerDelay(index)}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-[#15941f] text-white px-4 py-1 text-xs font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardContent
                className={`p-8 bg-gradient-to-br ${plan.bgColor} relative h-full flex flex-col`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-600 mb-2">{plan.segment}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#15941f] transition-colors duration-300">
                  {plan.plan}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#15941f] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-[#15941f] hover:bg-[#15941f]/90 text-white'
                      : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                  } transition-all duration-300 group-hover:scale-105`}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`text-center ${fadeInUp} ${plansInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              💡 Need a custom plan or volume discount?
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
