"use client";

import { useState } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0B1020] border-t border-white/[0.05] pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Statement */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#3D4FE0] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-sans font-bold text-lg text-white">
                Rupee<span className="font-semibold text-white/90">Wise</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Institutional-grade autonomous wealth engines configured to monitor, harvest, and optimize yields globally.
            </p>
          </div>

          {/* Sitemap links Col 1 */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Platform</h4>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#94A3B8]">
              <li><a href="#features" className="hover:text-white transition-colors duration-200">Capabilities</a></li>
              <li><a href="#ai" className="hover:text-white transition-colors duration-200">Baniya Engine</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors duration-200">Subscription Plans</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors duration-200">Technical FAQ</a></li>
            </ul>
          </div>

          {/* Sitemap links Col 2 */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Company</h4>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#94A3B8]">
              <li><a href="#about" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#security" className="hover:text-white transition-colors duration-200">Security Vaults</a></li>
              <li><a href="#press" className="hover:text-white transition-colors duration-200">Press Kit</a></li>
            </ul>
          </div>

          {/* Newsletter Input Box */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest">Advisory Dispatch</h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Subscribe to get Baniya's macro-advisory notes, market allocations, and smart harvesting updates.
            </p>
            {subscribed ? (
              <span className="text-xs font-semibold text-emerald-400">✓ Thank you for subscribing!</span>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-xl border border-white/[0.05] bg-[#050816] text-xs sm:text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#3D4FE0]/80 transition-colors"
                />
                <button
                  type="submit"
                  className="h-11 w-11 rounded-xl bg-[#3D4FE0] text-white flex items-center justify-center hover:scale-105 transition-all"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <hr className="border-white/[0.05] mb-8" />

        {/* Bottom row (Legal & Socials) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="text-xs text-[#94A3B8]">
            &copy; {new Date().getFullYear()} RupeeWise Technologies Pvt Ltd. All rights reserved. SEBI simulated advisory framework.
          </p>

          <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Controls</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
