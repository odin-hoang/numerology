import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <nav className="m-10 text-center">{children}</nav>
    </section>
  );
};

export default DashboardLayout;
