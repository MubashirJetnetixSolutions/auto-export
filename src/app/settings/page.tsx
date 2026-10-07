"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Settings,
  Shield,
  Check,
  Save,
  Sparkles,
  Lock,
  Camera,
  Eye,
  EyeOff,
  User,
  Phone,
  Mail,
  Upload,
  Trash2,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"Profile" | "Security">("Profile");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form States (Image 1)
  const [name, setName] = useState("Waqas Hussain");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 000-0000");
  const [emailAddress, setEmailAddress] = useState("waqas@autoexport.com");
  const [profileImage, setProfileImage] = useState<string | null>("/user_avatar.jpg");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security Form States (Image 2)
  const [currentPassword, setCurrentPassword] = useState("password1234");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tabs: ("Profile" | "Security")[] = ["Profile", "Security"];

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-4 min-w-0 h-full min-h-0 overflow-y-auto pb-1">
      
      {/* ================= HEADER ================= */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101514] flex items-center gap-2.5">
            Settings
            <span className="px-2.5 py-0.5 rounded-full bg-[#bfe830] text-[#111615] text-xs font-bold shadow-xs">
              System Active
            </span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Control your system settings from here.
          </p>
        </div>

        {/* Top Save Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="h-10 sm:h-11 px-6 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#bfe830]" strokeWidth={2.5} />
                <span className="text-[#bfe830] font-bold">Settings Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-[#bfe830]" strokeWidth={2.5} />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ================= SEGMENTED TABS (ONLY 2 TABS: PROFILE & SECURITY) ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none shrink-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === t
                ? "bg-[#111615] text-white shadow-sm"
                : "bg-white/80 hover:bg-white text-gray-700 border border-gray-200/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ================= MAIN SETTINGS CONTENT CONTAINER ================= */}
      <div className="bg-[#f7faf7] rounded-[26px] border border-white/80 shadow-xs flex-1 min-h-0 overflow-y-auto p-4 sm:p-7">
        
        {/* ================= TAB 1: PROFILE ================= */}
        {activeTab === "Profile" && (
          <form onSubmit={handleSave} className="max-w-3xl flex flex-col gap-6">
            
            {/* Section 1: Profile Picture with Working Uploader */}
            <div className="bg-white/95 rounded-[22px] p-5 sm:p-6 border border-gray-200/70 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#111615] uppercase tracking-wider text-gray-400">
                Profile Picture
              </h2>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Photo Preview / Clickable Uploader Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 hover:border-[#111615] flex flex-col items-center justify-center text-gray-400 relative overflow-hidden group cursor-pointer shadow-xs transition-all"
                  title="Click to upload profile photo"
                >
                  {profileImage ? (
                    <>
                      <Image
                        src={profileImage}
                        alt="Profile Picture"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                        <Camera className="w-5 h-5 text-[#bfe830]" />
                        <span className="text-[9px] font-bold mt-0.5 text-white">Change</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Camera className="w-8 h-8 text-gray-400 group-hover:scale-110 group-hover:text-gray-700 transition-all" />
                      <span className="text-[10px] font-semibold mt-1 text-gray-500">Upload</span>
                    </>
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="flex flex-col justify-center gap-1 text-center sm:text-left">
                  <h3 className="text-sm font-bold text-[#111615]">Profile Picture</h3>
                  <p className="text-xs text-gray-500 max-w-sm">
                    This picture will appear publicly on the platform across dispatches and reports.
                  </p>
                  <div className="flex items-center gap-2 pt-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{profileImage ? "Change Photo" : "Upload Photo"}</span>
                    </button>
                    {profileImage && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-4 py-1.5 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: General Information */}
            <div className="bg-white/95 rounded-[22px] p-5 sm:p-6 border border-gray-200/70 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#111615] uppercase tracking-wider text-gray-400">
                General Information
              </h2>

              <div className="flex flex-col gap-4 text-xs">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-700">Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden"
                    />
                  </div>
                </div>

                {/* Phone Number & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="example@logistics.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        )}

        {/* ================= TAB 2: SECURITY ================= */}
        {activeTab === "Security" && (
          <form onSubmit={handleSave} className="max-w-3xl flex flex-col gap-6">
            
            <div className="bg-white/95 rounded-[22px] p-5 sm:p-6 border border-gray-200/70 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#111615] uppercase tracking-wider text-gray-400">
                  Security
                </h2>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  SSL Encrypted
                </span>
              </div>

              <div className="flex flex-col gap-4 text-xs">
                {/* Current Password */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-gray-700">Current Password</label>
                    <button
                      type="button"
                      onClick={() => alert("Password reset link has been dispatched to your email.")}
                      className="text-[11px] font-bold text-[#111615] hover:underline cursor-pointer"
                    >
                      Forget Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password & Confirm New Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                Update Password
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
