"use client";

import { motion } from "framer-motion";
import { Wallet, Plus, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function BudgetPage() {
  const categories = [
    { name: "Rent & Housing", spent: 35000, limit: 35000, color: "bg-emerald-400" },
    { name: "Investments Goal", spent: 150000, limit: 200000, color: "bg-[#3D4FE0]" },
    { name: "Food & Dining", spent: 18500, limit: 20000, color: "bg-amber-500" },
    { name: "Travel & Lifestyle", spent: 8900, limit: 25000, color: "bg-[#3D4FE0]/40" }
  ];

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#3D4FE0]" />
            Budget Settings & Limits
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Configure your monthly spending, goals, and threshold alerts.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          Create Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
            <h2 className="text-sm font-bold text-white mb-4">Active Categories</h2>
            <div className="flex flex-col gap-5">
              {categories.map((c, idx) => {
                const percentage = Math.min((c.spent / c.limit) * 100, 100);
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#CBD5E1]">{c.name}</span>
                      <span className="text-[#94A3B8] font-mono">
                        ₹{c.spent.toLocaleString()} / ₹{c.limit.toLocaleString()} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full ${c.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
            <h2 className="text-sm font-bold text-white mb-3">Auto-Rebalance Rules</h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
              Link budgets to automatic debt sweep. When dining goes below target, surplus is reallocated to liquid funds.
            </p>
            <button className="w-full py-2.5 rounded-xl border border-white/[0.05] bg-[#0B1020]/80 hover:bg-[#3D4FE0]/10 hover:border-[#3D4FE0] text-xs font-semibold text-[#CBD5E1] transition-all">
              Manage Smart Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
