import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransition>dashboards layout{children}</PageTransition>
    </>
  );
}
