"use client"

import { motion } from "framer-motion"
import { Search, User, Activity, Monitor } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function InformationCollection() {
  const dataTypes = [
    {
      icon: User,
      title: "Personal Information",
      items: ["Name, email address, phone number", "Job title, organization details", "User login credentials"],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Activity,
      title: "Operational Data",
      items: [
        "Trip logs and delivery records",
        "Waste collection schedules",
        "User activity and timestamps (audit trail)",
      ],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Monitor,
      title: "Technical Data",
      items: [
        "IP address, browser type, device info",
        "Access times and session logs",
        "Cookie identifiers (if applicable)",
      ],
      color: "bg-purple-100 text-purple-600",
    },
  ]

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
              <Search className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">2. Information We Collect</h2>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">We collect the following types of information:</p>
          </div>

          <div className="space-y-6">
            {dataTypes.map((dataType, index) => (
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
                      <div className={`rounded-full p-3 flex-shrink-0 ${dataType.color}`}>
                        <dataType.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {String.fromCharCode(97 + index)}. {dataType.title}
                        </h3>
                        <ul className="space-y-2">
                          {dataType.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-[#15941f] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
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
  )
}
