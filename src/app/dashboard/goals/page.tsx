"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Plus, ArrowUpRight, AlertCircle, RefreshCw, Trash2 } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  percentage: number;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", title: "Emergency Reserves Pool", target: 500000, current: 420000, percentage: 84 },
    { id: "2", title: "Smart Home Downpayment", target: 1500000, current: 600000, percentage: 40 }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState(100000);
  const [newCurrent, setNewCurrent] = useState(10000);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsLoading(true);
    setShowAddGoal(false);

    setTimeout(() => {
      const pct = Math.min((newCurrent / newTarget) * 100, 100);
      const newGoal: Goal = {
        id: Math.random().toString(),
        title: newName,
        target: newTarget,
        current: newCurrent,
        percentage: Math.round(pct)
      };

      setGoals((prev) => [...prev, newGoal]);
      setNewName("");
      setNewTarget(100000);
      setNewCurrent(10000);
      setIsLoading(false);
    }, 1200);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-[#3D4FE0]" />
            Smart Wealth Goals
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Configure target balances and track auto-sweeps to dedicated targets.</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Target
        </button>
      </div>

      {/* Add Form */}
      {showAddGoal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-2xl border border-[#3D4FE0]/30 bg-[#3D4FE0]/5 backdrop-blur-md mb-2"
        >
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Create Wealth Target</h3>
          <form onSubmit={handleAddGoal} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-[#94A3B8] font-bold">Goal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Retirement Fund, Tesla Model S"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-10 px-3.5 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-[#94A3B8] font-bold">Target Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={newTarget}
                  onChange={(e) => setNewTarget(Number(e.target.value))}
                  className="h-10 px-3.5 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-[#94A3B8] font-bold">Initial Savings (₹)</label>
                <input
                  type="number"
                  required
                  value={newCurrent}
                  onChange={(e) => setNewCurrent(Number(e.target.value))}
                  className="h-10 px-3.5 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowAddGoal(false)}
                className="px-3 py-1.5 rounded-lg border border-white/[0.05] text-[10px] text-[#CBD5E1] hover:bg-white/[0.02]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-[#3D4FE0] text-[10px] font-bold text-white hover:scale-105 transition-transform"
              >
                Launch Target
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
          <div className="h-4 bg-white/5 rounded-full animate-pulse w-1/3" />
          <div className="h-2.5 bg-white/5 rounded-full animate-pulse w-full" />
        </div>
      )}

      {/* Empty State */}
      {goals.length === 0 && !isLoading && (
        <div className="p-10 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md text-center flex flex-col items-center gap-4">
          <AlertCircle className="w-10 h-10 text-[#94A3B8]" />
          <div>
            <h3 className="text-sm font-bold text-white">No wealth targets active</h3>
            <p className="text-xs text-[#94A3B8] mt-1">Configure saving targets to automate smart Friday rebalance sweeps.</p>
          </div>
          <button
            onClick={() => setGoals([
              { id: "1", title: "Emergency Reserves Pool", target: 500000, current: 420000, percentage: 84 }
            ])}
            className="px-3 py-1.5 rounded-lg border border-[#3D4FE0]/30 hover:bg-[#3D4FE0]/5 text-xs text-[#CBD5E1] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Demo Data
          </button>
        </div>
      )}

      {/* Goals Grid */}
      {goals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((g) => (
            <div
              key={g.id}
              className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col justify-between h-44 group relative"
            >
              <div>
                <div className="flex justify-between items-start">
                  <h2 className="text-sm font-bold text-white">{g.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white bg-[#3D4FE0] px-2 py-0.5 rounded-full">
                      {g.percentage}% Achieved
                    </span>
                    <button
                      onClick={() => handleDeleteGoal(g.id)}
                      className="text-[#94A3B8] hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-[#94A3B8] mt-2">Target: ₹{g.target.toLocaleString()}</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3D4FE0] h-full" style={{ width: `${g.percentage}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#94A3B8] mt-1">
                  <span>Saved: ₹{g.current.toLocaleString()}</span>
                  <span className="text-[#3D4FE0] font-semibold flex items-center gap-0.5 cursor-pointer hover:underline">
                    Configure Goal Settings
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
