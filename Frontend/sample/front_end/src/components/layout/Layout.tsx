import React from "react";
import Navbar from "../../components/common/Navbar";
import SidebarLayout from "../../components/common/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <SidebarLayout>{children}</SidebarLayout>
    </div>
  );
};

export default Layout;