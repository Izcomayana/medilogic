"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import {
  Quote,
  Building2,
  Stethoscope,
  Recycle,
  Truck,
  BarChart3,
} from "lucide-react";

export default function GridSection() {
  const [gridRef, gridInView] = useInView(0.1);

  const testimonials = [
    {
      icon: Building2,
      title: "Seamless integration with our NHS clinic workflows.",
      quote:
        "Before Medilogic, managing our clinical waste collections was manual and prone to delays. Now, everything is scheduled automatically, and we can export reports directly for inspections. It's made our compliance process 10x easier.",
      author: "Rachel M.",
      role: "Compliance Manager",
      company: "NHS Trust London",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: Stethoscope,
      title: "Finally, a system made for healthcare — not adapted to it.",
      quote:
        "We tried generic courier platforms before, but Medilogic is on another level. It's built specifically for medical practices like ours. The driver coordination tools and real-time tracking are spot-on.",
      author: "Dr. Sanjay A.",
      role: "Private Clinic Owner",
      company: "Birmingham",
      color: "from-[#15941f] to-green-500",
      bgColor: "from-[#15941f]/5 to-green-50",
    },
    {
      icon: Recycle,
      title: "Huge win for our waste disposal operations.",
      quote:
        "Medilogic gives us complete visibility into our pickups, drivers, and client history. We're able to manage dozens of clinics more efficiently than ever — and the invoicing system is a game-changer.",
      author: "James O.",
      role: "Operations Director",
      company: "MedWaste Solutions UK",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      icon: Truck,
      title: "My drivers finally have something that just works.",
      quote:
        "Our team isn't techy, but they picked it up in minutes. Drivers can view routes, update trip status, and check their logs easily. Support has also been top-notch.",
      author: "Laura B.",
      role: "Logistics Coordinator",
      company: "SafeMed Couriers",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
    },
    {
      icon: BarChart3,
      title: "The analytics dashboard gives us clarity we never had.",
      quote:
        "We love the reporting tools. I can filter by trip status, cost, waste type — and immediately see how we're performing. Medilogic helps us make smarter decisions every week.",
      author: "Ben H.",
      role: "Admin Manager",
      company: "HealthPath Waste Services",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <section ref={gridRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg overflow-hidden hover:-translate-y-2 ${fadeInUp} ${
                gridInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : `opacity-0 ${index % 2 === 0 ? "-translate-x-12" : "translate-x-12"} scale-95`
              }`}
              style={staggerDelay(index)}
            >
              <CardContent
                className={`p-8 bg-gradient-to-br ${testimonial.bgColor} relative`}
              >
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-16 h-16 text-gray-400" />
                </div>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10`}
                >
                  <testimonial.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#15941f] transition-colors duration-300 relative z-10">
                  {testimonial.title}
                </h3>
                <blockquote className="text-gray-700 leading-relaxed mb-6 relative z-10 italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-lg font-bold text-gray-700">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
