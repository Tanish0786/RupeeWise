"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Plus, Trash2, Sliders, AlertCircle, RefreshCw, Sparkles, TrendingUp, DollarSign } from "lucide-react";

interface Category {
  id: string;
  name: string;
  spent: number;
  limit: number;
  color: string;
}

export default function BudgetPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Rent & Housing", spent: 35000, limit: 35000, color: "bg-emerald-400" },
    { id: "2", name: "Investments Goal", spent: 150000, limit: 200000, color: "bg-[#3D4FE0]" },
    { id: "3", name: "Food & Dining", spent: 18500, limit: 20000, color: "bg-amber-500" },
    { id: "4", name: "Travel & Lifestyle", spent: 8900, limit: 25000, color: "bg-[#3D4FE0]/40" }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLimit, setNewLimit] = useState(10000);

  // Calculates metrics
  const totalLimit = categories.reduce((sum, c) => sum + c.limit, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const remainingBalance = Math.max(0, totalLimit - totalSpent);

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsLoading(true);
    setShowAddForm(false);

    setTimeout(() => {
      const colors = ["bg-[#3D4FE0]", "bg-emerald-400", "bg-amber-500", "bg-purple-500"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newCat: Category = {
        id: Math.random().toString(),
        name: newName,
        spent: 0,
        limit: newLimit,
        color: randomColor
      };
      
      setCategories((prev) => [...prev, newCat]);
      setNewName("");
      setNewLimit(10000);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteBudget = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateLimit = (id: string, limitVal: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, limit: limitVal } : c))
    );
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#3D4FE0]" />
            Budget Settings & Limits
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Configure your monthly spending, goals, and threshold alerts.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Budget
        </button>
      </div>

      {/* Summary KPI Cards */}
      {categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Total Cap Limit</span>
            <h3 className="text-xl font-bold text-white mt-1">₹{totalLimit.toLocaleString("en-IN")}</h3>
          </div>
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Total Spent</span>
            <h3 className="text-xl font-bold text-white mt-1">₹{totalSpent.toLocaleString("en-IN")}</h3>
          </div>
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Remaining Cap</span>
            <h3 className="text-xl font-bold text-emerald-400 mt-1">₹{remainingBalance.toLocaleString("en-IN")}</h3>
          </div>
        </div>
      )}

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main List */}
        <div className="md:col-span-2 flex flex-col gap-4">
          
          {/* Add form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl border border-[#3D4FE0]/30 bg-[#3D4FE0]/5 backdrop-blur-md mb-2"
            >
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Create New Budget Limit</h3>
              <form onSubmit={handleAddBudget} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-[#94A3B8] font-bold">Category Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Subscriptions, Groceries"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="h-10 px-3.5 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-[#94A3B8] font-bold">Monthly Cap (₹{newLimit.toLocaleString("en-IN")})</label>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={newLimit}
                    onChange={(e) => setNewLimit(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#3D4FE0]"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.05] text-[10px] text-[#CBD5E1] hover:bg-white/[0.02]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-[#3D4FE0] text-[10px] font-bold text-white hover:scale-105 transition-transform"
                  >
                    Add Budget
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Loader */}
          {isLoading && (
            <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4 animate-pulse">
              <div className="h-4 bg-white/5 rounded-full w-1/3" />
              <div className="h-2.5 bg-white/5 rounded-full w-full" />
            </div>
          )}

          {/* Empty state */}
          {categories.length === 0 && !isLoading && (
            <div className="p-10 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md text-center flex flex-col items-center gap-4">
              <AlertCircle className="w-10 h-10 text-[#94A3B8]" />
              <div>
                <h3 className="text-sm font-bold text-white">No active budgets</h3>
                <p className="text-xs text-[#94A3B8] mt-1">Configure limits to let Baniya alert you on overspending risks.</p>
              </div>
              <button
                onClick={() => setCategories([
                  { id: "1", name: "Rent & Housing", spent: 35000, limit: 35000, color: "bg-emerald-400" },
                  { id: "2", name: "Investments Goal", spent: 150000, limit: 200000, color: "bg-[#3D4FE0]" }
                ])}
                className="px-3 py-1.5 rounded-lg border border-[#3D4FE0]/30 hover:bg-[#3D4FE0]/5 text-xs text-[#CBD5E1] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload Demo Data
              </button>
            </div>
          )}

          {/* Active Allocations Card */}
          {categories.length > 0 && (
            <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-6">
              <h2 className="text-sm font-bold text-white mb-2">Category Allocations</h2>
              <div className="flex flex-col gap-6">
                {categories.map((c) => {
                  const percentage = Math.min((c.spent / c.limit) * 100, 100);
                  const isHighUsage = percentage > 85;
                  return (
                    <div key={c.id} className="flex flex-col gap-2.5 group">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#CBD5E1] flex items-center gap-2">
                          {c.name}
                          {isHighUsage && (
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          )}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#94A3B8] font-mono">
                            ₹{c.spent.toLocaleString("en-IN")} / ₹{c.limit.toLocaleString("en-IN")} ({percentage.toFixed(0)}%)
                          </span>
                          <button
                            onClick={() => handleDeleteBudget(c.id)}
                            className="text-[#94A3B8] hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Delete budget limit"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.6 }}
                          className={`h-full ${isHighUsage ? "bg-rose-500" : c.color}`}
                        />
                      </div>

                      <div className="flex items-center gap-2 pl-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sliders className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <input
                          type="range"
                          min={Math.max(1000, c.spent)}
                          max="250000"
                          step="5000"
                          value={c.limit}
                          onChange={(e) => handleUpdateLimit(c.id, Number(e.target.value))}
                          className="w-40 h-1 bg-white/10 rounded-full appearance-none accent-[#3D4FE0] cursor-pointer"
                        />
                        <span className="text-[9px] text-[#94A3B8]">Slide to Rebalance limit</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar right columns */}
        <div className="flex flex-col gap-6">
          
          {/* Baniya Smart Budget Recommendations */}
          <div className="p-5 rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/5 relative overflow-hidden flex flex-col gap-3">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3D4FE0]/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Baniya Budget Advisory</h3>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              &quot;Food & Dining is at 92% cap capacity with 10 days remaining in the billing period. I recommend allocating ₹5,000 from Travel & Lifestyle's surplus capacity to prevent overshooting.&quot;
            </p>
          </div>

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
