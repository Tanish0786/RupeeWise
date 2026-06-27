"use client";

import { motion } from "framer-motion";
import { TrendingUp, Plus, ArrowUpRight } from "lucide-react";

export default function InvestmentsPage() {
  const assets = [
    { name: "Direct Equity", value: "₹24,50,000", share: "57.6%", trend: "+16.8% YoY" },
    { name: "Arbitrage & Debt Funds", value: "₹12,00,000", share: "28.2%", trend: "+6.5% YoY" },
    { name: "Baniya Liquid Assets", value: "₹6,00,910", share: "14.2%", trend: "+7.8% YoY" }
  ];

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#3D4FE0]" />
            Investments & Portfolios
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Consolidated multi-asset summary tracking total capital allocations.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          Link Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((a, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col justify-between h-40"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider">{a.name}</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {a.trend}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-3">{a.value}</h2>
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#94A3B8] border-t border-white/[0.03] pt-3">
              <span>Share: {a.share}</span>
              <span className="text-[#3D4FE0] font-semibold flex items-center gap-0.5 cursor-pointer">
                View Allocation
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
