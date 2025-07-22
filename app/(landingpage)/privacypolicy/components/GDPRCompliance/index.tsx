"use client";

import { motion } from "framer-motion";
import { CheckCircle, Eye, Edit, Trash2, Ban, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function GDPRCompliance() {
  const gdprRights = [
    {
      icon: Eye,
      title: "Access Your Data",
      description: "Access your personal data",
    },
    {
      icon: Edit,
      title: "Correct Data",
      description: "Correct inaccurate or incomplete data",
    },
    {
      icon: Trash2,
      title: "Request Deletion",
      description: 'Request deletion ("right to be forgotten")',
    },
    {
      icon: Ban,
      title: "Object to Processing",
      description: "Object to processing in certain circumstances",
    },
    {
      icon: Download,
      title: "Data Portability",
      description: "Request data portability",
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
              5. GDPR Compliance (For UK and EU Users)
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Under GDPR, you have the right to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {gdprRights.map((right, index) => (
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
                      <right.icon className="h-8 w-8 text-[#15941f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {right.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{right.description}</p>
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
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Exercise Your Rights
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You can exercise these rights by contacting us at{" "}
                  <a
                    href="mailto:support@medilogicapp.com"
                    className="text-[#15941f] hover:text-[#117a1a] font-medium transition-colors"
                  >
                    support@medilogicapp.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
