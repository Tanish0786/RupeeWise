"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Send,
  FileText,
  DollarSign,
  Wallet,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Play
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);

  // Sparkline data
  const metrics = [
    {
      title: "Net Worth",
      value: "₹42,50,910",
      change: "+14.2% YoY",
      isPositive: true,
      color: "text-[#3D4FE0]",
      glow: "bg-[#3D4FE0]/10",
      stroke: "M0,25 Q15,10 30,18 T60,8 T80,12 T100,5"
    },
    {
      title: "Monthly Income",
      value: "₹2,80,000",
      change: "+8.5% MoM",
      isPositive: true,
      color: "text-emerald-400",
      glow: "bg-emerald-500/10",
      stroke: "M0,20 Q20,15 40,25 T80,10 T100,2"
    },
    {
      title: "Expenses Tracked",
      value: "₹1,42,800",
      change: "-4.2% MoM",
      isPositive: true, // Lower expenses is positive
      color: "text-[#3D4FE0]",
      glow: "bg-[#3D4FE0]/10",
      stroke: "M0,10 Q25,30 50,15 T100,28"
    },
    {
      title: "Smart Savings",
      value: "₹1,37,200",
      change: "49% Savings Rate",
      isPositive: true,
      color: "text-emerald-400",
      glow: "bg-emerald-500/10",
      stroke: "M0,28 Q15,10 30,22 T60,12 T80,2 T100,8"
    }
  ];

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* 1. Welcome Section */}
      {!welcomeDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="relative rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/5 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3D4FE0]/10 blur-[60px] rounded-full pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3D4FE0]/20 flex items-center justify-center text-[#3D4FE0] flex-shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Welcome back, Tanish!</h1>
              <p className="text-xs text-[#CBD5E1] mt-0.5 max-w-xl leading-relaxed">
                Baniya has analyzed your portfolios today. You have ₹8.1 Lakh liquid assets compounding with an active advisory sandbox rebalancing run pending.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setWelcomeDismissed(true)}
              className="px-4 py-2 rounded-xl border border-white/[0.05] hover:bg-white/[0.02] text-xs font-semibold text-[#CBD5E1]"
            >
              Dismiss
            </button>
            <button
              onClick={() => router.push("/dashboard/baniya?q=Analyze my spending")}
              className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
            >
              Review Rebalance
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* 2. Grid Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-[#94A3B8] font-semibold uppercase tracking-wider">{metric.title}</span>
                    <h2 className="text-2xl font-bold text-white mt-1.5">{metric.value}</h2>
                  </div>
                  <span className={`text-[10px] font-semibold ${metric.isPositive ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"} px-2.5 py-1 rounded-full flex items-center gap-1`}>
                    {metric.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {metric.change}
                  </span>
                </div>
                
                {/* SVG Mini Sparkline */}
                <div className="h-14 flex items-end">
                  <svg viewBox="0 0 100 30" className={`w-full h-full ${metric.color}`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`glow-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={metric.stroke}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d={`${metric.stroke} L100,30 L0,30 Z`}
                      fill={`url(#glow-${idx})`}
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions Panel */}
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white mb-4">Quick Allocation Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/[0.04] bg-[#0B1020]/80 hover:border-[#3D4FE0] hover:bg-[#3D4FE0]/5 transition-all gap-2 text-center group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#3D4FE0]/10 flex items-center justify-center text-[#3D4FE0] group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white">Deposit Cash</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/[0.04] bg-[#0B1020]/80 hover:border-[#3D4FE0] hover:bg-[#3D4FE0]/5 transition-all gap-2 text-center group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white">Rebalance Portfolio</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/[0.04] bg-[#0B1020]/80 hover:border-[#3D4FE0] hover:bg-[#3D4FE0]/5 transition-all gap-2 text-center group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#3D4FE0]/10 flex items-center justify-center text-[#3D4FE0] group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white">Tax Reports</span>
              </button>
              <button
                onClick={() => router.push("/dashboard/baniya?q=Help me save ₹20,000")}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/[0.04] bg-[#0B1020]/80 hover:border-[#3D4FE0] hover:bg-[#3D4FE0]/5 transition-all gap-2 text-center group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white">Baniya Assets</span>
              </button>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white">Recent Wealth Updates</h3>
              <Activity className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <div className="flex flex-col gap-3">
              {[
                { title: "Arbitrage Rebalance Alert", desc: "Tax-harvesting rebalanced ₹12,040 to Liquid Bond assets.", time: "2 hours ago", status: "success" },
                { title: "Equity Fund Dividend Sync", desc: "₹850 dividend received from HDFC Sensex Direct Plan.", time: "1 day ago", status: "success" },
                { title: "Budget Limit Warning", desc: "Dining budget exceeded 90% threshold for current cycle.", time: "3 days ago", status: "warning" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-white/[0.03] bg-white/[0.01]">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.status === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {item.status === "success" ? <CheckCircle2 className="w-4.5 h-4.5" /> : <AlertTriangle className="w-4.5 h-4.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-normal">{item.title}</p>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#94A3B8]">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="flex flex-col gap-6">

          {/* AI Insight Card */}
          <div className="p-5 rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#3D4FE0]/15 blur-[50px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#3D4FE0] animate-pulse" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Baniya AI Insights</h3>
            </div>
            
            <p className="text-xs text-[#CBD5E1] leading-relaxed mb-4">
              &quot;Opportunity detected: Capital reallocation from liquid bank deposits to arbitrage funds can boost yield by 2.4% with tax harvesting protection.&quot;
            </p>
            
            <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-2">
              <span className="text-[10px] text-[#94A3B8]">Yield Lift: +₹19,200/yr</span>
              <button
                onClick={() => router.push("/dashboard/baniya?q=Can I afford a ₹15 lakh car?")}
                className="text-[10px] font-bold text-white bg-[#3D4FE0] px-3.5 py-1.5 rounded-lg hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
              >
                Confirm Allocation
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Budget Progress Card */}
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white mb-4">Budget Limits</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "Investments Goal", spent: "₹1,50,000", limit: "₹2,00,000", pct: "75%", color: "bg-[#3D4FE0]" },
                { name: "Rent & Housing", spent: "₹35,000", limit: "₹35,000", pct: "100%", color: "bg-emerald-400" },
                { name: "Food & Dining", spent: "₹18,500", limit: "₹20,000", pct: "92.5%", color: "bg-amber-500" },
                { name: "Travel & Lifestyle", spent: "₹8,900", limit: "₹25,000", pct: "35.6%", color: "bg-[#3D4FE0]/40" }
              ].map((b, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#CBD5E1]">{b.name}</span>
                    <span className="text-[#94A3B8] font-mono">{b.spent} / {b.limit}</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${b.color}`} style={{ width: b.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
