'use client';

import { motion } from 'framer-motion';
import { User, UserCheck, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Eligibility() {
  const requirements = [
    {
      icon: UserCheck,
      title: 'Age Requirement',
      description:
        'You must be at least 18 years old or have legal authorization from your organization',
    },
    {
      icon: User,
      title: 'Accurate Information',
      description:
        'You must provide accurate and current registration information',
    },
    {
      icon: Lock,
      title: 'Account Security',
      description:
        'You are responsible for maintaining the confidentiality of your account credentials',
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
          className=" mx-auto"
        >
          <div className="flex items-center mb-8">
            <div className="bg-[#15941f] rounded-full p-3 mr-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              2. Eligibility
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              To use Medilogic, you must meet the following requirements:
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
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-[#15941f]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#15941f]/10 rounded-full p-3 flex-shrink-0">
                        <requirement.icon className="h-6 w-6 text-[#15941f]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {requirement.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {requirement.description}
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
