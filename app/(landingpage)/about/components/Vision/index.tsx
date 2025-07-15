"use client";

import { useInView } from "../../../hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Zap } from "lucide-react";

export default function VisionSection() {
  const [visionRef, visionInView] = useInView(0.1);
  const fadeInUp = "transition-all duration-700 ease-out";

  return (
    <section
      ref={visionRef}
      className="py-20 px-4 bg-gradient-to-br from-[#15941f] to-green-600 text-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative">
        <div
          className={`text-center mb-16 ${fadeInUp} ${visionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
            <Target className="w-4 h-4" />
            Our Vision
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The gold standard in healthcare logistics
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${fadeInUp} ${visionInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Patient Care First</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  By streamlining logistics operations, we help healthcare
                  organizations focus on what matters most: delivering
                  exceptional patient care.
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            className={`space-y-6 ${fadeInUp} ${visionInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">
                    Technology Excellence
                  </h4>
                  <p className="text-white/90">
                    Combining cutting-edge AI with intuitive design to create
                    solutions that actually work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">
                    Human-Centered Design
                  </h4>
                  <p className="text-white/90">
                    Every feature is designed with real healthcare professionals
                    in mind, ensuring usability and efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-xl font-semibold text-white">
                To become the gold standard in healthcare logistics by combining
                technology, security, and human-centered design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
