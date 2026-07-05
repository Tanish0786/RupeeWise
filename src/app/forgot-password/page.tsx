"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Mail, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 py-12 sm:p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#3D4FE0]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none">
            <div className="w-10 h-10 rounded-xl bg-[#3D4FE0] flex items-center justify-center shadow-lg shadow-[#3D4FE0]/25 transition-transform duration-300 group-hover:scale-105">
              <TrendingUp className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="font-sans font-bold text-2xl tracking-tight text-white">
              Rupee<span className="font-semibold text-white/90">Wise</span>
            </span>
          </Link>
          <span className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold mt-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3D4FE0]" />
            AI Wealth Platform
          </span>
        </div>

        {/* Card Panel */}
        <div className="glass-panel p-5 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          {success ? (
            <div className="text-center py-4 flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
                <p className="text-xs text-[#94A3B8] leading-relaxed max-w-xs mx-auto">
                  We have sent password reset instructions to <span className="text-white font-semibold">{email}</span>.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#3D4FE0] hover:text-[#3D4FE0]/80 transition-colors mt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-1">Reset Password</h2>
              <p className="text-xs text-[#94A3B8] mb-6">Enter your email and we will send you a reset link.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 rounded-xl">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#CBD5E1]">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/[0.05] bg-[#050816] text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#3D4FE0] transition-colors"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-[#3D4FE0] text-sm font-bold text-white flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#94A3B8] hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
