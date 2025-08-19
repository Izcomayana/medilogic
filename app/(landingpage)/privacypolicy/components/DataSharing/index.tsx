'use client';

import { motion } from 'framer-motion';
import { Share2, X, Cloud, Scale, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function DataSharing() {
  const sharingScenarios = [
    {
      icon: Cloud,
      title: 'Trusted Third-Party Processors',
      description:
        'With trusted third-party processors (e.g. cloud hosting) under strict agreements',
    },
    {
      icon: Scale,
      title: 'Legal Requirements',
      description: 'When required by law or regulatory compliance',
    },
    {
      icon: Users,
      title: 'Organization Admins',
      description:
        "With your organization's admins (if you are part of a clinic, hospital, or logistics firm)",
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
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              6. Data Sharing
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  We Do Not Sell Your Data
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell or rent your data. Your privacy and trust are
                  paramount to us.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              We only share information:
            </p>
          </div>

          <div className="space-y-6">
            {sharingScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-[#15941f]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#15941f]/10 rounded-full p-3 flex-shrink-0">
                        <scenario.icon className="h-6 w-6 text-[#15941f]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {scenario.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {scenario.description}
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
