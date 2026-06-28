"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 relative overflow-hidden bg-brand-bg">
      {/* Background blur bubbles */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#3D4FE0]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Logo & Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none">
            <div className="w-10 h-10 rounded-xl bg-[#3D4FE0] flex items-center justify-center shadow-lg shadow-[#3D4FE0]/25 transition-transform duration-300 group-hover:scale-105">
              <TrendingUp className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="font-sans font-bold text-2xl tracking-tight text-white text-brand-primary">
              Rupee<span className="font-semibold text-white/90">Wise</span>
            </span>
          </Link>
          <span className="text-xs text-[#94A3B8] text-brand-muted uppercase tracking-widest font-semibold mt-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3D4FE0]" />
            AI Wealth Platform
          </span>
        </div>

        {/* Unified Card Container */}
        <div className="glass-panel p-8 rounded-2xl shadow-2xl relative overflow-hidden bg-brand-card border border-white/[0.05]">
          
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 bg-[#050816] bg-brand-bg p-1 border border-white/[0.05] rounded-xl mb-6">
            <button
              onClick={() => {
                setActiveTab("signin");
                setError("");
              }}
              className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "signin" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] text-brand-muted hover:text-white"
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
                activeTab === "signup" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] text-brand-muted hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="text-xl font-bold text-white text-brand-primary mb-1">
            {activeTab === "signin" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-xs text-[#94A3B8] text-brand-muted mb-6">
            {activeTab === "signin"
              ? "Access your autonomous financial command center."
              : "Start your journey with autonomous wealth engines."}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 rounded-xl">
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
                  <label className="text-xs font-semibold text-[#CBD5E1] text-brand-secondary">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8] text-brand-muted">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/[0.05] bg-[#050816] bg-brand-bg text-sm text-white text-brand-primary placeholder-[#94A3B8] focus:outline-none focus:border-[#3D4FE0] transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] text-brand-secondary">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8] text-brand-muted">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/[0.05] bg-[#050816] bg-brand-bg text-sm text-white text-brand-primary placeholder-[#94A3B8] focus:outline-none focus:border-[#3D4FE0] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#CBD5E1] text-brand-secondary">Password</label>
                {activeTab === "signin" && (
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#3D4FE0] hover:underline transition-colors font-semibold"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8] text-brand-muted">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-white/[0.05] bg-[#050816] bg-brand-bg text-sm text-white text-brand-primary placeholder-[#94A3B8] focus:outline-none focus:border-[#3D4FE0] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] text-brand-muted hover:text-white"
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
                <label htmlFor="terms" className="text-[11px] text-[#94A3B8] text-brand-muted leading-relaxed">
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
              className="w-full h-11 rounded-xl bg-[#3D4FE0] text-sm font-bold text-white flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
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
          <div className="relative my-6 flex items-center justify-center">
            <hr className="w-full border-white/[0.05]" />
            <span className="absolute bg-[#121826] bg-brand-card px-3 text-[10px] text-[#94A3B8] text-brand-muted font-bold uppercase tracking-wider">
              Or Continue With
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleSocialAuth("google")}
              disabled={isLoading}
              className="h-10 rounded-xl border border-white/[0.05] bg-[#050816] bg-brand-bg text-xs font-semibold text-white text-brand-primary flex items-center justify-center gap-2 hover:bg-white/[0.02] cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.54 0-6.423-2.883-6.423-6.423S10.45 5.67 13.99 5.67c1.554 0 2.973.553 4.093 1.472l3.228-3.228C19.267 2.062 16.792 1 13.99 1 7.92 1 3 5.92 3 12s4.92 11 10.99 11c6.33 0 10.51-4.453 10.51-10.714 0-.726-.065-1.282-.145-2H12.24z"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialAuth("github")}
              disabled={isLoading}
              className="h-10 rounded-xl border border-white/[0.05] bg-[#050816] bg-brand-bg text-xs font-semibold text-white text-brand-primary flex items-center justify-center gap-2 hover:bg-white/[0.02] cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Action to skip login */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#3D4FE0]/30 hover:border-[#3D4FE0] text-xs font-bold text-[#3D4FE0] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              Skip for Now (Explore App)
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050816] bg-brand-bg flex items-center justify-center text-xs text-[#94A3B8] text-brand-muted">
        Loading Auth Console...
      </div>
    }>
      <AuthWorkspace />
    </Suspense>
  );
}
