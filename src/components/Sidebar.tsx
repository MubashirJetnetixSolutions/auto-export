"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Ticket,
  Truck,
  Warehouse,
  Container,
  Car,
  FileText,
  Settings,
  Plus,
  BookOpen,
  Rocket,
  LogOut,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Ship,
  ExternalLink,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: string | number;
  badgeColor?: string;
  description?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics",
  },
  {
    name: "Tickets",
    href: "/tickets",
    icon: Ticket,
    badge: "4",
    badgeColor: "bg-[#dff75b] text-[#111615]",
    description: "Support & Dispatch Requests",
  },
  {
    name: "Dispatch Order",
    href: "/dispatch-order",
    icon: Truck,
    badge: "12",
    badgeColor: "bg-emerald-400 text-emerald-950",
    description: "Vehicle Transport Pipeline",
  },
  {
    name: "Warehouse & Batches",
    href: "/warehouse-batches",
    icon: Warehouse,
    description: "Yard Storage & Vehicle Lots",
  },
  {
    name: "Container",
    href: "/container",
    icon: Container,
    badge: "8",
    badgeColor: "bg-sky-400 text-sky-950",
    description: "Ocean Freight Shipments",
  },
  {
    name: "Car Hauler Load",
    href: "/car-hauler-load",
    icon: Car,
    description: "Car Carrier & Deck Allocations",
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
    description: "Titles, AES & Customs Clearance",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "System & API Integrations",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const isRouteActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard" || pathname.startsWith("/dashboard/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <aside
        className={`bg-[#111615] rounded-[28px] py-4 px-2.5 flex flex-col justify-between shadow-2xl text-white/70 shrink-0 transition-all duration-300 z-40 border border-white/10 ${
          isExpanded ? "w-64" : "w-16 lg:w-[70px]"
        }`}
      >
        {/* Top: Brand Logo + Collapse Toggle */}
        <div className="flex flex-col gap-3 w-full items-center">
          {/* Brand header */}
          <div className="flex items-center justify-between w-full px-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group overflow-hidden"
              title="Auto Export Portal"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1f2725] to-[#121716] border border-white/20 group-hover:border-[#dff75b] flex items-center justify-center transition-all duration-300 shadow-md shrink-0">
                <span className="text-[#dff75b] font-black text-sm tracking-wider">AE</span>
              </div>
              {isExpanded && (
                <div className="flex flex-col truncate animate-in fade-in duration-200">
                  <span className="font-extrabold text-sm text-white tracking-tight leading-tight flex items-center gap-1.5">
                    AutoExport
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dff75b] inline-block" />
                  </span>
                  <span className="text-[10px] text-white/50 font-medium">Logistics Portal</span>
                </div>
              )}
            </Link>

            {/* Toggle Button for Desktop */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden lg:flex w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white/80 hover:text-white transition-colors"
              title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isExpanded ? (
                <ChevronLeft className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Quick Action / Create Button */}
          <div className="w-full pt-1">
            <Link
              href="/dispatch-order"
              className={`w-full py-2.5 rounded-2xl bg-[#1c2321] hover:bg-[#283230] text-white flex items-center ${
                isExpanded ? "px-3.5 justify-start gap-3" : "justify-center"
              } border border-white/10 hover:border-[#dff75b]/40 transition-all duration-200 group shadow-inner`}
              title="Create New Dispatch / Order"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#dff75b] to-[#bfe830] text-[#111615] flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                <Plus className="w-4 h-4 font-black" strokeWidth={3} />
              </div>
              {isExpanded && (
                <span className="text-xs font-bold tracking-tight text-white/90">
                  New Dispatch
                </span>
              )}
            </Link>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 my-1" />

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 w-full">
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative group flex items-center ${
                    isExpanded ? "px-3 py-2.5 justify-start gap-3" : "p-2.5 justify-center"
                  } rounded-2xl transition-all duration-200 ${
                    active
                      ? "bg-[#283230] text-white border border-white/15 shadow-md shadow-black/40 font-semibold"
                      : "text-white/60 hover:text-white hover:bg-white/10 border border-transparent"
                  }`}
                  title={!isExpanded ? item.name : undefined}
                >
                  {/* Left Accent indicator for active state */}
                  {active && (
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-[#dff75b] shadow-xs shadow-[#dff75b]" />
                  )}

                  <div className="relative shrink-0 flex items-center justify-center">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                        active ? "text-[#dff75b]" : "text-current"
                      }`}
                      strokeWidth={active ? 2.2 : 1.8}
                    />
                    {/* Compact badge dot when collapsed */}
                    {!isExpanded && item.badge && (
                      <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-[#dff75b] border-2 border-[#111615]" />
                    )}
                  </div>

                  {/* Expanded text */}
                  {isExpanded && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="text-xs font-medium truncate group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            item.badgeColor || "bg-white/20 text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Floating Tooltip when collapsed */}
                  {!isExpanded && (
                    <div className="hidden lg:group-hover:flex absolute left-full ml-3 px-3 py-1.5 bg-[#18201e] text-white text-xs font-semibold rounded-xl whitespace-nowrap shadow-xl border border-white/10 z-50 pointer-events-none items-center gap-2 animate-in fade-in zoom-in-95 duration-150">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                            item.badgeColor || "bg-[#dff75b] text-[#111615]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Support, Docs, User Profile */}
        <div className="flex flex-col items-center gap-2 pt-3 w-full border-t border-white/10">
          {/* Quick icon actions */}
          <div
            className={`flex items-center ${
              isExpanded ? "justify-around w-full px-2" : "flex-col gap-2"
            }`}
          >
            <Link
              href="/login"
              className="p-2 text-white/50 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors relative group"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.8} />
            </Link>
            <Link
              href="/documents"
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative group"
              title="Documentation"
            >
              <BookOpen className="w-4 h-4" strokeWidth={1.8} />
            </Link>
            <Link
              href="/settings"
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative group"
              title="Preferences"
            >
              <Rocket className="w-4 h-4" strokeWidth={1.8} />
            </Link>
          </div>

          {/* User Profile Footer */}
          <div
            className={`mt-1 flex items-center ${
              isExpanded ? "w-full p-2 bg-[#1c2321] rounded-2xl gap-3 border border-white/10" : "justify-center"
            }`}
          >
            <div className="relative cursor-pointer group shrink-0">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-[#dff75b] transition-colors shadow-md">
                <Image
                  src="/user_avatar.jpg"
                  alt="User Profile"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#111615]" />
            </div>

            {isExpanded && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-white truncate">Marcus Vance</span>
                <span className="text-[10px] text-white/50 truncate">Logistics Manager</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
