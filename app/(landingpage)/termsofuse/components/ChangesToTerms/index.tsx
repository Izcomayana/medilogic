'use client';

import { motion } from 'framer-motion';
import { Edit, Scale, Shield, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ChangesToTerms() {
  const changeReasons = [
    {
      icon: Scale,
      title: 'Legal Changes',
      description: 'Updates to comply with new laws and regulations',
    },
    {
      icon: Edit,
      title: 'Platform Updates',
      description: 'Modifications to reflect new features and functionality',
    },
    {
      icon: Shield,
      title: 'Security Improvements',
      description: 'Enhancements to security or policy improvements',
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
              <Edit className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              8. Changes to Terms
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              We may modify these Terms from time to time to reflect:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {changeReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="bg-[#15941f]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <reason.icon className="h-8 w-8 text-[#15941f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {reason.description}
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
            className="bg-blue-50 border border-blue-200 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <Bell className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Notification of Changes
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You will be notified of material updates to these Terms.
                  Continued use of the platform indicates your acceptance of the
                  updated Terms.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
