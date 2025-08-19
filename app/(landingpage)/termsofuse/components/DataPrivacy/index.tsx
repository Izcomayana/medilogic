'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Users, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function DataPrivacy() {
  const privacyPractices = [
    {
      icon: Database,
      title: 'Data Collection',
      description: 'Data collection for platform functionality and analytics',
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Role-based access to protect organizational data',
    },
    {
      icon: Lock,
      title: 'Secure Storage',
      description: 'Secure storage and encryption for sensitive information',
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
              6. Data & Privacy
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Your privacy matters to us. By using Medilogic, you agree to the
              practices outlined in our{' '}
              <Link
                href="/privacy"
                className="text-[#15941f] hover:underline font-semibold"
              >
                Privacy Policy
              </Link>
              , including:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {privacyPractices.map((practice, index) => (
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
                      <practice.icon className="h-8 w-8 text-[#15941f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {practice.description}
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
            className="bg-[#15941f]/5 border border-[#15941f]/20 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-[#15941f] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Privacy Commitment
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to protecting your data and maintaining
                  transparency about our data practices. For detailed
                  information about how we collect, use, and protect your data,
                  please review our Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
