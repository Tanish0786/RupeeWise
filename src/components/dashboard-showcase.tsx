"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, 
  ArrowRight, Shield, CheckCircle2, AlertCircle, PieChart,
  Home, BarChart3, Clock, Settings, Sparkles
} from "lucide-react";

export function DashboardShowcase() {
  return (
    <section className="relative py-28 bg-[#050816] px-6">
      {/* Top Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#3D4FE0]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-3.5 py-1.5 rounded-full border border-[#3D4FE0]/20 bg-[#3D4FE0]/5 text-xs font-semibold text-[#3D4FE0] uppercase tracking-wider mb-4">
            Intelligence Center
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            The Command Center of Your Wealth
          </h2>
          <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
            Consolidate your multi-asset assets and let Baniya deploy real-time yield optimization rules.
          </p>
        </div>

        {/* 1. Laptop / Device Frame Wrapper */}
        <div className="w-full max-w-5xl relative">
          {/* Laptop Screen Border */}
          <div className="rounded-2xl border-4 border-[#121826] bg-[#050816] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative z-10">
            {/* Screen Inner Top Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3.5 w-24 bg-[#121826] rounded-b-xl flex items-center justify-center gap-1 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
              <span className="w-1 h-1 rounded-full bg-white/10" />
            </div>

            {/* Main Application Container */}
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#050816] flex text-xs md:text-sm font-sans select-none border border-white/[0.04]">
              
              {/* Sidebar */}
              <aside className="w-12 md:w-48 bg-[#0B1020] border-r border-white/[0.05] p-3 md:p-5 flex flex-col justify-between items-center md:items-stretch">
                <div className="flex flex-col gap-6 md:gap-8 w-full">
                  {/* Sidebar Brand logo */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#3D4FE0] flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-white hidden md:inline text-sm">RupeeWise</span>
                  </div>

                  {/* Sidebar Navigation */}
                  <nav className="flex flex-col gap-2 w-full">
                    {[
                      { icon: Home, label: "Overview", active: true },
                      { icon: BarChart3, label: "Analytics" },
                      { icon: Clock, label: "Activity" },
                      { icon: Settings, label: "Settings" }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 ${
                          item.active 
                            ? "bg-[#3D4FE0]/15 text-white border-l-2 border-[#3D4FE0]" 
                            : "text-[#94A3B8] hover:text-white hover:bg-white/[0.02]"
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="hidden md:inline font-medium">{item.label}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* User avatar segment */}
                <div className="flex items-center gap-3 border-t border-white/[0.05] pt-4 w-full">
                  <div className="w-8 h-8 rounded-full bg-[#3D4FE0]/25 flex items-center justify-center font-bold text-white text-[10px] md:text-xs">
                    T
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-xs font-bold text-white leading-none">Tanish</span>
                    <span className="text-[10px] text-[#94A3B8] mt-0.5">Premium Account</span>
                  </div>
                </div>
              </aside>

              {/* Dashboard Content Panel */}
              <main className="flex-1 bg-[#050816] p-4 md:p-6 overflow-y-auto flex flex-col gap-5">
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white">Wealth Command Center</h3>
                    <p className="text-[10px] md:text-xs text-[#94A3B8]">Real-time autonomous tracking</p>
                  </div>
                  <span className="text-[10px] md:text-xs px-2.5 py-1 rounded-full border border-white/[0.05] bg-[#121826] text-[#CBD5E1] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    All Syncs Active
                  </span>
                </div>

                {/* Metric Summary row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Metric 1 */}
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-[#121826]/70 flex flex-col justify-between">
                    <span className="text-[10px] md:text-xs text-[#94A3B8] font-medium">Net Worth Valuation</span>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-base md:text-xl font-extrabold text-white">₹64,28,450</span>
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center">
                        <ArrowUpRight className="w-3 h-3" /> +2.1%
                      </span>
                    </div>
                  </div>
                  {/* Metric 2 */}
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-[#121826]/70 flex flex-col justify-between">
                    <span className="text-[10px] md:text-xs text-[#94A3B8] font-medium">Monthly Spending Surplus</span>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-base md:text-xl font-extrabold text-white">₹1,42,800</span>
                      <span className="text-[10px] font-semibold text-[#CBD5E1]">of ₹3L limit</span>
                    </div>
                  </div>
                  {/* Metric 3 */}
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-[#121826]/70 flex flex-col justify-between">
                    <span className="text-[10px] md:text-xs text-[#94A3B8] font-medium">Active Savings Goal</span>
                    <div className="flex items-baseline gap-2 mt-1.5 font-bold text-white">
                      <span className="text-base md:text-xl">82% Achieved</span>
                    </div>
                  </div>
                </div>

                {/* Grid Row 2: Portfolio Overview & Allocation */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Portfolio line graph (Left Col) */}
                  <div className="lg:col-span-2 p-5 rounded-xl border border-white/[0.04] bg-[#121826]/40 backdrop-blur-sm flex flex-col justify-between min-h-[220px]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-white">Asset Performance Trend</span>
                      <div className="flex gap-2">
                        {["1W", "1M", "3M", "1Y"].map((t) => (
                          <span
                            key={t}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                              t === "1M" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* SVG Chart area */}
                    <div className="w-full h-36 flex items-end">
                      <svg viewBox="0 0 100 45" className="w-full h-full text-[#3D4FE0]" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,40 Q12,35 25,22 T50,28 T75,10 T100,5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0,40 Q12,35 25,22 T50,28 T75,10 T100,5 L100,45 L0,45 Z"
                          fill="url(#chartGlow)"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Asset Allocation Donut / breakdown (Right Col) */}
                  <div className="p-5 rounded-xl border border-white/[0.04] bg-[#121826]/40 backdrop-blur-sm flex flex-col justify-between">
                    <span className="text-xs font-bold text-white mb-3">Asset Distribution</span>
                    <div className="flex items-center justify-between gap-4">
                      {/* Donut SVG */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-white/10"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          {/* Segment 1: 55% */}
                          <path
                            className="text-[#3D4FE0]"
                            strokeDasharray="55, 100"
                            strokeWidth="4"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center font-extrabold text-white text-[10px]">
                          <span>55%</span>
                          <span className="text-[7px] text-[#94A3B8]">Equity</span>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex-1 flex flex-col gap-2 text-[10px]">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1.5 text-white font-medium">
                            <span className="w-2 h-2 rounded-full bg-[#3D4FE0]" /> Equity
                          </span>
                          <span className="text-[#94A3B8]">₹35.3L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1.5 text-white font-medium">
                            <span className="w-2 h-2 rounded-full bg-white/20" /> Fixed Income
                          </span>
                          <span className="text-[#94A3B8]">₹16.0L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1.5 text-white font-medium">
                            <span className="w-2 h-2 rounded-full bg-white/5" /> Others
                          </span>
                          <span className="text-[#94A3B8]">₹12.9L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Baniya AI Insight Card & Recent Activity Ledger */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Baniya AI Insight Overlay (Col 1) */}
                  <div className="p-5 rounded-xl border border-[#3D4FE0]/20 bg-[#3D4FE0]/5 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-white font-bold text-xs mb-3">
                      <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
                      <span>Baniya Intelligence Advisory</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-[#CBD5E1] leading-relaxed">
                      "Rebalanced debt funds to liquid arbitrage. Tax savings computed: ₹12,400. Execute portfolio harvest rule?"
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="px-3.5 py-1.5 rounded-lg bg-[#3D4FE0] text-white text-[10px] font-bold hover:scale-105 transition-all">
                        Execute Harvest
                      </button>
                      <button className="px-3.5 py-1.5 rounded-lg border border-white/[0.05] text-[#CBD5E1] text-[10px] font-medium hover:bg-white/[0.02]">
                        Decline
                      </button>
                    </div>
                  </div>

                  {/* Activity Ledger (Col 2 & 3) */}
                  <div className="lg:col-span-2 p-5 rounded-xl border border-white/[0.04] bg-[#121826]/40 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-white">Recent Transactions Ledger</span>
                      <span className="text-[10px] text-[#3D4FE0] font-semibold flex items-center gap-1 hover:underline cursor-pointer">
                        View All <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {[
                        { title: "Smart SIP Debit (Equity Mutual Fund)", value: "-₹25,000", time: "Today, 10:15 AM", type: "debit" },
                        { title: "Primary Salary Credit (RupeeWise Ltd)", value: "+₹1,80,000", time: "Yesterday, 6:00 PM", type: "credit" },
                        { title: "Baniya Rule Tax-Loss Harvest Run", value: "Saved ₹8,200", time: "June 24, 2026", type: "neutral" }
                      ].map((tx, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg border border-white/[0.02] bg-white/[0.01]">
                          <div>
                            <div className="text-[10px] md:text-xs font-bold text-white">{tx.title}</div>
                            <div className="text-[9px] text-[#94A3B8] mt-0.5">{tx.time}</div>
                          </div>
                          <span className={`text-[10px] md:text-xs font-bold ${
                            tx.type === "credit" ? "text-emerald-400" : tx.type === "debit" ? "text-white" : "text-[#3D4FE0]"
                          }`}>
                            {tx.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </main>

            </div>
          </div>

          {/* Laptop keyboard notch base (Realistic design) */}
          <div className="w-[106%] h-4 bg-[#121826] border-t border-white/[0.08] rounded-b-2xl -ml-[3%] shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative z-20" />
          <div className="w-[30%] h-1 bg-[#1c2436] rounded-b-lg mx-auto relative z-30 shadow-inner" />
        </div>
      </div>
    </section>
  );
}
