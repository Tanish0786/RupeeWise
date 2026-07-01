"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  Sparkles
} from "lucide-react";
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
    <div className="min-h-screen w-full flex bg-[#F8FAFC] text-[#0F172A] relative font-sans overflow-x-hidden">
      
      {/* LEFT SIDE: Cinematic Fintech Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F1F5F9] border-r border-[#E2E8F0] relative overflow-hidden flex-col justify-between p-16 select-none">
        
        {/* Soft background grid & premium ambient gradient animation */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        
        {/* Decorative blur elements - strict NO PURPLE (using blue accents #3D4FE0) */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#3D4FE0]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-12 right-12 w-[350px] h-[350px] bg-[#3D4FE0]/5 rounded-full blur-[100px]" />

        {/* Brand Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3D4FE0] to-[#5C6DFF] flex items-center justify-center shadow-lg shadow-[#3D4FE0]/25">
            <TrendingUp className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#0F172A]">
            Rupee<span className="font-medium text-[#64748B]">Wise</span>
          </span>
        </div>

        {/* Center: Dynamic AI Finance Illustration & Copy */}
        <div className="my-auto relative z-10 flex flex-col gap-10 max-w-lg">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#3D4FE0] bg-[#3D4FE0]/10 border border-[#3D4FE0]/20 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Introducing Baniya AI v1.2
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15]">
              The Autonomous <br />
              <span className="bg-gradient-to-r from-[#3D4FE0] to-[#5C6DFF] bg-clip-text text-transparent">Wealth Copilot.</span>
            </h1>
            <p className="text-base text-[#64748B] mt-4 leading-relaxed">
              Meet Baniya, the first self-driving wealth manager designed to audit statements, rebalance reserves, and compile tax harvesting reports autonomously.
            </p>
          </div>

          {/* AI Finance Minimal Visual Representation */}
          <div className="relative w-full h-[220px] rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#3D4FE0]/5 to-transparent rounded-bl-full pointer-events-none" />
            
            {/* Simulation Header */}
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#3D4FE0]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">Autopilot Engine</div>
                  <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Optimization
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#64748B] block uppercase tracking-wider font-semibold">Yield Gain</span>
                <span className="text-sm font-bold text-[#0F172A]">+₹24,850.00</span>
              </div>
            </div>

            {/* Interactive/Animated Transaction Flows */}
            <div className="flex flex-col gap-3 py-3 relative">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center justify-between bg-[#F8FAFC] px-3 py-2 rounded-lg border border-[#E2E8F0]/60"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-[#0F172A]">Bank Statement Audit</span>
                </div>
                <span className="text-[11px] text-[#64748B] font-mono">Found 2 anomalies</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex items-center justify-between bg-[#F8FAFC] px-3 py-2 rounded-lg border border-[#E2E8F0]/60"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3D4FE0]" />
                  <span className="text-xs font-medium text-[#0F172A]">Tax Harvesting Report</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-mono font-semibold">-₹8,920 Tax</span>
              </motion.div>
            </div>
            
            {/* Visual graph line background overlay */}
            <div className="absolute bottom-0 inset-x-0 h-10 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 400 40" fill="none" preserveAspectRatio="none">
                <path d="M0,40 Q80,10 160,25 T320,5 T400,20 L400,40 L0,40 Z" fill="url(#grad)" />
                <path d="M0,40 Q80,10 160,25 T320,5 T400,20" stroke="#3D4FE0" strokeWidth="2" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3D4FE0" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3D4FE0" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Premium features highlights */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[#3D4FE0]/10 text-[#3D4FE0] mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0F172A]">Smart Audit System</h3>
                <p className="text-xs text-[#64748B]">Audits banking records automatically, catching hidden charges.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[#3D4FE0]/10 text-[#3D4FE0] mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0F172A]">Autonomous Rebalancing</h3>
                <p className="text-xs text-[#64748B]">Keeps your capital optimally divided to maximize daily yield.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[#3D4FE0]/10 text-[#3D4FE0] mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0F172A]">SEBI-Compliant Auditing</h3>
                <p className="text-xs text-[#64748B]">Strict adherence to security, simulation, and regulatory practices.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-[#64748B] relative z-10 flex items-center justify-between">
          <span>© 2026 RupeeWise Technologies Pvt Ltd.</span>
          <span className="flex items-center gap-1 hover:text-[#3D4FE0] cursor-pointer">
            System Status <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Core Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 md:p-16 relative bg-[#F8FAFC] min-h-screen">
        
        {/* Soft background blue glow */}
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Mobile Header (Hidden on large screens) */}
        <div className="flex lg:hidden justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3D4FE0] to-[#5C6DFF] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#0F172A]">
              RupeeWise
            </span>
          </div>
        </div>

        {/* Authentication Card (Perfected alignment & larger width) */}
        <div className="my-auto w-full max-w-lg mx-auto flex flex-col gap-8 relative z-10">
          
          {/* Header Title Centered */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {activeTab === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              {activeTab === "signin" 
                ? "Enter your credentials to access the autonomous finance deck." 
                : "Join RupeeWise to start optimizing your cash reserves autonomously."}
            </p>
          </div>

          {/* Core Authenticator Card */}
          <div className="bg-white border border-[#E2E8F0] p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-200/40 flex flex-col gap-8">
            
            {/* Tab Selector */}
            <div className="grid grid-cols-2 bg-[#F1F5F9] p-1 border border-[#E2E8F0] rounded-xl relative">
              <button
                onClick={() => {
                  setActiveTab("signin");
                  setError("");
                }}
                className={`py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-lg cursor-pointer ${
                  activeTab === "signin" 
                    ? "bg-white text-[#0F172A] shadow-sm" 
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                }}
                className={`py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-lg cursor-pointer ${
                  activeTab === "signup" 
                    ? "bg-white text-[#0F172A] shadow-sm" 
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Register
              </button>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {error && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 px-3.5 py-3 rounded-xl font-medium">
                  {error}
                </div>
              )}

              {/* Name Field (Sign Up Only) */}
              <AnimatePresence initial={false}>
                {activeTab === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1.5 overflow-hidden"
                  >
                    <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Full Name</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 z-10 flex items-center pointer-events-none text-[#64748B]">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        style={{ paddingLeft: "3rem" }}
                        className="w-full h-12 pr-4 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]/10 transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 flex items-center pointer-events-none text-[#64748B]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    style={{ paddingLeft: "3rem" }}
                    className="w-full h-12 pr-4 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]/10 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Password</label>
                  {activeTab === "signin" && (
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#0F172A] hover:underline font-bold tracking-tight"
                    >
                      Forgot Password?
                    </Link>
                  )}
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 flex items-center pointer-events-none text-[#64748B]">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
                    className="w-full h-12 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 z-10 flex items-center text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
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
                    className="mt-1 accent-[#0F172A] w-4 h-4 rounded border-[#E2E8F0]"
                  />
                  <label htmlFor="terms" className="text-xs text-[#64748B] leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#0F172A] font-bold hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#0F172A] font-bold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
              )}

              {/* Submit Button (NOT blue, luxury dark slate #0F172A) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-sm font-bold text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer shadow-md shadow-slate-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {activeTab === "signin" ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-1">
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
                className="h-11 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#0F172A] flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-[#CBD5E1] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.54 0-6.423-2.883-6.423-6.423S10.45 5.67 13.99 5.67c1.554 0 2.973.553 4.093 1.472l3.228-3.228C19.267 2.062 16.792 1 13.99 1 7.92 1 3 5.92 3 12s4.92 11 10.99 11c6.33 0 10.51-4.453 10.51-10.714 0-.726-.065-1.282-.145-2H12.24z"/>
                </svg>
                Google
              </button>
              <button
                onClick={() => handleSocialAuth("github")}
                disabled={isLoading}
                className="h-11 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#0F172A] flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-[#CBD5E1] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Skip for Now */}
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-3 rounded-xl border border-dashed border-[#0F172A]/10 hover:border-[#0F172A] text-xs font-bold text-[#0F172A] flex items-center justify-center gap-1.5 cursor-pointer transition-colors bg-slate-50"
            >
              Skip for Now (Explore App)
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

        {/* Desktop-equivalent Mobile Footer */}
        <div className="text-center mt-8 text-xs text-[#64748B]">
          Securely monitored with enterprise grade 256-bit encryption.
        </div>
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
