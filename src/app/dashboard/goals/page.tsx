"use client";

import { motion } from "framer-motion";
import { Target, Plus, ArrowUpRight } from "lucide-react";

export default function GoalsPage() {
  const goals = [
    { title: "Emergency Reserves Pool", target: "₹5,00,000", current: "₹4,20,000", percentage: 84 },
    { title: "Smart Home Downpayment", target: "₹15,00,000", current: "₹6,00,000", percentage: 40 }
  ];

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-[#3D4FE0]" />
            Smart Wealth Goals
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Configure target balances and track auto-sweeps to dedicated targets.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          Create Target
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col justify-between h-44"
          >
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-sm font-bold text-white">{g.title}</h2>
                <span className="text-[10px] font-bold text-white bg-[#3D4FE0] px-2 py-0.5 rounded-full">
                  {g.percentage}% Achieved
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-2">Target: {g.target}</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3D4FE0] h-full" style={{ width: `${g.percentage}%` }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#94A3B8] mt-1">
                <span>Saved: {g.current}</span>
                <span className="text-[#3D4FE0] font-semibold flex items-center gap-0.5 cursor-pointer">
                  Configure Goal Settings
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
