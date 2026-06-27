"use client";

import { motion } from "framer-motion";
import { BarChart3, ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#3D4FE0]" />
          Expense & Yield Analytics
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1">Deep analysis of capital flows, recurring payments, and transaction history.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md min-h-[300px] flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#3D4FE0]/5 blur-[60px] rounded-full pointer-events-none" />
        <div>
          <h2 className="text-sm font-bold text-white mb-2">Monthly Cash Flow Trend</h2>
          <p className="text-xs text-[#94A3B8] mb-6">Visual mapping of net investments compared to discretionary expenditures.</p>
        </div>

        {/* SVG visual mock graph */}
        <div className="w-full h-40 flex items-end">
          <svg viewBox="0 0 100 30" className="w-full h-full text-[#3D4FE0]" preserveAspectRatio="none">
            <path
              d="M0,25 L10,20 L25,28 L40,15 L60,22 L80,5 L100,12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M0,25 L10,20 L25,28 L40,15 L60,22 L80,5 L100,12 L100,30 L0,30 Z"
              fill="currentColor"
              fillOpacity="0.08"
            />
          </svg>
        </div>

        <div className="flex justify-between items-center text-[10px] text-[#94A3B8] border-t border-white/[0.03] pt-4">
          <span>Data updated 10m ago</span>
          <span className="text-[#3D4FE0] font-semibold flex items-center gap-0.5 cursor-pointer">
            Export Analytics Data
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
