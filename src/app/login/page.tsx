"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

function AuthWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Switch between "signin" and "signup"
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync tab status with query parameter if present
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "register" || tabParam === "signup") {
      setActiveTab("signup");
    } else {
      setActiveTab("signin");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation checks
    if (activeTab === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (activeTab === "signup" && !terms) {
      setError("You must agree to the Terms of Service.");
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleSocialAuth = (platform: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-[#0F172A] relative overflow-hidden font-sans">
      
      {/* LEFT SIDE: Cinematic fintech showcase (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F1F5F9] border-r border-[#E2E8F0] relative overflow-hidden flex-col justify-between p-12">
        {/* Soft floating grids/motion patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#3D4FE0]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#3D4FE0]/5 rounded-full blur-[100px]" />

        {/* Branding header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#3D4FE0] flex items-center justify-center shadow-lg shadow-[#3D4FE0]/25">
            <TrendingUp className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#0F172A]">
            Rupee<span className="font-medium text-[#64748B]">Wise</span>
          </span>
        </div>

        {/* Value proposition & illustrations */}
        <div className="my-auto relative z-10 flex flex-col gap-8 max-w-lg">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#3D4FE0] bg-[#3D4FE0]/10 px-3 py-1 rounded-full">
              Version 1.0 Release
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] mt-4 leading-tight">
              The Autonomous Wealth Copilot.
            </h1>
            <p className="text-sm text-[#64748B] mt-3 leading-relaxed">
              Meet Baniya, the first self-driving wealth manager designed to audit statements, rebalance reserves, and compile tax harvesting reports autonomously.
            </p>
          </div>

          {/* Premium Feature Highlights */}
          <div className="flex flex-col gap-5 mt-2">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-[#3D4FE0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Contextual AI Auditing</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">Baniya parses bank statement sheets to flag unused subscriptions and dining leaks.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-[#3D4FE0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-4 h-4 text-[#3D4FE0]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">One-Click Asset sweeps</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">Automate arbitrage rules to rotate idle cash into liquid dividend pools.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-[#3D4FE0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#3D4FE0]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Premium Analytics Ledger</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">Track real-time allocations, visual SVG charts, and interactive goals progress.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-[#64748B] relative z-10">
          © 2026 RupeeWise Technologies Pvt Ltd. SEBI simulated advisory framework.
        </div>
      </div>

      {/* RIGHT SIDE: Centered premium authentication card (takes full viewport on mobile) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#F8FAFC]">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#3D4FE0]/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10 flex flex-col gap-6"
        >
          {/* Mobile-only branding header */}
          <div className="flex lg:hidden flex-col items-center mb-4 text-center">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3D4FE0] flex items-center justify-center shadow-lg shadow-[#3D4FE0]/25">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#0F172A]">
                RupeeWise
              </span>
            </Link>
          </div>

          {/* Centered card panel */}
          <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col gap-6">
            
            {/* Tab selector */}
            <div className="grid grid-cols-2 bg-[#F1F5F9] p-1 border border-[#E2E8F0] rounded-xl">
              <button
                onClick={() => {
                  setActiveTab("signin");
                  setError("");
                }}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "signin" ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                }}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "signup" ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Register
              </button>
            </div>

            {/* Header titles */}
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                {activeTab === "signin" ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                {activeTab === "signin"
                  ? "Access your autonomous financial command center."
                  : "Start your journey with autonomous wealth engines."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 px-3.5 py-2.5 rounded-xl">
                  {error}
                </div>
              )}

              {/* Name Field (Sign Up Only) */}
              <AnimatePresence>
                {activeTab === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-1.5 overflow-hidden"
                  >
                    <label className="text-xs font-semibold text-[#0F172A]">Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#3D4FE0] transition-colors"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#3D4FE0] transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#0F172A]">Password</label>
                  {activeTab === "signin" && (
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#3D4FE0] hover:underline font-semibold"
                    >
                      Forgot Password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#3D4FE0] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms checkbox (Sign Up Only) */}
              {activeTab === "signup" && (
                <div className="flex items-start gap-2.5 mt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-[11px] text-[#64748B] leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#3D4FE0] font-semibold hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#3D4FE0] font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-[#3D4FE0] text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-[#3D4FE0]/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {activeTab === "signin" ? "Sign In" : "Get Started"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <hr className="w-full border-[#E2E8F0]" />
              <span className="absolute bg-white px-3 text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                Or Continue With
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialAuth("google")}
                disabled={isLoading}
                className="h-10 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.54 0-6.423-2.883-6.423-6.423S10.45 5.67 13.99 5.67c1.554 0 2.973.553 4.093 1.472l3.228-3.228C19.267 2.062 16.792 1 13.99 1 7.92 1 3 5.92 3 12s4.92 11 10.99 11c6.33 0 10.51-4.453 10.51-10.714 0-.726-.065-1.282-.145-2H12.24z"/>
                </svg>
                Google
              </button>
              <button
                onClick={() => handleSocialAuth("github")}
                disabled={isLoading}
                className="h-10 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Action to skip login */}
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#3D4FE0]/30 hover:border-[#3D4FE0] text-xs font-bold text-[#3D4FE0] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              Skip for Now (Explore App)
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </motion.div>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-xs text-[#64748B]">
        Loading Auth Console...
      </div>
    }>
      <AuthWorkspace />
    </Suspense>
  );
}
