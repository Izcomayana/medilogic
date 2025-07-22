"use client";

import { motion } from "framer-motion";
import { Users, Shield, AlertTriangle, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function UserResponsibilities() {
  const responsibilities = [
    {
      icon: Shield,
      title: "Ethical Use",
      description: "Use the platform ethically, responsibly, and in good faith",
    },
    {
      icon: Eye,
      title: "Protect Credentials",
      description:
        "Protect your login credentials and never share them with unauthorized persons",
    },
    {
      icon: AlertTriangle,
      title: "Report Issues",
      description:
        "Notify Medilogic immediately of any unauthorized account access or suspicious activity",
    },
    {
      icon: Users,
      title: "Respect Others",
      description:
        "Ensure your activities do not disrupt or damage the platform or other users",
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
              <Users className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              3. User Responsibilities
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              As a user of Medilogic, you agree to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {responsibilities.map((responsibility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#15941f] rounded-full p-3 flex-shrink-0">
                        <responsibility.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {responsibility.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {responsibility.description}
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
