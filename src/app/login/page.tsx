"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Truck,
  Container,
  Sparkles,
  Globe2,
  CheckCircle2,
  Ship,
  Car,
  KeyRound,
  FileCheck2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Role Presets
  const roles = [
    { id: "dispatcher", label: "Dispatcher / Admin", email: "waqas@autoexport.com", roleName: "Master Control" },
    { id: "carrier", label: "Carrier Partner", email: "carrier@swiftlogistics.com", roleName: "Fleet Driver" },
    { id: "dealer", label: "Dealer / Client", email: "dealer@globalmotors.com", roleName: "Consignee" },
  ];

  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [email, setEmail] = useState(roles[0].email);
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleRoleSelect = (role: typeof roles[0]) => {
    setSelectedRole(role);
    setEmail(role.email);
    setPassword("password1234");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      setForgotEmail("");
    }, 2500);
  };

  return (
    <div className="h-screen w-screen bg-[#dce5dd] p-2.5 sm:p-4 md:p-6 flex items-center justify-center font-sans antialiased select-none overflow-hidden">
      {/* Main Enclosed Luxury Kiosk Canvas */}
      <div className="w-full max-w-6xl h-full max-h-[860px] bg-[#eef4ee] rounded-[32px] sm:rounded-[40px] shadow-2xl border border-white/90 p-3 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Header Bar */}
        <header className="flex items-center justify-between px-2 sm:px-4 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1f2725] to-[#121716] border border-white/20 group-hover:border-[#bfe830] flex items-center justify-center transition-all duration-300 shadow-md">
              <span className="text-[#bfe830] font-black text-sm tracking-wider">AE</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base text-[#111615] tracking-tight leading-tight flex items-center gap-1.5">
                AutoExport
                <span className="w-2 h-2 rounded-full bg-[#bfe830] inline-block animate-pulse" />
              </span>
              <span className="text-[11px] text-gray-500 font-semibold tracking-wide uppercase">
                Logistics OS v2.4
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <div className="px-3.5 py-1 rounded-full bg-white/80 border border-gray-200/80 shadow-xs flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>All Gateways Live</span>
            </div>
          </div>
        </header>

        {/* Center Double-Winged Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch flex-1 min-h-0 my-3 overflow-y-auto lg:overflow-hidden">
          
          {/* ================= LEFT WING: FUTURISTIC SHOWCASE & LIVE TELEMETRY ================= */}
          <div className="lg:col-span-6 bg-[#111615] text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/10 group">
            {/* Background Cyberpunk / AI Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/cyber_avatar.jpg"
                alt="Auto Export Cyber AI"
                fill
                priority
                className="object-cover object-center opacity-50 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111615] via-[#111615]/75 to-[#111615]/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111615]/90 via-[#111615]/40 to-transparent" />
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#bfe830]/15 blur-3xl pointer-events-none z-0" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none z-0" />

            {/* Top Badge & Mission */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#dff75b] text-xs font-bold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-[#bfe830]" />
                <span>Next-Gen Global Vehicle Export Terminal</span>
              </div>

              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Seamless vehicle dispatch & ocean freight intelligence.
              </h2>
              <p className="text-xs sm:text-sm text-white/60 max-w-md font-medium leading-relaxed">
                Track car hauler pickups, automate AES customs filing, manage warehouse batches, and coordinate ocean containers in one luxury command center.
              </p>
            </div>

            {/* Middle Live Telemetry Cards */}
            <div className="relative z-10 grid grid-cols-2 gap-3 my-4">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 hover:border-[#bfe830]/40 transition-colors">
                <div className="flex items-center justify-between text-white/60 mb-1.5">
                  <span className="text-[11px] font-bold">Live Dispatches</span>
                  <Truck className="w-4 h-4 text-[#bfe830]" />
                </div>
                <div className="text-xl font-black text-white">1,174 <span className="text-xs font-medium text-[#bfe830]">Units</span></div>
                <div className="text-[10px] text-white/50 mt-0.5">Across 42 Transit Hubs</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 hover:border-[#bfe830]/40 transition-colors">
                <div className="flex items-center justify-between text-white/60 mb-1.5">
                  <span className="text-[11px] font-bold">Ocean Freight</span>
                  <Ship className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-xl font-black text-white">28 <span className="text-xs font-medium text-sky-400">Containers</span></div>
                <div className="text-[10px] text-white/50 mt-0.5">99.4% On-Time Delivery</div>
              </div>
            </div>

            {/* Bottom Shipping Line Marquee / Trust Pill */}
            <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/70">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-[#bfe830]" />
                  Integrated Global Ocean Carriers
                </span>
                <span className="text-[#bfe830] font-bold text-[10px] bg-[#bfe830]/10 px-2 py-0.5 rounded-full">
                  Direct API Synced
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-white/80 tracking-wider">
                <span className="px-2 py-1 rounded-lg bg-white/5">MAERSK</span>
                <span className="px-2 py-1 rounded-lg bg-white/5">MSC</span>
                <span className="px-2 py-1 rounded-lg bg-white/5">HAPAG-LLOYD</span>
                <span className="px-2 py-1 rounded-lg bg-white/5">CMA CGM</span>
                <span className="px-2 py-1 rounded-lg bg-white/5">ONE</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT WING: AUTHENTICATION CONSOLE ================= */}
          <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-lg border border-gray-200/80">
            <div>
              {/* Form Title */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111615] tracking-tight">
                    Terminal Login
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Sign in to access your dispatch operations & fleet dashboard.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830]/20 border border-[#bfe830] flex items-center justify-center text-[#111615]">
                  <KeyRound className="w-5 h-5" />
                </div>
              </div>

              {/* Quick Demo Role Selector Pills */}
              <div className="mt-5 space-y-1.5">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                  Quick Access Preset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => {
                    const active = selectedRole.id === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRoleSelect(r)}
                        className={`px-2.5 py-2 rounded-xl text-left transition-all border ${
                          active
                            ? "bg-[#111615] text-white border-[#111615] shadow-xs"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        <div className="text-[11px] font-bold truncate">{r.label}</div>
                        <div className={`text-[9px] truncate ${active ? "text-[#bfe830]" : "text-gray-400"}`}>
                          {r.roleName}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="mt-5 space-y-4">
                {/* Email Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Work Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="waqas@autoexport.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200 font-semibold text-xs text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] font-bold text-[#111615] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50/80 border border-gray-200 font-bold text-xs text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#111615] focus:ring-[#111615] border-gray-300"
                    />
                    <span className="text-xs font-semibold text-gray-600">Keep me logged in for 30 days</span>
                  </label>
                </div>

                {/* Submit / Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 rounded-2xl bg-[#111615] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl transition-all active:scale-[0.98] group cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-[#bfe830] rounded-full animate-spin" />
                      <span className="text-[#bfe830]">Authenticating Session...</span>
                    </div>
                  ) : (
                    <>
                      <span>Access Auto Export Portal</span>
                      <ArrowRight className="w-4 h-4 text-[#bfe830] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Single Sign-On Dividers */}
              <div className="mt-4 pt-4 border-t border-gray-200/80">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        router.push("/dashboard");
                      }, 700);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Google Workspace</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        router.push("/dashboard");
                      }, 700);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fleet SSO</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Security Footer */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-bit AES End-to-End Encryption
              </span>
              <span>SOC2 Type II Certified</span>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 text-[11px] text-gray-500 font-medium shrink-0 pt-1">
          <div>© 2026 Auto Export Logistics Inc. All rights reserved.</div>
          <div className="flex items-center gap-4 mt-1 sm:mt-0">
            <span className="hover:text-gray-800 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-800 cursor-pointer">Security Standards</span>
            <span>•</span>
            <span className="hover:text-gray-800 cursor-pointer">Customs Direct API</span>
          </div>
        </footer>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#111615] text-white rounded-[32px] p-6 sm:p-7 max-w-md w-full shadow-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Reset Terminal Access</h3>
                  <p className="text-xs text-white/60">Enter your registered work email</p>
                </div>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Password Reset Dispatched!</h4>
                <p className="text-xs text-white/70">
                  We have sent secure reset instructions to <span className="text-[#bfe830] font-mono">{forgotEmail || email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-white/70 leading-relaxed">
                  We will send a temporary one-time password and secure reset token to your authenticated logistics address.
                </p>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/80">Account Email</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="waqas@autoexport.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:ring-2 focus:ring-[#bfe830] outline-hidden font-semibold"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#bfe830] hover:bg-[#dff75b] text-[#111615] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
