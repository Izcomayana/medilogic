"use client";

import { motion } from "framer-motion";
import { Mail, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
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
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              10. Contact
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              If you have any questions or concerns about these Terms, please
              reach out to us:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-[#15941f]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-[#15941f]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Email Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get in touch with our support team
                  </p>
                  <Button
                    className="bg-[#15941f] hover:bg-[#0f6b17] text-white"
                    onClick={() =>
                      (window.location.href = "mailto:support@medilogicapp.com")
                    }
                  >
                    support@medilogicapp.com
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-[#15941f]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-[#15941f]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Support Hours
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We&lsquo;re here to help during business hours
                  </p>
                  <div className="text-[#15941f] font-semibold">
                    Monday–Friday
                    <br />
                    9AM–5PM (UK time)
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
            className="mt-8 bg-[#15941f]/5 border border-[#15941f]/20 rounded-lg p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Immediate Help?
            </h3>
            <p className="text-gray-700 mb-4">
              For urgent matters or technical support, don&#39;t hesitate to
              contact us directly.
            </p>
            <Button
              className="bg-[#15941f] hover:bg-[#0f6b17] text-white"
              onClick={() => (window.location.href = "/contact")}
            >
              Visit Contact Page
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
