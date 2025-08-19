'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Shield, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function UseOfService() {
  const requirements = [
    {
      icon: Shield,
      title: 'Applicable Laws and Regulations',
      description: 'Comply with all local, national, and international laws',
    },
    {
      icon: FileCheck,
      title: 'These Terms',
      description:
        'Follow all guidelines and restrictions outlined in this document',
    },
    {
      icon: CheckCircle,
      title: 'Organizational Policies',
      description: 'Adhere to relevant organizational policies (if applicable)',
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
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              1. Use of Service
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Medilogic provides cloud-based software for managing healthcare
              logistics, including clinical waste transport, courier services,
              and compliance workflows. You agree to use the Service only in
              accordance with:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {requirements.map((requirement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-[#15941f]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <requirement.icon className="h-8 w-8 text-[#15941f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {requirement.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {requirement.description}
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
