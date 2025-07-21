"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { fadeInUp } from "@/app/(landingpage)/hooks/annimation";

export default function SubmitTestimonialSection() {
  const [submitRef, submitInView] = useInView(0.1);

  return (
    <section
      ref={submitRef}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <div
          className={`${fadeInUp} ${submitInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            <MessageSquare className="w-4 h-4" />
            Share Your Experience
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Want to Share Your Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have a Medilogic success story? We&apos;d love to hear from you.
          </p>
          <div
            className={`${fadeInUp} ${submitInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <Button
              size="lg"
              className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              Submit Your Testimonial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
