"use client";

import { fadeInUp, staggerDelay } from "@/app/(landingpage)/hooks/annimation";
import { useInView } from "@/app/(landingpage)/hooks/useInView";
import { Linkedin, Twitter, Youtube, Rss } from "lucide-react";

export default function SocialMedia() {
  const [socialRef, socialInView] = useInView(0.1);

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter / X", icon: Twitter, href: "#" },
    { name: "YouTube / Blog", icon: Youtube, href: "#" }, // Assuming YouTube or a blog for the icon
  ];

  return (
    <section ref={socialRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-3xl text-center">
        <div
          className={`inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300 ${fadeInUp} ${socialInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <Rss className="w-4 h-4" />
          Stay Connected
        </div>
        <h2
          className={`text-3xl md:text-5xl font-bold text-gray-900 mb-8 ${fadeInUp} ${socialInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ transitionDelay: "200ms" }}
        >
          Follow us for updates, case studies, and new features
        </h2>

        <div
          className={`flex flex-wrap justify-center gap-8 ${fadeInUp} ${socialInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ transitionDelay: "400ms" }}
        >
          {socialLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 text-gray-600 hover:text-[#15941f] transition-colors duration-300 group ${fadeInUp} ${socialInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}
              style={staggerDelay(index + 4)} // Continue stagger delay from previous sections
            >
              <link.icon className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
