"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, AlertCircle, CheckCircle2, TrendingDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Message {
  sender: "user" | "baniya";
  text: string;
  isStreaming?: boolean;
}

export function Baniya() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "user",
      text: "Can I afford a ₹15 lakh car?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [showCharts, setShowCharts] = useState(false);
  const [step, setStep] = useState(0); // 0: Init, 1: Typing, 2: Streaming, 3: Completed
  const containerRef = useRef<HTMLDivElement>(null);

  const fullAnswer = 
    `Based on your current monthly investable surplus of ₹1.2 Lakh and liquid investments of ₹28 Lakh, purchasing a ₹15 Lakh car is feasible, but financially sub-optimal.\n\nHere is your Baniya Advisory Breakdown:\n\n1. Opportunity Cost: Withdrawing ₹15 Lakh from equity deletes ₹2.1 Lakh in annual compounding gains (assuming 14% CAGR).\n2. Cash Flow Impact: A 5-year loan at 9.5% results in an EMI of ₹24,800, consuming 20.6% of your monthly surplus.\n3. Smart Recommendation: Finance ₹10 Lakh, keep ₹18 Lakh compounding, and use ₹5 Lakh as down payment.`;

  const handleStartSimulation = () => {
    // Reset state
    setMessages([
      {
        sender: "user",
        text: "Can I afford a ₹15 lakh car?",
      },
    ]);
    setIsTyping(true);
    setStreamedText("");
    setShowCharts(false);
    setStep(1);
  };

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setStep(2);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullAnswer.length) {
          setStreamedText((prev) => prev + fullAnswer.charAt(index));
          index++;
          // Trigger charts when we reach halfway in the text
          if (index > fullAnswer.length / 3) {
            setShowCharts(true);
          }
        } else {
          clearInterval(interval);
          setStep(3);
        }
      }, 15); // Adjust stream speed
      return () => clearInterval(interval);
    }
  }, [step]);

  // Start the conversation on mount
  useEffect(() => {
    handleStartSimulation();
  }, []);

  return (
    <section id="ai" className="relative py-24 bg-[#050816] px-6">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#3D4FE0]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#3D4FE0] mb-3">
            Autonomous Advisory Engine
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Meet Baniya, Your Wealth Copilot
          </h3>
          <p className="text-[#CBD5E1] max-w-xl mx-auto">
            Interact with the simulated terminal below to see how Baniya computes complex capital allocations in real time.
          </p>
        </div>

        {/* Premium Terminal Widget */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121826]/75 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-[#0B1020] border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3D4FE0]/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-none">Baniya v1.4</div>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Sandbox
                </span>
              </div>
            </div>
            <button
              onClick={handleStartSimulation}
              className="text-xs font-semibold text-[#3D4FE0] hover:text-white transition-colors duration-200 border border-[#3D4FE0]/30 hover:bg-[#3D4FE0]/10 px-3 py-1.5 rounded-lg"
            >
              Restart Simulation
            </button>
          </div>

          {/* Terminal Screen / Messages */}
          <div className="p-6 min-h-[420px] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              {/* User Message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 justify-end"
              >
                <div className="max-w-[80%] rounded-2xl bg-[#3D4FE0] px-4.5 py-3 text-white text-sm shadow-md">
                  Can I afford a ₹15 lakh car?
                </div>
                <div className="w-9 h-9 rounded-full bg-[#121826] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-[#CBD5E1]" />
                </div>
              </motion.div>

              {/* Baniya Message */}
              <div className="flex gap-4 justify-start">
                <div className="w-9 h-9 rounded-full bg-[#3D4FE0]/10 border border-[#3D4FE0]/25 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
                </div>

                <div className="flex-1 max-w-[85%] flex flex-col gap-4">
                  {/* Typing State */}
                  {isTyping && (
                    <div className="flex items-center gap-1 bg-[#0B1020] border border-white/[0.04] p-4 rounded-2xl w-max">
                      <span className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}

                  {/* Reply Content */}
                  {(streamedText || step >= 2) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-2xl border border-white/[0.05] bg-[#0B1020]/90 p-5 text-sm leading-relaxed text-[#CBD5E1] whitespace-pre-line"
                    >
                      {streamedText}
                      {step === 2 && (
                        <span className="inline-block w-1.5 h-4 bg-[#3D4FE0] ml-0.5 animate-pulse" />
                      )}
                    </motion.div>
                  )}

                  {/* Animated Charts / Decision Cards */}
                  <AnimatePresence>
                    {showCharts && (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {/* Downpayment Allocation Progress */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0 }
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="p-4 rounded-xl border border-white/[0.04] bg-[#121826]/60 flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-[#94A3B8] font-medium">Liquidity Allocation</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="text-base font-bold text-white">₹5,00,000 Downpayment</div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "17.8%" }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                              className="bg-[#3D4FE0] h-full"
                            />
                          </div>
                          <span className="text-[10px] text-[#94A3B8] mt-2 block">17.8% of Total Liquid Wealth Used</span>
                        </motion.div>

                        {/* Opportunity Cost Chart */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            show: { opacity: 1, y: 0 }
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="p-4 rounded-xl border border-white/[0.04] bg-[#121826]/60 flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-[#94A3B8] font-medium">Opportunity Cost Loss</span>
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          </div>
                          <div className="text-base font-bold text-white">-₹2,10,000/yr</div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                              className="bg-amber-500 h-full"
                            />
                          </div>
                          <span className="text-[10px] text-[#94A3B8] mt-2 block">If full cash is paid instead of smart financing</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-white/[0.05] pt-4 flex gap-3 items-center w-full">
              <Link
                href="/dashboard/baniya?q=Can I afford a ₹15 lakh car?"
                className="flex-1 h-12 px-4 rounded-xl border border-white/[0.05] bg-[#0B1020]/90 text-sm text-[#94A3B8] flex items-center justify-between hover:border-[#3D4FE0] transition-colors cursor-pointer"
              >
                <span>Can I afford a ₹15 lakh car?</span>
                <Sparkles className="w-4 h-4 text-[#3D4FE0]/80" />
              </Link>
              <Link
                href="/dashboard/baniya?q=Can I afford a ₹15 lakh car?"
                className="h-12 w-12 rounded-xl bg-[#3D4FE0] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
