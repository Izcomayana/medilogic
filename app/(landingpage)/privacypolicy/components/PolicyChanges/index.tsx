"use client";

import { motion } from "framer-motion";
import { Edit, Bell, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PolicyChanges() {
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
              10. Changes to This Policy
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              We may update this Privacy Policy to reflect:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Edit className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Policy Updates
                    </h3>
                    <ul className="text-gray-600 text-sm space-y-2">
                      <li>• Legal changes</li>
                      <li>• Platform updates</li>
                      <li>• Security improvements</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Bell className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Notification Methods
                    </h3>
                    <ul className="text-gray-600 text-sm space-y-2">
                      <li>• Email notifications</li>
                      <li>• Platform notices</li>
                      <li>• In-app alerts</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#15941f]/5 border border-[#15941f]/20 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-[#15941f] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Stay Informed
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  If we make significant changes, you will be notified via email
                  or platform notice. We encourage you to review this Privacy
                  Policy periodically to stay informed about how we protect your
                  information.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
