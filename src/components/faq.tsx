"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Is my bank login credential secure with RupeeWise?",
    answer: "Yes, absolutely. We use bank-grade 256-bit AES encryption and integrate through account aggregators licensed directly by the RBI. We never store or hold access to your login credentials or transaction passwords.",
  },
  {
    question: "How does the autonomous rebalancing engine work?",
    answer: "Our engine continually monitors asset price deviations and yield variations. If your equity allocation drifts beyond 5% of your target profile, Baniya calculates tax-loss harvested pathways to rebalance your holdings into fix-income or arbitrage liquid instruments automatically, subject to your approval threshold.",
  },
  {
    question: "Can I set up manual triggers instead of automated rebalancing?",
    answer: "Yes. By default, Baniya works in 'Advisory Sandbox' mode. It sends you a card detailing the trade logic, potential tax impact, and rebalance percentage. Nothing is executed until you press the 'Confirm Harvest' button.",
  },
  {
    question: "Are there any hidden costs or commissions on mutual funds?",
    answer: "No. RupeeWise executes direct mutual fund plans, saving you up to 1.5% in commissions. We charge a simple, transparent subscription model with zero commissions, zero exit load margins, and zero performance commissions.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-white/[0.05] py-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-3 font-semibold text-white hover:text-[#3D4FE0] transition-colors duration-200"
      >
        <span className="text-sm sm:text-base">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#94A3B8] transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#3D4FE0]" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pb-4 pt-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 bg-[#050816] px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3.5 py-1.5 rounded-full border border-[#3D4FE0]/20 bg-[#3D4FE0]/5 text-xs font-semibold text-[#3D4FE0] uppercase tracking-wider mb-4">
            Support Desk
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Frequently Answered Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl">
          {FAQS.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIdx === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
