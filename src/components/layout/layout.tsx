import React from "react";
import Header from "@/components/header/header";
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <NavBar />
      <main className="flex-grow overflow-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
