"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  if (isAuthPage) {
    return (
      <main className="h-screen w-screen bg-[#dce5dd] flex flex-col box-border overflow-hidden font-sans antialiased text-[#101514]">
        {children}
      </main>
    );
  }

  return (
    <main className="h-screen w-screen p-[4px] bg-[#dce5dd] flex flex-col box-border overflow-hidden font-sans antialiased text-[#101514]">
      {/* Full-bleed Rounded Canvas Card */}
      <div className="w-full h-full bg-[#eef4ee] rounded-[30px] sm:rounded-[36px] shadow-2xl border border-white/80 p-3 sm:p-4 lg:p-5 flex flex-col justify-between overflow-hidden relative">
        <div className="flex flex-row gap-3 xl:gap-5 items-stretch h-full min-h-0 w-full">
          {/* Dynamic Sidebar */}
          <Sidebar />

          {/* Main Page Dynamic Content */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto lg:overflow-hidden pr-0.5">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
