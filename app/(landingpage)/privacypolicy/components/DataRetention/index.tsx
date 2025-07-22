"use client";

import { motion } from "framer-motion";
import { Database, Clock, Download, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DataRetention() {
  const retentionPolicies = [
    {
      icon: Database,
      title: "Active Organizations",
      description: "We retain user data as long as your organization is active",
    },
    {
      icon: Clock,
      title: "Data Purging",
      description:
        "After termination or deletion requests, data is securely purged within 30 days",
    },
    {
      icon: Download,
      title: "Data Export",
      description: "You can download your data anytime via the platform",
    },
  ];

  return (
    <section className="py-16 bg-white">
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
              <Database className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              8. Data Retention
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {retentionPolicies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="bg-[#15941f]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <policy.icon className="h-8 w-8 text-[#15941f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {policy.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {policy.description}
                    </p>
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
              <Trash2 className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Legal and Audit Requirements
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Data may be retained longer than 30 days if required for legal
                  or audit purposes, in compliance with applicable regulations.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
