"use client";

import { motion } from "framer-motion";
import { Scale, MapPin, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function GoverningLaw() {
  const jurisdictions = [
    {
      icon: MapPin,
      title: "United Kingdom",
      description:
        "UK law applies if you are accessing the service from the United Kingdom",
      flag: "🇬🇧",
    },
    {
      icon: MapPin,
      title: "Nigeria",
      description:
        "Nigerian law applies if you are accessing the service from Nigeria",
      flag: "🇳🇬",
    },
    {
      icon: Globe,
      title: "Other Regions",
      description:
        "For users outside these regions, the applicable jurisdiction will depend on your location",
      flag: "🌍",
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
              <Scale className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              9. Governing Law
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              These Terms are governed by the following jurisdictions based on
              your location:
            </p>
          </div>

          <div className="space-y-6">
            {jurisdictions.map((jurisdiction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl flex-shrink-0">
                        {jurisdiction.flag}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <jurisdiction.icon className="h-5 w-5 text-[#15941f]" />
                          <h3 className="text-xl font-semibold text-gray-900">
                            {jurisdiction.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {jurisdiction.description}
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
