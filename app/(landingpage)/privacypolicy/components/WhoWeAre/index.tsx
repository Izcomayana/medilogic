"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WhoWeAre() {
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
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              1. Who We Are
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Medilogic is a Software-as-a-Service (SaaS) platform designed to
              manage healthcare logistics. We operate primarily in the UK and
              Nigeria and serve clinics, hospitals, regulators, and logistics
              providers.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-[#15941f]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Building2 className="h-5 w-5 text-[#15941f] mr-2" />
                  Data Controller
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Building2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Medilogic Ltd
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">123 HealthTech Park</p>
                      <p className="text-gray-700">London, United Kingdom</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <a
                        href="mailto:support@medilogicapp.com"
                        className="text-[#15941f] hover:text-[#117a1a] font-medium transition-colors"
                      >
                        support@medilogicapp.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
