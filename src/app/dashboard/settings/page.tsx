"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Shield, User, Bell, Sparkles } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [rebalanceEnabled, setRebalanceEnabled] = useState(true);

  const tabs = [
    { name: "Profile", icon: User },
    { name: "Advisory Security", icon: Shield },
    { name: "Notifications", icon: Bell }
  ];

  return (
    <div className="dashboard-page">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#3D4FE0]" />
          Platform Settings
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1">Configure account options, advisory thresholds, security keys, and settings.</p>
      </div>

      <div className="flex gap-4 border-b border-white/[0.04] pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 pb-2.5 text-xs sm:text-sm font-semibold transition-all relative ${
                isActive ? "text-white" : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
              {isActive && (
                <motion.span
                  layoutId="settings-active"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3D4FE0]"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 p-5 sm:p-6 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-5">
          {activeTab === "Profile" && (
            <>
              <h2 className="text-sm font-bold text-white mb-2">Personal Parameters</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#CBD5E1]">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Tanish"
                    className="w-full h-11 px-4 rounded-xl border border-white/[0.05] bg-[#050816] text-sm text-white focus:outline-none focus:border-[#3D4FE0]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#CBD5E1]">Email Address</label>
                  <input
                    type="email"
                    defaultValue="tanish@rupeewise.com"
                    className="w-full h-11 px-4 rounded-xl border border-white/[0.05] bg-[#050816] text-sm text-white focus:outline-none focus:border-[#3D4FE0] cursor-not-allowed opacity-60"
                    disabled
                  />
                </div>
              </div>
              <button className="h-11 rounded-xl bg-[#3D4FE0] hover:scale-102 active:scale-0.98 transition-all text-xs font-bold text-white max-w-max px-6 cursor-pointer mt-4">
                Save Changes
              </button>
            </>
          )}

          {activeTab === "Advisory Security" && (
            <>
              <h2 className="text-sm font-bold text-white mb-2">Baniya Autonomous Controls</h2>
              <div className="flex justify-between items-center p-4 rounded-xl border border-white/[0.03] bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#3D4FE0] flex-shrink-0" />
                  <div>
                    <h3 className="text-xs font-bold text-white">Enable One-Click Rebalancing</h3>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">Let Baniya sweep assets to arbitrage pools with single button approval.</p>
                  </div>
                </div>
                <button
                  onClick={() => setRebalanceEnabled(!rebalanceEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                    rebalanceEnabled ? "bg-[#3D4FE0]" : "bg-white/10"
                  }`}
                >
                  <motion.div
                    layout
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                    animate={{ x: rebalanceEnabled ? 20 : 0 }}
                  />
                </button>
              </div>
            </>
          )}

          {activeTab === "Notifications" && (
            <p className="text-xs text-[#94A3B8]">Notification channel configuration settings dashboard placeholder.</p>
          )}
        </div>
      </div>
    </div>
  );
}
