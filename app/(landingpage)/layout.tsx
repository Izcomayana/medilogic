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
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
