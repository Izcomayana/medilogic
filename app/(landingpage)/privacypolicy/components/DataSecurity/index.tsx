"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Users, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DataSecurity() {
  const securityMeasures = [
    {
      icon: Lock,
      title: "SSL Encryption",
      description: "SSL encryption for all platform communications",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Role-based access to organizational data",
    },
    {
      icon: Shield,
      title: "Field-Level Encryption",
      description: "Optional field-level encryption for sensitive fields",
    },
    {
      icon: Database,
      title: "Regular Backups",
      description: "Regular backups and infrastructure monitoring",
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
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              4. Data Security
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              We implement strong security measures, including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {securityMeasures.map((measure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-[#15941f]">
                  <CardContent className="p-6 text-center">
                    <div className="bg-[#15941f]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <measure.icon className="h-8 w-8 text-[#15941f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {measure.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {measure.description}
                    </p>
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
