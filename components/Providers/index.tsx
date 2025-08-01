"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="0px"
        color="#111111"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
