'use client';

import { motion } from 'framer-motion';
import { Globe, Shield, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function InternationalTransfers() {
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
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              7. International Data Transfers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Data Processing Location
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      If you are located outside the UK, including in Nigeria,
                      your data may be processed in data centers hosted in the
                      UK or EU.
                    </p>
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
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Legal Safeguards
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We take all necessary safeguards to ensure lawful
                      cross-border data transfers in compliance with applicable
                      data protection laws.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
