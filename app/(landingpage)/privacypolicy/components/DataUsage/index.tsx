"use client";

import { motion } from "framer-motion";
import {
  Target,
  UserCheck,
  Truck,
  BarChart3,
  MessageSquare,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DataUsage() {
  const usageTypes = [
    {
      icon: UserCheck,
      title: "Account Management",
      description: "Create and manage user accounts",
    },
    {
      icon: Truck,
      title: "Logistics Operations",
      description: "Assign and track trips and logistics tasks",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Generate analytics and reports",
    },
    {
      icon: MessageSquare,
      title: "Communication",
      description:
        "Communicate with you regarding your account or support requests",
    },
    {
      icon: Shield,
      title: "Platform Improvement",
      description: "Improve platform functionality and security",
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
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              3. How We Use Your Information
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              We use your data to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {usageTypes.map((usage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#15941f]/10 rounded-full p-3 flex-shrink-0">
                        <usage.icon className="h-6 w-6 text-[#15941f]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {usage.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {usage.description}
                        </p>
                      </div>
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
