import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[100vh] flex-1 overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
};
