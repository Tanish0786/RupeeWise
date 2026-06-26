"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

function StatItem({ value, suffix, label, prefix = "" }: StatItemProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <div ref={ref} className="text-center p-6 flex flex-col items-center">
      <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-3 flex items-baseline">
        <span>{prefix}</span>
        <motion.span>{rounded}</motion.span>
        <span className="text-[#3D4FE0] ml-1">{suffix}</span>
      </div>
      <p className="text-sm sm:text-base text-[#CBD5E1] font-semibold uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export function Statistics() {
  return (
    <section className="relative py-24 bg-[#0B1020]/30 border-y border-white/[0.03] px-6">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <StatItem value={12} prefix="₹" suffix="Cr+" label="Money Analyzed" />
          <StatItem value={98} suffix="%" label="Recommendation Accuracy" />
          <StatItem value={24} suffix="/7" label="AI Availability" />
          <StatItem value={100} suffix="K+" label="Financial Insights" />
        </div>
      </div>
    </section>
  );
}
