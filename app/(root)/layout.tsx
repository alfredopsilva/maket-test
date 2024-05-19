import NavBar from "@/components/shared/NavBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex flex-col justify-center items-center flex-1">
        {children}
      </section>
    </main>
  );
};

export default Layout;
