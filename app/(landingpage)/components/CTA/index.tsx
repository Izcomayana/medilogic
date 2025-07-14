import React from "react";
import { useInView } from "../../hooks/useInView";
import { fadeInUp } from "../../hooks/annimation";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  const [ctaRef, ctaInView] = useInView(0.1);

  return (
    <section
      ref={ctaRef}
      className="py-20 px-4 bg-gradient-to-br from-[#15941f] to-green-600 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20"></div>

      <div className="container mx-auto max-w-4xl text-center relative">
        <div
          className={`${fadeInUp} ${ctaInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <Phone className="w-4 h-4 animate-pulse" />
            Ready to Modernize Your Logistics?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Take the first step toward secure, AI-enhanced logistics.
          </h2>
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 ${fadeInUp} ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <Button
              size="lg"
              className="bg-white text-[#15941f] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              Book a Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#15941f] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-transparent hover:scale-105"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
