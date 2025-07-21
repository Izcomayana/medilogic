"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Button } from "@/components/ui/button";
import { Gift, ArrowRight, CheckCircle } from "lucide-react";

export default function FreeTrial() {
  const [trialRef, trialInView] = useInView(0.1);

  const trialFeatures = [
    "No credit card required",
    "No commitment",
    "Explore all features",
    "Test AI trip optimization",
    "See how Medilogic transforms your workflow",
  ];

  return (
    <section
      ref={trialRef}
      className="py-20 px-4 bg-gradient-to-br from-[#15941f] to-green-600 text-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl text-center relative">
        <div
          className={`${fadeInUp} ${trialInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <Gift className="w-4 h-4 animate-pulse" />
            Start with a 30-Day Free Trial!
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            🆓🎉 Start with a 30-Day Free Trial!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Free for your first 30 days — explore all features and see the
            transformation.
          </p>

          <div
            className={`grid md:grid-cols-5 gap-4 mb-10 ${fadeInUp} ${trialInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            {trialFeatures.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 justify-center md:justify-start ${fadeInUp} ${
                  trialInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={staggerDelay(index)}
              >
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-white/90 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div
            className={`${fadeInUp} ${trialInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <Button
              size="lg"
              className="bg-white text-[#15941f] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
