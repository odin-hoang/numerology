import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Định hướng năm cá nhân",
};
const CycleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pt-20 px-5 lg:max-w-[900px] mx-auto">
      {children}
    </section>
  );
};

export default CycleLayout;
