import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import buildings4 from "@/public/buildings4.jpg";
// import AnimatedText from "../../components/AnimatedText";
// import Link from "next/link";
// import { Button } from "../../components/ui/button";
import { Footer } from "../../components/Footer";

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* <section>
        <div className="w-full h-screen relative mt-16">
          <div className="absolute inset-0 bg-black opacity-50 z-0" />
          <Image
            src={buildings4}
            width={1000}
            height={1000}
            alt={"public"}
            className="w-full h-screen object-cover"
          />

          <div className="container mx-auto px-4 xl:px-0">
            <div className="absolute top-36 z-20 lg:top-44">
              <AnimatedText
                text={[
                  "BUILT",
                  "ON",
                  "TRUST,",
                  <br key="br" className="hidden lg:block" />,
                  "DRIVEN",
                  "BY",
                  "RESULTS.",
                  <br key="br" />,
                  <div key={"link"}>
                    <Link href={"/register"}>
                      <Button className="bg-white w-80 text-gray-900 hover:text-gray-50 hover:bg-gray-800 font-semibold transition-all mt-8 py-8 text-xl lg:mt-16">
                        Get Started
                      </Button>
                    </Link>
                  </div>,
                ]}
                className="text-5xl font-bold leading-[5rem] text-white lg:text-7xl"
                delay={500}
                wordDelay={500}
              />
            </div>
          </div>
        </div>
      </section> */}

      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
