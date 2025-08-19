'use client';

import { motion } from 'framer-motion';
import { Building2, Users, UserCog, CheckSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function OrganizationAccounts() {
  const responsibilities = [
    {
      icon: Users,
      title: 'User Activity Responsibility',
      description:
        'Accept responsibility for all user activity under your organization',
    },
    {
      icon: UserCog,
      title: 'User Management',
      description:
        "Responsible for managing your organization's roles, permissions, and user onboarding",
    },
    {
      icon: CheckSquare,
      title: 'Team Compliance',
      description: 'Must ensure your team complies with these Terms',
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
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              4. Organization Accounts
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              If you are registering or managing an organization (e.g., a
              clinic, waste company, or logistics firm), you:
            </p>
          </div>

          <div className="space-y-6">
            {responsibilities.map((responsibility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#15941f]/10 rounded-full p-3 flex-shrink-0">
                        <responsibility.icon className="h-6 w-6 text-[#15941f]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {responsibility.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
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
