"use client";

import { motion } from "framer-motion";
import { CreditCard, RefreshCw, Globe, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSubscription() {
  const paymentTerms = [
    {
      icon: CreditCard,
      title: "Paid Features",
      description: "Certain features require a paid subscription",
    },
    {
      icon: RefreshCw,
      title: "Recurring Billing",
      description:
        "By subscribing, you authorize Medilogic to charge your selected payment method on a recurring basis",
    },
    {
      icon: Globe,
      title: "Regional Pricing",
      description:
        "Pricing may differ based on geographic region (e.g., UK vs. Nigeria) or user segment (e.g., clinics, regulators)",
    },
    {
      icon: Gift,
      title: "Free Trials",
      description:
        "Free trials are offered for 30 days where applicable, with no billing during the trial period",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto"
        >
          <div className="flex items-center mb-8">
            <div className="bg-[#15941f] rounded-full p-3 mr-4">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              5. Payment & Subscriptions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {paymentTerms.map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="bg-[#15941f]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <term.icon className="h-8 w-8 text-[#15941f]" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {term.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {term.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
