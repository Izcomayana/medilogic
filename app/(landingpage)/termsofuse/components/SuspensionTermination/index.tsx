"use client";

import { motion } from "framer-motion";
import { AlertTriangle, XCircle, CreditCard, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SuspensionTermination() {
  const terminationReasons = [
    {
      icon: XCircle,
      title: "Terms Violation",
      description: "You violate these Terms or any applicable law",
    },
    {
      icon: AlertTriangle,
      title: "Platform Misuse",
      description: "You misuse the platform or disrupt service for others",
    },
    {
      icon: CreditCard,
      title: "Payment Issues",
      description: "You fail to pay required subscription fees after notice",
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
            <div className="bg-red-600 rounded-full p-3 mr-4">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              7. Suspension & Termination
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Medilogic may suspend or terminate your account without notice if:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {terminationReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-red-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
                        <reason.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-amber-50 border border-amber-200 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <Database className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Data Access After Termination
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Upon termination, access to your organization&apos;s data may
                  be restricted or deleted, in accordance with our retention
                  policies. We recommend exporting important data before
                  termination.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
