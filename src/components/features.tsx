"use client";

import { motion } from "framer-motion";
import { Brain, Compass, PieChart, BarChart3, FileText, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Financial Assistant",
    description: "Your autonomous copilot Baniya constantly monitors and optimizes assets, liquid reserves, and yields.",
  },
  {
    icon: Compass,
    title: "Budget Planner",
    description: "Self-adjusting budgets that dynamically allocate capital according to active market options.",
  },
  {
    icon: PieChart,
    title: "Portfolio Intelligence",
    description: "Consolidated multi-asset dashboard mapping equity, debt, real estate, and digital assets.",
  },
  {
    icon: BarChart3,
    title: "Expense Analytics",
    description: "Zero-effort automated tracking with predictive forecasting and anomaly alerts.",
  },
  {
    icon: FileText,
    title: "Financial Reports",
    description: "Tax-ready detailed performance summaries and smart tax-loss harvesting guides.",
  },
  {
    icon: Sparkles,
    title: "Predictive Insights",
    description: "Machine learning models forecasting monthly cash flows, future growth, and asset goals.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

export function Features() {
  return (
    <section id="features" className="relative py-28 bg-[#0B1020]/40 border-y border-white/[0.03] px-6">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-block px-3.5 py-1.5 rounded-full border border-[#3D4FE0]/20 bg-[#3D4FE0]/5 text-xs font-semibold text-[#3D4FE0] uppercase tracking-wider mb-4"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Engineered for Precision Wealth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed"
          >
            Experience a full suite of autonomous wealth tools built on institutional-grade security.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col items-start text-left group"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#3D4FE0]/10 border border-[#3D4FE0]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#3D4FE0]/20 group-hover:border-[#3D4FE0]/40 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#3D4FE0]" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-glow transition-all duration-300">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed group-hover:text-[#CBD5E1] transition-all duration-300">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
