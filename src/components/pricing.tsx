"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    price: "₹0",
    description: "Essential AI budget tracking for individuals starting out.",
    features: [
      "1 Sync Account",
      "Standard Budget Rules",
      "Manual Tax Loss Reports",
      "Baniya Chat Console (10/mo)",
      "Standard Support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "₹1,499",
    suffix: "/month",
    description: "Our core AI-driven wealth advisory suite for active investors.",
    features: [
      "Unlimited Accounts",
      "Autonomous Rebalancing Rules",
      "Tax Harvesting Integration",
      "Uncapped Baniya Chat Advisory",
      "Priority API Syncing",
      "Premium Discord Access",
    ],
    cta: "Upgrade to Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom wealth rules, tax consultation, and multi-member accounts.",
    features: [
      "Everything in Pro",
      "Dedicated Human Advisors",
      "Automated Custom Compliance",
      "SLA Server Priorities",
      "White-Glove Advisory Syncs",
    ],
    cta: "Contact Wealth Desk",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 bg-[#0B1020]/40 border-y border-white/[0.03] px-6">
      {/* Glow overlays */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-3.5 py-1.5 rounded-full border border-[#3D4FE0]/20 bg-[#3D4FE0]/5 text-xs font-semibold text-[#3D4FE0] uppercase tracking-wider mb-4">
            Subscription
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Transparent, Value-Focused Tiers
          </h2>
          <p className="text-base sm:text-lg text-[#CBD5E1] max-w-xl mx-auto">
            Choose the level of automation that fits your capital size and investment targets.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`rounded-2xl p-8 relative flex flex-col justify-between min-h-[520px] transition-all duration-300 ${
                tier.popular
                  ? "bg-[#121826] border-2 border-[#3D4FE0] shadow-xl shadow-[#3D4FE0]/10 scale-105 md:scale-105 z-10"
                  : "glass-panel border border-white/[0.05] hover:border-[#3D4FE0]/30 shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3D4FE0] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              {/* Title & Price */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">{tier.price}</span>
                  {tier.suffix && <span className="text-xs text-[#94A3B8]">{tier.suffix}</span>}
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] mb-6 leading-relaxed">
                  {tier.description}
                </p>

                <hr className="border-white/[0.05] mb-6" />

                {/* Features List */}
                <ul className="flex flex-col gap-3">
                  {tier.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                      <Check className="w-4 h-4 text-[#3D4FE0] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <a
                  href={`#register?plan=${tier.name.toLowerCase()}`}
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                    tier.popular
                      ? "bg-[#3D4FE0] text-white hover:scale-105 shadow-md shadow-[#3D4FE0]/25"
                      : "bg-[#0B1020] border border-white/[0.05] text-[#CBD5E1] hover:bg-white/[0.02]"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
