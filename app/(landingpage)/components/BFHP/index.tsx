"use client";

import { useInView } from "../../hooks/useInView";
import { fadeInUp, staggerDelay } from "../../hooks/annimation";
// import { Stethoscope, Recycle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";

export const BFHP = () => {
  const [audienceRef, audienceInView] = useInView(0.1);

  const Building2 = dynamic(
    () => import("lucide-react").then((m) => m.Building2),
    { ssr: false },
  );
  const Truck = dynamic(() => import("lucide-react").then((m) => m.Truck), {
    ssr: false,
  });
  const Stethoscope = dynamic(
    () => import("lucide-react").then((m) => m.Stethoscope),
    { ssr: false },
  );
  const Recycle = dynamic(() => import("lucide-react").then((m) => m.Recycle), {
    ssr: false,
  });

  return (
    <>
      {/* Built for Healthcare Professionals 69*/}
      <section ref={audienceRef} className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 ${fadeInUp} ${audienceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
              <Stethoscope className="w-4 h-4" />
              Built for Healthcare Professionals, by Healthcare Experts
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Medilogic is designed to serve:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "NHS clinics & hospitals",
                desc: "Streamlined operations for public healthcare",
              },
              {
                icon: Stethoscope,
                title: "Private medical practices",
                desc: "Efficient logistics for private care",
              },
              {
                icon: Recycle,
                title: "Medical waste disposal companies",
                desc: "Compliant waste management solutions",
              },
              {
                icon: Truck,
                title: "Healthcare logistics firms",
                desc: "Optimized delivery and transport",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${fadeInUp} ${
                  audienceInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={staggerDelay(index)}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#15941f] to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#15941f] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={`text-center mt-12 ${fadeInUp} ${audienceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From scheduling pickups to full audit trails, Medilogic is your
              all-in-one logistics command center.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
