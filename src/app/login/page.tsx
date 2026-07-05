"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
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
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(() => {
    const tabParam = searchParams.get("tab");
    return tabParam === "register" || tabParam === "signup" ? "signup" : "signin";
  });

  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSocialAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] text-[#0F172A] relative font-sans overflow-x-hidden">
      
      {/* LEFT SIDE: Cinematic Fintech Showcase with Generous Padding */}
      <div
        style={{
          paddingLeft: "clamp(5rem, 8vw, 9rem)",
          paddingRight: "clamp(3rem, 5vw, 6rem)",
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
        className="hidden lg:flex lg:w-1/2 bg-[#F1F5F9] border-r border-[#E2E8F0] relative overflow-hidden flex-col justify-between select-none"
      >
        
        {/* Soft background grid & premium ambient gradient animation */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        
        {/* Decorative blur elements - strict NO PURPLE (using blue accents #3D4FE0) */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#3D4FE0]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-12 right-12 w-[350px] h-[350px] bg-[#3D4FE0]/5 rounded-full blur-[100px]" />

        {/* Brand Header */}
        <div className="flex items-center gap-3 relative z-10">
          <Image src="/icon.png" alt="RupeeWise Logo" width={44} height={44} className="w-11 h-11 rounded-xl shadow-lg shadow-[#3D4FE0]/25 object-cover" priority />
          <span className="font-bold text-2xl tracking-tight text-[#0F172A]">
            Rupee<span className="font-medium text-[#64748B]">Wise</span>
          </span>
        </div>

        {/* Center: Dynamic AI Finance Feature Showcase with Spacious Spacers */}
        <div className="my-auto relative z-10 flex flex-col gap-12 xl:gap-16 max-w-lg">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#3D4FE0] bg-[#3D4FE0]/10 border border-[#3D4FE0]/20 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Autonomous Wealth Platform
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15]">
              The Autonomous <br />
              <span className="bg-gradient-to-r from-[#3D4FE0] to-[#5C6DFF] bg-clip-text text-transparent">Wealth Copilot.</span>
            </h1>
            <p className="text-base text-[#64748B] mt-4 leading-relaxed">
              RupeeWise coordinates your cash flow, tracks statement anomalies, and optimizes capital rebalancing dynamically through state-of-the-art startup financial intelligence.
            </p>
          </div>

          {/* Premium Startup Feature Grid Layout with extra inner padding */}
          <div className="flex flex-col gap-6">
            <div 
              style={{ padding: "1.75rem" }}
              className="group relative bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-300"
            >
              <div className="flex items-start gap-4.5">
                <div className="p-3 rounded-xl bg-[#3D4FE0]/10 text-[#3D4FE0] transition-colors group-hover:bg-[#3D4FE0] group-hover:text-white">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Smart Audit Engine</h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    Audits statements automatically. Flags hidden transaction fees, unexpected banking charges, and subscription leakage.
                  </p>
                </div>
              </div>
            </div>

            <div 
              style={{ padding: "1.75rem" }}
              className="group relative bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-300"
            >
              <div className="flex items-start gap-4.5">
                <div className="p-3 rounded-xl bg-[#3D4FE0]/10 text-[#3D4FE0] transition-colors group-hover:bg-[#3D4FE0] group-hover:text-white">
                  <Zap className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Autonomous Rebalancing</h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    Maximizes interest yields by automatically moving stagnant deposits into high-yield yield buckets and capital funds.
                  </p>
                </div>
              </div>
            </div>

            <div 
              style={{ padding: "1.75rem" }}
              className="group relative bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-300"
            >
              <div className="flex items-start gap-4.5">
                <div className="p-3 rounded-xl bg-[#3D4FE0]/10 text-[#3D4FE0] transition-colors group-hover:bg-[#3D4FE0] group-hover:text-white">
                  <CheckCircle2 className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Simulated Tax Harvesting</h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    Instantly flags capital gains offsetting opportunities, generating tax optimization harvesting reports ahead of cycles.
                  </p>
                </div>
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

      {/* RIGHT SIDE: Authentication Core Container (Spacious Layout) */}
      <div
        className="w-full lg:w-1/2 flex flex-col justify-center items-center relative bg-[#F8FAFC] min-h-screen px-4 sm:px-8 xl:px-16 py-24 lg:py-16 xl:py-20"
      >
        
        {/* Soft background blue glow */}
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Mobile Header (Absolute top positioning for small screens only) */}
        <div className="absolute top-6 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 flex lg:hidden justify-between items-center z-20">
          <div className="flex items-center gap-2">
            <Image src="/icon.png" alt="RupeeWise Logo" width={36} height={36} className="w-9 h-9 rounded-lg shadow-md object-cover" priority />
            <span className="font-bold text-lg tracking-tight text-[#0F172A]">
              RupeeWise
            </span>
          </div>
        </div>

        {/* Authentication Card Wrapper (Bigger gaps & spacing) */}
        <div className="w-full max-w-lg flex flex-col gap-10 xl:gap-12 relative z-10">
          
          {/* Header Title Centered inside the card container scope */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {activeTab === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-[#64748B] mt-2.5">
              {activeTab === "signin" 
                ? "Enter your credentials to access the autonomous finance deck." 
                : "Join RupeeWise to start optimizing your cash reserves autonomously."}
            </p>
          </div>

          {/* Core Authenticator Card (Explicit Large Padding via styles) */}
          <div 
            style={{ padding: "3.5rem" }}
            className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xl shadow-slate-200/40 flex flex-col gap-10"
          >
            
            {/* Tab Selector */}
            <div className="grid grid-cols-2 bg-[#F1F5F9] p-1 border border-[#E2E8F0] rounded-xl relative">
              <button
                onClick={() => {
                  setActiveTab("signin");
                  setError("");
                }}
                style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
                className={`text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-lg cursor-pointer ${
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
                style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
                className={`text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-lg cursor-pointer ${
                  activeTab === "signup" 
                    ? "bg-white text-[#0F172A] shadow-sm" 
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Register
              </button>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
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
                      <span className="absolute left-5 z-10 flex items-center pointer-events-none text-[#64748B]">
                        <User className="w-4.5 h-4.5" />
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        style={{ paddingLeft: "3.5rem", paddingRight: "1rem", height: "3.5rem" }}
                        className="w-full rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]/10 transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-5 z-10 flex items-center pointer-events-none text-[#64748B]">
                    <Mail className="w-4.5 h-4.5" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    style={{ paddingLeft: "3.5rem", paddingRight: "1rem", height: "3.5rem" }}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]/10 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-5 z-10 flex items-center pointer-events-none text-[#64748B]">
                    <Lock className="w-4.5 h-4.5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem", height: "3.5rem" }}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 z-10 flex items-center text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
                {activeTab === "signin" && (
                  <div className="flex justify-end mt-1">
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#64748B] hover:text-[#0F172A] transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                )}
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

              {/* Submit Button (Explicit Spacious Size) */}
              <button
                type="submit"
                disabled={isLoading}
                style={{ height: "3.5rem" }}
                className="w-full rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-sm font-bold text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer shadow-md shadow-slate-200"
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
            <div className="relative flex items-center justify-center my-3">
              <hr className="w-full border-[#E2E8F0]" />
              <span className="absolute bg-white px-3 text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                Or Continue With
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSocialAuth}
                disabled={isLoading}
                style={{ height: "3.25rem" }}
                className="rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#0F172A] flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-[#CBD5E1] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.54 0-6.423-2.883-6.423-6.423S10.45 5.67 13.99 5.67c1.554 0 2.973.553 4.093 1.472l3.228-3.228C19.267 2.062 16.792 1 13.99 1 7.92 1 3 5.92 3 12s4.92 11 10.99 11c6.33 0 10.51-4.453 10.51-10.714 0-.726-.065-1.282-.145-2H12.24z"/>
                </svg>
                Google
              </button>
              <button
                onClick={handleSocialAuth}
                disabled={isLoading}
                style={{ height: "3.25rem" }}
                className="rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#0F172A] flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-[#CBD5E1] transition-all cursor-pointer"
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
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              className="w-full rounded-xl border border-dashed border-[#0F172A]/10 hover:border-[#0F172A] text-xs font-bold text-[#0F172A] flex items-center justify-center gap-1.5 cursor-pointer transition-colors bg-slate-50"
            >
              Skip for Now (Explore App)
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

        {/* Footer (Absolute positioned at the bottom on desktop to avoid displacing the card) */}
        <div className="absolute bottom-6 left-6 right-6 text-center text-xs text-[#64748B] hidden lg:block">
          Securely monitored with enterprise grade 256-bit encryption.
        </div>
        
        {/* Mobile fallback footer */}
        <div className="text-center mt-12 text-xs text-[#64748B] block lg:hidden">
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
