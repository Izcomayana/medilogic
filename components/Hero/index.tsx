import React from 'react';
import { useInView } from '@/app/(landingpage)/hooks/useInView';
import { fadeInUp } from '@/app/(landingpage)/hooks/annimation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Search } from "lucide-react";

type HeroProps = {
  badgeIcon?: React.ReactNode;
  badgeText?: string;
  heading: string;
  heading2: string;
  heading3?: string;
  subText: string;
  descBadgeIcon: React.ReactNode;
  descBadgeText: string;
  descBadgeIcon2: React.ReactNode;
  descBadgeText2: string;
  descSubText?: string;
  CTABtn?: string;
  CTABtnIcon?: React.ReactNode;
  CTABtn2?: string;
  CTABtn2Icon?: React.ReactNode;
};

export const Hero: React.FC<HeroProps> = ({
  badgeIcon,
  badgeText,
  heading,
  heading2,
  heading3,
  subText,
  descBadgeIcon,
  descBadgeText,
  descBadgeIcon2,
  descBadgeText2,
  CTABtn,
  CTABtn2,
  CTABtnIcon,
  CTABtn2Icon,
  descSubText,
}) => {
  const [heroRef, heroInView] = useInView(0.1);

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-16 px-4 overflow-hidden lg:pt-32"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#15941f]/5 to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#15941f]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto max-w-7xl relative">
        <div
          className={`text-center ${fadeInUp} ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {(badgeIcon || badgeText) && (
            <div
              className={`inline-flex items-center gap-2 bg-[#15941f]/10 text-[#15941f] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[#15941f]/20 ${fadeInUp} ${heroInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
              style={{ transitionDelay: '200ms' }}
            >
              {badgeIcon}
              {badgeText}
            </div>
          )}

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight ${fadeInUp} ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            {heading} <br />
            <span className="text-[#15941f] relative">
              {heading2}
              <div
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#15941f] to-green-400 rounded-full transition-all duration-1000 ${heroInView ? 'w-full' : 'w-0'}`}
                style={{ transitionDelay: '800ms' }}
              ></div>
            </span>
            {heading3 && <span> {heading3}</span>}
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed ${fadeInUp} ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '600ms' }}
          >
            {subText}
          </p>

          {(descBadgeText || descBadgeText2) && (
            <div
              className={`flex flex-wrap justify-center gap-4 mb-10 ${fadeInUp} ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {descBadgeText && (
                <Badge
                  variant="outline"
                  className="bg-white border-[#15941f]/30 text-[#15941f] px-4 py-2 text-sm hover:scale-105 transition-transform duration-300"
                >
                  {descBadgeIcon}
                  {descBadgeText}
                </Badge>
              )}
              {descBadgeText2 && (
                <Badge
                  variant="outline"
                  className="bg-white border-[#15941f]/30 text-[#15941f] px-2 py-2 text-xs md:text-sm hover:scale-105 transition-transform duration-300"
                >
                  {descBadgeIcon2}
                  {descBadgeText2}
                </Badge>
              )}
            </div>
          )}

          {(CTABtn || CTABtn2) && (
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${fadeInUp} ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1000ms' }}
            >
              {CTABtn && (
                <Button
                  size="lg"
                  className="bg-[#15941f] hover:bg-[#15941f]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
                >
                  {CTABtn}
                  {CTABtnIcon}
                </Button>
              )}
              {CTABtn2 && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#15941f] text-[#15941f] hover:bg-[#15941f] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 group bg-transparent hover:scale-105"
                >
                  {CTABtn2Icon}
                  {CTABtn2}
                </Button>
              )}
            </div>
          )}

          {descSubText && (
            <div
              className={`max-w-3xl mx-auto ${fadeInUp} ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1000ms' }}
            >
              {/* <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-[#15941f] transition-colors duration-300"
              />
            </div> */}
              <p className="text-lg text-gray-600 leading-relaxed">
                {descSubText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
