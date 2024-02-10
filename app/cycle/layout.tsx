import React from "react";

const CycleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pt-20 px-5 lg:max-w-[900px] mx-auto">
      {children}
    </section>
  );
};

export default CycleLayout;
