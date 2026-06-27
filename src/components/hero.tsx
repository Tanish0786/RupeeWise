"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, TrendingUp, Shield, Wallet, DollarSign } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Parallax translations
  const card1X = useTransform(mouseX, [-400, 400], [-30, 30]);
  const card1Y = useTransform(mouseY, [-400, 400], [-30, 30]);
  const card2X = useTransform(mouseX, [-400, 400], [20, -20]);
  const card2Y = useTransform(mouseY, [-400, 400], [20, -20]);
  const card3X = useTransform(mouseX, [-400, 400], [-15, 15]);
  const card3Y = useTransform(mouseY, [-400, 400], [25, -25]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-6"
    >
      {/* 1. Aurora Background & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#050816]">
        {/* Deep centered blue/indigo glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[500px] bg-[#3D4FE0]/15 blur-[120px] rounded-full" />
        {/* Animated ambient aurora lines */}
        <div className="absolute inset-0 aurora-bg opacity-30 animate-aurora mix-blend-screen" />
      </div>

      {/* 2. Floating Star Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Sparkle Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
            Autonomous Wealth Management
          </span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-5xl leading-[1.1] mb-6"
        >
          Autonomous AI <br />
          <span className="bg-gradient-to-r from-white via-white to-[#3D4FE0] bg-clip-text text-transparent">
            Financial Intelligence
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#CBD5E1] max-w-2xl font-normal leading-relaxed mb-10"
        >
          Meet Baniya, the first self-driving wealth copilot designed to budget, analyze investments, and make high-yield financial moves autonomously.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            href="#get-started"
            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white overflow-hidden group shadow-lg shadow-[#3D4FE0]/25"
          >
            <span className="absolute inset-0 w-full h-full bg-[#3D4FE0] transition-transform duration-300 group-hover:scale-105" />
            <span className="relative flex items-center gap-2">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            href="#video"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-base font-semibold text-white transition-all duration-300 backdrop-blur-md"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            Watch Product Demo
          </motion.a>
        </motion.div>

        {/* 3. Dashboard Preview and Floating Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl border border-white/[0.08] bg-[#121826]/40 backdrop-blur-md p-4 shadow-2xl shadow-black/80"
        >
          {/* Top Bar of Mock Dashboard */}
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="text-xs text-[#94A3B8] font-mono ml-2">rupeewise-dashboard.v1</span>
            </div>
            <div className="flex gap-2">
              <span className="w-16 h-5 rounded-md bg-[#3D4FE0]/20 border border-[#3D4FE0]/30 text-[10px] text-white flex items-center justify-center font-semibold">
                Baniya Online
              </span>
            </div>
          </div>

          {/* Grid Layout of Mock Dashboard */}
          <div className="grid grid-cols-3 gap-4 h-[calc(100%-3rem)]">
            {/* Left Column: Big Chart */}
            <div className="col-span-2 rounded-xl bg-[#0B1020]/80 border border-white/[0.04] p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">Net Asset Value</span>
                  <h3 className="text-2xl font-bold text-white mt-1">₹42,50,910</h3>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                  +14.2% YoY
                </span>
              </div>

              {/* Sparkline chart SVG */}
              <div className="w-full h-32 mt-4 flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full text-[#3D4FE0]" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,25 Q15,10 30,18 T60,8 T80,12 T100,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,25 Q15,10 30,18 T60,8 T80,12 T100,5 L100,30 L0,30 Z"
                    fill="url(#gradient)"
                  />
                </svg>
              </div>
            </div>

            {/* Right Column: Mini Widgets */}
            <div className="col-span-1 flex flex-col gap-4">
              {/* Asset Allocation Mini Widget */}
              <div className="flex-1 rounded-xl bg-[#0B1020]/80 border border-white/[0.04] p-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#94A3B8] uppercase font-semibold">Risk Engine</span>
                  <div className="text-lg font-bold text-white mt-1">Conservative</div>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#3D4FE0] h-full w-[35%]" />
                </div>
              </div>

              {/* Active Rules Mini Widget */}
              <div className="flex-1 rounded-xl bg-[#0B1020]/80 border border-white/[0.04] p-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#94A3B8] uppercase font-semibold">Active Smart Rules</span>
                  <div className="text-lg font-bold text-white mt-1">8 Auto-Rules</div>
                </div>
                <span className="text-[10px] text-[#94A3B8] font-mono">Next rebalance in 2h 4m</span>
              </div>
            </div>
          </div>

          {/* Floating Parallax Card 1 (Top Left) */}
          <motion.div
            style={{ x: card1X, y: card1Y }}
            className="absolute -top-12 -left-20 w-48 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl border border-white/[0.08] bg-[#121826]/90 backdrop-blur-xl shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3D4FE0]/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#3D4FE0]" />
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Baniya Liquid Assets</span>
              <span className="text-sm font-bold text-white">₹8,12,040</span>
            </div>
          </motion.div>

          {/* Floating Parallax Card 2 (Bottom Right) */}
          <motion.div
            style={{ x: card2X, y: card2Y }}
            className="absolute -bottom-10 -right-20 w-52 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl border border-white/[0.08] bg-[#121826]/90 backdrop-blur-xl shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">AI Portfolio Growth</span>
              <span className="text-sm font-bold text-emerald-400">+₹1,44,910</span>
            </div>
          </motion.div>

          {/* Floating Parallax Card 3 (Top Right) */}
          <motion.div
            style={{ x: card3X, y: card3Y }}
            className="absolute -top-6 -right-28 w-44 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl border border-white/[0.08] bg-[#121826]/90 backdrop-blur-xl shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#3D4FE0]" />
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Smart Protection</span>
              <span className="text-sm font-bold text-white">Guaranteed</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
