"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Settings,
  Plus,
  ArrowUpRight,
  MoreHorizontal,
  MoreVertical,
  ChevronDown,
  Sparkles,
  Truck,
  Container as ContainerIcon,
  Warehouse,
  Ticket,
  ArrowRightLeft,
} from "lucide-react";

export default function DashboardView() {
  const [selectedMonth, setSelectedMonth] = useState("Jul");
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [scenarioName, setScenarioName] = useState("");

  // 12 Months Dispatches Data
  const monthlyDispatches = [
    { month: "Jan", count: 420, height: 42 },
    { month: "Feb", count: 680, height: 68 },
    { month: "Mar", count: 510, height: 51 },
    { month: "Apr", count: 590, height: 59 },
    { month: "May", count: 520, height: 52 },
    { month: "Jun", count: 530, height: 53 },
    { month: "Jul", count: 980, height: 98, isPeak: true },
    { month: "Aug", count: 590, height: 59 },
    { month: "Sep", count: 670, height: 67 },
    { month: "Oct", count: 530, height: 53 },
    { month: "Nov", count: 620, height: 62 },
    { month: "Dec", count: 690, height: 69 },
  ];

  // Monthly Deliveries Wave Points for 12 months (0 to 100 scale where 100 = 10,000)
  const deliveryData = [
    { month: "Jan", lastYear: 1800, prevYear: 850 },
    { month: "Feb", lastYear: 2400, prevYear: 950 },
    { month: "Mar", lastYear: 6800, prevYear: 1600 },
    { month: "Apr", lastYear: 3900, prevYear: 2200 },
    { month: "May", lastYear: 7200, prevYear: 2400 },
    { month: "Jun", lastYear: 3800, prevYear: 1100 },
    { month: "Jul", lastYear: 5100, prevYear: 2800 },
    { month: "Aug", lastYear: 7600, prevYear: 2600 },
    { month: "Sep", lastYear: 5400, prevYear: 1900 },
    { month: "Oct", lastYear: 7400, prevYear: 3100 },
    { month: "Nov", lastYear: 6100, prevYear: 2700 },
    { month: "Dec", lastYear: 6600, prevYear: 3400 },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-3.5 min-w-0 h-full min-h-0 overflow-y-auto pb-1">

      {/* Header: Title + Action Buttons */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold tracking-tight text-[#101514] leading-[1.1]">
            <span className="inline-flex items-center gap-2 flex-wrap">
              Auto Export
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-200/90 shadow-xs">
                <Truck className="w-3.5 h-3.5 text-gray-700" />
              </span>
              Operations
            </span>
            <span className="inline-flex items-center gap-2 flex-wrap ml-2">
              and
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#bfe830] text-[#111615] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-black/10 text-[#111615]" />
              </span>
              Workflows
            </span>
          </h1>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <Link
            href="/settings"
            title="Settings"
            className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 border border-gray-200/90 shadow-xs flex items-center justify-center text-gray-700 hover:text-black transition-all active:scale-95"
          >
            <Settings className="w-4.5 h-4.5" strokeWidth={1.8} />
          </Link>

          <button
            onClick={() => setShowScenarioModal(true)}
            className="h-10 px-5 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
          >
            <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300 text-[#bfe830]" strokeWidth={2.5} />
            <span>Create Auto Scenario</span>
          </button>
        </div>
      </header>

      {/* ================= WELCOME HERO BANNER (IMAGE 2 AESTHETIC + IMAGE 1 CONTENT) ================= */}
      <div className="bg-[#111615] rounded-[26px] p-5 sm:p-7 md:p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[140px] sm:min-h-[160px] shadow-lg border border-white/10 shrink-0 group">
        {/* Right 3D Visual with Smooth Dark Blend Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-[42%] sm:w-[35%] md:w-[30%] lg:w-[28%] pointer-events-none overflow-hidden select-none">
          <Image
            src="/cyber_avatar.jpg"
            alt="Auto Export AI"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
          />
          {/* Seamless Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111615] via-[#111615]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111615]/40 via-transparent to-[#111615]/30" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-lg md:max-w-xl flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-extrabold tracking-tight text-white leading-tight flex items-center gap-2">
            <span>Welcome to Auto Export, Mohsin!</span>
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#bfe830] shrink-0" strokeWidth={2.5} />
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-md">
            All your dispatch related details are all available here
          </p>

          <div className="pt-2 sm:pt-3">
            <Link
              href="/dispatch-order"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-[#111615] font-bold text-xs sm:text-sm hover:bg-[#bfe830] transition-colors shadow-md active:scale-95 group/btn"
            >
              <span>Explore Dispatches</span>
              <span className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#111615] group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= TOP ROW: 4 HERO CARDS (EXACT UI FROM SECOND IMAGE) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5 shrink-0">

        {/* CARD 1: DISPATCH ORDER (WHITE CARD STYLE) */}
        <div className="bg-[#f7faf7] rounded-[26px] p-4.5 border border-white/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs">
                  <Truck className="w-3.5 h-3.5 text-gray-700" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#111615]">Dispatch Order</span>
              </div>
              <Link href="/dispatch-order" className="text-gray-400 hover:text-gray-700 p-1">
                <MoreHorizontal className="w-4 h-4" />
              </Link>
            </div>

            {/* Metric Numbers + Progress Pill */}
            <div className="mt-3.5 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111615]">643</span>
                <span className="text-xs font-semibold text-gray-400">/ 45 Received</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eef8bb] text-[#111615] text-xs font-bold">
                <span>82%</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="9" strokeDasharray="56" strokeDashoffset="10" />
                </svg>
              </div>
            </div>
          </div>

          {/* Capsule Progress Meter (8 bars: 5 filled, 3 dashed) */}
          <div className="mt-4 flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={`do-filled-${i}`}
                className="h-9 sm:h-10 flex-1 bg-[#111615] rounded-full transition-transform hover:scale-105"
              />
            ))}
            {[1, 2, 3].map((i) => (
              <div
                key={`do-empty-${i}`}
                className="h-9 sm:h-10 flex-1 border-2 border-dashed border-gray-300/80 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* CARD 2: WAREHOUSE INVENTORY (LIME CARD STYLE) */}
        <div className="bg-[#dff75b] rounded-[26px] p-4.5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
                  <Warehouse className="w-3.5 h-3.5 text-[#111615]" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#111615]">Warehouse Inventory</span>
              </div>
              <Link href="/warehouse-batches" className="text-black/60 hover:text-black p-1">
                <MoreHorizontal className="w-4 h-4" />
              </Link>
            </div>

            {/* Metric Numbers + Progress Pill */}
            <div className="mt-3.5 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111615]">752</span>
                <span className="text-xs font-semibold text-black/60">/ 32 Assigned</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#111615] text-xs font-bold shadow-xs">
                <span>94%</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="9" strokeDasharray="56" strokeDashoffset="4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Capsule Progress Meter (8 bars: 7 filled, 1 dashed) */}
          <div className="mt-4 flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={`wh-filled-${i}`}
                className="h-9 sm:h-10 flex-1 bg-[#111615] rounded-full transition-transform hover:scale-105"
              />
            ))}
            {[1].map((i) => (
              <div
                key={`wh-empty-${i}`}
                className="h-9 sm:h-10 flex-1 border-2 border-dashed border-black/25 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* CARD 3: TICKETING (WHITE CARD STYLE) */}
        <div className="bg-[#f7faf7] rounded-[26px] p-4.5 border border-white/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs">
                  <Ticket className="w-3.5 h-3.5 text-gray-700" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#111615]">Ticketing</span>
              </div>
              <Link href="/tickets" className="text-gray-400 hover:text-gray-700 p-1">
                <MoreHorizontal className="w-4 h-4" />
              </Link>
            </div>

            {/* Metric Numbers + Progress Pill */}
            <div className="mt-3.5 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111615]">952</span>
                <span className="text-xs font-semibold text-rose-600">/ 231 Urgent</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold">
                <span>76%</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="9" strokeDasharray="56" strokeDashoffset="14" />
                </svg>
              </div>
            </div>
          </div>

          {/* Capsule Progress Meter (8 bars: 6 filled, 2 dashed) */}
          <div className="mt-4 flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`tck-filled-${i}`}
                className="h-9 sm:h-10 flex-1 bg-[#111615] rounded-full transition-transform hover:scale-105"
              />
            ))}
            {[1, 2].map((i) => (
              <div
                key={`tck-empty-${i}`}
                className="h-9 sm:h-10 flex-1 border-2 border-dashed border-gray-300/80 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* CARD 4: CONTAINER (DARK CARD STYLE) */}
        <div className="bg-[#111615] text-white rounded-[26px] p-4.5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shadow-xs border border-white/10">
                  <ContainerIcon className="w-3.5 h-3.5 text-[#bfe830]" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-white">Container</span>
              </div>
              <Link href="/container" className="text-white/40 hover:text-white p-1">
                <MoreHorizontal className="w-4 h-4" />
              </Link>
            </div>

            {/* Metric Numbers + Progress Pill */}
            <div className="mt-3.5 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">452</span>
                <span className="text-xs font-semibold text-white/50">/ 110 Billed</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#bfe830] text-[#111615] text-xs font-bold">
                <span>68%</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="9" strokeDasharray="56" strokeDashoffset="18" />
                </svg>
              </div>
            </div>
          </div>

          {/* Capsule Progress Meter (8 bars: 5 filled lime, 3 dashed) */}
          <div className="mt-4 flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={`cnt-filled-${i}`}
                className="h-9 sm:h-10 flex-1 bg-[#bfe830] rounded-full transition-transform hover:scale-105 shadow-xs"
              />
            ))}
            {[1, 2, 3].map((i) => (
              <div
                key={`cnt-empty-${i}`}
                className="h-9 sm:h-10 flex-1 border-2 border-dashed border-white/20 rounded-full"
              />
            ))}
          </div>
        </div>

      </div>

      {/* ================= MIDDLE ROW: DISPATCHES PER MONTH (LIGHT CARD) & DISPATCHES DONUT (LIGHT CARD) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 shrink-0">

        {/* LEFT: DISPATCHES PER MONTH (8 COLS) - LIGHT CARD */}
        <div className="lg:col-span-8 bg-[#f7faf7] rounded-[26px] p-4.5 border border-white/80 shadow-xs flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm sm:text-base font-extrabold text-[#111615] tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#bfe830]" />
              Dispatches Per Month
            </h2>
            <button className="text-gray-400 hover:text-black p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* 12-Month Bar Chart */}
          <div className="flex items-end justify-between gap-1.5 sm:gap-2.5 flex-1 pt-2 px-1">
            {monthlyDispatches.map((item) => {
              const isSelected = selectedMonth === item.month;
              return (
                <div
                  key={item.month}
                  onClick={() => setSelectedMonth(item.month)}
                  className="flex-1 h-full flex flex-col items-center justify-end gap-2 group cursor-pointer"
                >
                  {/* Tooltip / Count on hover / peak */}
                  <div
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md transition-all duration-200 ${item.isPeak || isSelected
                        ? "bg-[#bfe830] text-[#111615] opacity-100 scale-105 shadow-sm"
                        : "opacity-0 group-hover:opacity-100 bg-[#111615] text-white shadow-md"
                      }`}
                  >
                    {item.count}
                  </div>

                  {/* Vertical Lime Bar */}
                  <div className="w-full max-w-[36px] sm:max-w-[44px] h-32 sm:h-36 flex flex-col justify-end">
                    <div
                      style={{ height: `${item.height}%` }}
                      className={`w-full rounded-xl transition-all duration-300 ${item.isPeak || isSelected
                          ? "bg-gradient-to-t from-[#dff75b] via-[#bfe830] to-[#a4d216] shadow-md shadow-[#bfe830]/40 scale-y-[1.02]"
                          : "bg-gradient-to-t from-[#e9f8b4]/60 via-[#d6f46d]/90 to-[#bfe830] group-hover:to-[#a4d216] group-hover:scale-y-[1.03]"
                        }`}
                    />
                  </div>

                  {/* Month Label */}
                  <span
                    className={`text-[10px] sm:text-[11px] font-medium transition-colors ${item.isPeak || isSelected
                        ? "text-[#111615] font-black"
                        : "text-gray-400 group-hover:text-black font-semibold"
                      }`}
                  >
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: DISPATCHES DONUT CHART (4 COLS) - LIGHT CARD */}
        <div className="lg:col-span-4 bg-[#f7faf7] rounded-[26px] p-4.5 border border-white/80 shadow-xs flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-sm sm:text-base font-extrabold text-[#111615] tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#bfe830]" />
              Dispatches
            </h2>
            <button className="text-gray-400 hover:text-black p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Donut & Legend Container */}
          <div className="flex items-center justify-around gap-4 flex-1 py-1">

            {/* Donut Graphic */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#e2ebe2"
                  strokeWidth="12"
                />
                {/* RORO Ring Segment (70%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#111615"
                  strokeWidth="12"
                  strokeDasharray="238.76"
                  strokeDashoffset="71.6"
                  strokeLinecap="round"
                  className="transition-all duration-500 hover:stroke-[#202927]"
                />
                {/* Warehouse Ring Segment (30% - #bfe830) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#bfe830"
                  strokeWidth="12"
                  strokeDasharray="238.76"
                  strokeDashoffset="167.13"
                  strokeLinecap="round"
                  className="transition-all duration-500 drop-shadow-[0_0_6px_rgba(191,232,48,0.8)]"
                />
              </svg>

              {/* Center Counter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-black text-[#111615] tracking-tight">
                  785
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">
                  Total
                </span>
              </div>
            </div>

            {/* Legend & Breakdown Bars */}
            <div className="flex flex-col gap-4 flex-1 min-w-0 pr-2">
              {/* RORO */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#111615]">
                  <span>RORO</span>
                  <span className="font-mono font-black">70</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-[#111615] rounded-full w-[70%]" />
                </div>
              </div>

              {/* Warehouse (#bfe830) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#111615]">
                  <span>Warehouse</span>
                  <span className="font-mono font-black text-emerald-800">30</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#dff75b] to-[#bfe830] rounded-full w-[30%] shadow-xs" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ================= BOTTOM ROW: MONTHLY DELIVERIES (LIGHT CARD WITH #bfe830 LIME WAVY GRAPH) ================= */}
      <div className="bg-[#f7faf7] rounded-[26px] p-4.5 sm:p-5 border border-white/80 shadow-xs flex flex-col justify-between shrink-0 min-h-[220px] hover:shadow-md transition-shadow">
        {/* Header + Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 px-1">
          <h2 className="text-sm sm:text-base font-extrabold text-[#111615] tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#bfe830]" />
            Monthly Deliveries
          </h2>

          {/* Legend */}
          <div className="flex items-center gap-5 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#bfe830] border border-black/10 shadow-xs" />
              <span className="text-[#111615] font-bold">Last Year</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span className="text-gray-500 font-medium">Previous Year</span>
            </div>
          </div>
        </div>

        {/* Wavy Chart Area */}
        <div className="relative flex gap-3 flex-1 min-h-[140px] sm:min-h-[160px] pt-2">

          {/* Y-Axis Labels */}
          <div className="flex flex-col justify-between text-[10px] sm:text-[11px] font-mono font-bold text-gray-400 select-none pb-6 text-right w-12">
            <span>10,000</span>
            <span>6,666.7</span>
            <span>3,333.3</span>
            <span>0</span>
          </div>

          {/* Graph Canvas */}
          <div className="flex-1 relative pb-6 flex flex-col justify-between">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-b border-gray-200/50" />
              <div className="w-full border-b border-gray-200/50" />
              <div className="w-full border-b border-gray-200/50" />
              <div className="w-full border-b border-gray-300/80" />
            </div>

            {/* SVG Smooth #bfe830 Curves on Light Card */}
            <div className="absolute inset-x-0 top-0 bottom-6">
              <svg
                viewBox="0 0 1100 130"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  {/* #bfe830 Lime Gradient Fill */}
                  <linearGradient id="limeLightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bfe830" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#bfe830" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#bfe830" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Last Year #bfe830 Area Fill */}
                <path
                  d="M 0 110 
                     C 80 108, 140 90, 200 60 
                     C 260 35, 300 75, 370 70 
                     C 440 65, 480 30, 540 35 
                     C 600 40, 660 85, 730 75 
                     C 800 65, 840 25, 910 30 
                     C 980 35, 1020 60, 1100 50 
                     L 1100 130 L 0 130 Z"
                  fill="url(#limeLightGradient)"
                />

                {/* Previous Year Line (Subtle Dashed Gray) */}
                <path
                  d="M 0 118 
                     C 80 116, 140 112, 200 108 
                     C 260 104, 300 100, 370 98 
                     C 440 96, 480 105, 540 106 
                     C 600 107, 660 98, 730 96 
                     C 800 94, 840 98, 910 96 
                     C 980 94, 1020 85, 1100 80"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Last Year Line (Bold #9dc816 / #bfe830 Line) */}
                <path
                  d="M 0 110 
                     C 80 108, 140 90, 200 60 
                     C 260 35, 300 75, 370 70 
                     C 440 65, 480 30, 540 35 
                     C 600 40, 660 85, 730 75 
                     C 800 65, 840 25, 910 30 
                     C 980 35, 1020 60, 1100 50"
                  fill="none"
                  stroke="#97c413"
                  strokeWidth="3.5"
                  className="drop-shadow-[0_3px_8px_rgba(157,200,22,0.5)]"
                />
              </svg>
            </div>

            {/* X-Axis Month Labels */}
            <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] sm:text-[11px] font-bold text-gray-500 px-1">
              {deliveryData.map((d) => (
                <span key={d.month} className="hover:text-black transition-colors cursor-pointer">
                  {d.month}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Scenario Creation Modal */}
      {showScenarioModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 flex flex-col gap-4 text-[#111615]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#111615]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">New Export Automation</h3>
                  <p className="text-xs text-gray-500">Auto-dispatch Copart & IAAI lots</p>
                </div>
              </div>
              <button
                onClick={() => setShowScenarioModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700">Automation Trigger</label>
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="e.g. Auto-assign Hauler when Copart status is PAID"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#111615]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowScenarioModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Scenario "${scenarioName || "Auto-Dispatch Rule"}" created successfully!`);
                  setShowScenarioModal(false);
                  setScenarioName("");
                }}
                className="px-6 py-2.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md"
              >
                Save Automation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
