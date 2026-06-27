"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Plus,
  Trash2,
  Copy,
  RotateCcw,
  Check,
  User,
  ArrowRight,
  TrendingUp,
  Brain,
  MessageSquare,
  Bookmark
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "baniya";
  text: string;
  isStreaming?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

const PRESETS = [
  "Can I afford a ₹15 lakh car?",
  "Build a monthly budget.",
  "Explain SIPs.",
  "Analyse my spending.",
  "Help me save ₹20,000.",
  "Explain this stock."
];

// Personality responses mapped to queries
const RESPONSES: Record<string, string> = {
  car: `Ah, the classic ₹15 Lakh car query. Let's look at the cold hard math before you let that new car smell cloud your judgment.

Based on your monthly surplus of **₹1.2 Lakh** and liquid wealth of **₹28 Lakh**:
1. **Opportunity Cost**: Withdrawing ₹15 Lakh from equity deletes **₹2.1 Lakh** in compounding yields annually (at 14% CAGR). In 10 years, that car actually cost you **₹55 Lakh** in lost wealth. Let that sink in.
2. **Cash Flow Drag**: A standard 5-year loan at 9.5% means an EMI of **₹24,800**, consuming **20.6%** of your monthly surplus. 
3. **Verdict**: If you absolutely must, pay **₹5 Lakh** down, finance the remaining **₹10 Lakh**, and let Baniya rebalance the rest to offset the interest. Don't buy it in cash unless you hate compounding interest.`,

  budget: `Let's construct a monthly budget that doesn't feel like a financial prison but actually works.

Based on your **₹2.8 Lakh** monthly income, here is the Baniya 50-30-20 optimization:
* **50% Needs (₹1,40,000)**: Housing, utilities, and basics. You are currently spending ₹35,000 on rent, which is extremely healthy (12.5% of income).
* **30% Smart Wealth Sweep (₹84,000)**: Direct to equity SIPs and Baniya Liquid Assets. This is non-negotiable if you want to retire before your joints start creaking.
* **20% Lifestyle & Sunk Costs (₹56,000)**: Dining, travel, and gadgets. If you go over this, Baniya will send you daily nagging alerts.`,

  sip: `SIPs (Systematic Investment Plans) are the financial equivalent of brushing your teeth: boring, repetitive, but absolutely vital to avoid decay.

Instead of trying to time the stock market (which even professional fund managers fail at 90% of the time), you invest a fixed amount regularly.
* **Rupee Cost Averaging**: You buy more units when prices are low, and fewer when prices are high.
* **Compounding Magic**: A ₹20,000 monthly SIP at a standard 12% CAGR turns into **₹2.0 Cr** in 20 years. More than half of that is pure interest. Start small, but start today.`,

  spending: `I've audited your transactions. Good news: you aren't bankrupt. Bad news: your discretionary dining out is practically funding your local restaurants.

* **Dining out**: Exceeded your target threshold by **14%** this cycle.
* **Subscription creep**: You have 4 active streaming plans. You can only watch one screen at a time, Tanish. Let's cancel at least two.
* **Saving opportunity**: Sweeping the leakages to arbitrage funds yields an extra **₹4,200** this quarter.`,

  save: `Saving ₹20,000 is easier than you think, but it requires cutting out the low-value leakages.

Here is the Baniya action plan:
1. **Automate the sweep**: Create a recurring rule on RupeeWise to transfer ₹5,000 to Liquid Assets every Friday.
2. **Trim the subscriptions**: Cancel those unused SaaS subscriptions (savings: ₹2,400/mo).
3. **Optimize utility bills**: Switch to yearly payment options for insurance and broadband to harvest upfront discounts.`,

  stock: `Let's dissect this stock. First rule of Baniya club: never buy a stock because someone on a social media forum hyped it up.

Before allocating capital:
* **PE Ratio**: Check if it's trading at a premium compared to historical sector averages.
* **Free Cash Flow**: Ensure the company actually generates real cash, not just creative accounting profits.
* **Recommendation**: Keep individual stock exposure below **10%** of your total equity portfolio. The rest belongs in broad-market indexes.`,

  statement: `I audited the uploaded bank statement. 

1. **Unused Subscriptions**: I found **₹8,900** in active billing renewal plans that have had 0 logged requests over the last 90 days.
2. **Leakage Audit**: Your food & lifestyle spending exceeded caps by **20%**. 
3. **Verdict**: Cancel the unused SaaS trials, and sweep that ₹8,900 to your Emergency Reserves Pool immediately.`,

  monthly: `I've analyzed your June 2026 monthly report. 

* **Savings Rate**: You hit **28.6%**, which is good, but below our **30%** target.
* **Leakage**: You lost ₹8,900 to inactive subscription renewals. 
* **Action**: Sweep the surplus ₹51,600 to your equity mutual funds now.`,

  yearly: `I've audited your FY 2025-26 annual financial reports. 

* **Yield Performance**: Net returns clocked in at **+18.2%**, beating traditional savings deposits by 11%.
* **Rebalancing Sweep**: You successfully swept ₹7.2L to liquid debt pools.
* **Verdict**: Compounding is working. Continue the automated sweeps.`,

  investments: `I've audited your investment portfolios.

* **Asset Allocation**: Equity exposure is at **57.6%**, which aligns with your risk profile.
* **Yield Loss**: You are keeping ₹2,00,000 in cash earning only 3% interest.
* **Verdict**: Execute liquid arbitrage sweeps immediately to harvest standard compounding dividends.`,

  default: `I've analyzed that request. Here is the Baniya advisory view:
  
Always prioritize liquid cash reserves and debt optimization before chasing speculative high-yield assets. Let's set up a rebalance rule to automate this move.`
};

function BaniyaWorkspace() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize first chat session on mount
  useEffect(() => {
    const defaultSession: ChatSession = {
      id: "default-chat",
      title: "Wealth Advisory Suite",
      messages: [
        {
          id: "g1",
          sender: "baniya",
          text: "Good evening, Tanish. I found three opportunities to improve your finances today. Which one would you like to explore first?"
        }
      ]
    };
    setSessions([defaultSession]);
    setActiveSessionId(defaultSession.id);

    // Read search param query e.g. from Dashboard
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      triggerQuery(initialQuery, defaultSession.id);
    }
  }, [searchParams]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, isTyping]);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const triggerQuery = (queryText: string, sessionId: string) => {
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: queryText
    };

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            messages: [...s.messages, userMsg]
          };
        }
        return s;
      })
    );

    setIsTyping(true);

    // Simulate thinking/streaming
    setTimeout(() => {
      setIsTyping(false);
      let responseText = RESPONSES.default;
      const lower = queryText.toLowerCase();

      if (lower.includes("car")) responseText = RESPONSES.car;
      else if (lower.includes("monthly")) responseText = RESPONSES.monthly;
      else if (lower.includes("yearly") || lower.includes("annual")) responseText = RESPONSES.yearly;
      else if (lower.includes("statement")) responseText = RESPONSES.statement;
      else if (lower.includes("investment") || lower.includes("portfolio")) responseText = RESPONSES.investments;
      else if (lower.includes("budget")) responseText = RESPONSES.budget;
      else if (lower.includes("sip")) responseText = RESPONSES.sip;
      else if (lower.includes("spending") || lower.includes("analyse")) responseText = RESPONSES.spending;
      else if (lower.includes("save") || lower.includes("20,000")) responseText = RESPONSES.save;
      else if (lower.includes("stock")) responseText = RESPONSES.stock;

      // Stream the response
      const baniyaMsgId = Math.random().toString();
      const newBaniyaMsg: Message = {
        id: baniyaMsgId,
        sender: "baniya",
        text: "",
        isStreaming: true
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === sessionId) {
            return {
              ...s,
              title: queryText.length > 24 ? queryText.substring(0, 24) + "..." : queryText,
              messages: [...s.messages, newBaniyaMsg]
            };
          }
          return s;
        })
      );

      let currentText = "";
      let charIndex = 0;
      const interval = setInterval(() => {
        if (charIndex < responseText.length) {
          currentText += responseText.charAt(charIndex);
          setSessions((prev) =>
            prev.map((s) => {
              if (s.id === sessionId) {
                return {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === baniyaMsgId ? { ...m, text: currentText } : m
                  )
                };
              }
              return s;
            })
          );
          charIndex += 4; // stream faster for UX polish
        } else {
          clearInterval(interval);
          setSessions((prev) =>
            prev.map((s) => {
              if (s.id === sessionId) {
                return {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === baniyaMsgId ? { ...m, text: responseText, isStreaming: false } : m
                  )
                };
              }
              return s;
            })
          );
        }
      }, 10);
    }, 1200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeSessionId) return;
    triggerQuery(input, activeSessionId);
    setInput("");
  };

  const handleNewChat = () => {
    const newId = Math.random().toString();
    const newSession: ChatSession = {
      id: newId,
      title: "New Advisory Chat",
      messages: [
        {
          id: Math.random().toString(),
          sender: "baniya",
          text: "Let's explore another capital strategy. Lay out the numbers for me."
        }
      ]
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
  };

  const handleClearChat = () => {
    if (!activeSessionId) return;
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [
              {
                id: Math.random().toString(),
                sender: "baniya",
                text: "Session cleared. Let's analyze another allocation plan."
              }
            ]
          };
        }
        return s;
      })
    );
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleRegenerate = (msgIndex: number) => {
    if (!activeSession || msgIndex === 0) return;
    // Find last user query preceding this index
    let lastUserQuery = "";
    for (let i = msgIndex - 1; i >= 0; i--) {
      if (activeSession.messages[i].sender === "user") {
        lastUserQuery = activeSession.messages[i].text;
        break;
      }
    }
    if (!lastUserQuery) return;

    // Remove all messages from index onwards
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: s.messages.slice(0, msgIndex)
          };
        }
        return s;
      })
    );

    triggerQuery(lastUserQuery, activeSessionId);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] border-t border-white/[0.04] bg-[#050816]">
      {/* 1. History Sidebar Pane */}
      <aside className="w-64 border-r border-white/[0.04] bg-[#0B1020]/40 p-4 hidden md:flex flex-col gap-4">
        <button
          onClick={handleNewChat}
          className="w-full h-11 rounded-xl bg-[#3D4FE0] hover:scale-[1.02] active:scale-[0.98] transition-all text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#3D4FE0]/15"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>

        <div className="flex-grow overflow-y-auto flex flex-col gap-1.5 pr-1 scrollbar-thin">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#94A3B8] px-2 mb-1 block">
            Advisory Log
          </span>
          {sessions.map((s) => {
            const isActive = s.id === activeSessionId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSessionId(s.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 group relative ${
                  isActive ? "bg-[#3D4FE0]/10 text-white border-l-2 border-[#3D4FE0]" : "text-[#94A3B8] hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0 text-[#3D4FE0]" />
                <span className="text-xs truncate font-medium">{s.title}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleClearChat}
          className="w-full py-2.5 rounded-xl border border-white/[0.05] hover:bg-rose-500/5 hover:text-rose-400 hover:border-rose-500/20 text-xs font-semibold text-[#CBD5E1] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Clear Current Chat
        </button>
      </aside>

      {/* 2. Chat Terminal Workspace Pane */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Scrollable Conversation area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 scrollbar-thin">
          
          {/* Header Title */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-[#3D4FE0]" />
              Meet Baniya
            </h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-medium uppercase tracking-wider">
              Your brutally honest financial companion.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {activeSession?.messages.map((msg, index) => {
              const isUser = msg.sender === "user";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md ${
                    isUser ? "bg-[#3D4FE0] text-white" : "bg-[#3D4FE0]/15 text-[#3D4FE0] border border-[#3D4FE0]/25"
                  }`}>
                    {isUser ? "T" : <Sparkles className="w-4 h-4 animate-pulse" />}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className={`p-5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-lg ${
                      isUser
                        ? "bg-[#3D4FE0] text-white"
                        : "bg-[#121826]/75 border border-white/[0.04] text-[#CBD5E1] backdrop-blur-md"
                    }`}>
                      {msg.text}
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-4 bg-[#3D4FE0] ml-0.5 animate-pulse" />
                      )}
                    </div>

                    {/* Chat Action Bar */}
                    {!isUser && !msg.isStreaming && (
                      <div className="flex gap-3 px-2">
                        <button
                          onClick={() => handleCopy(msg.text, msg.id)}
                          className="flex items-center gap-1 text-[10px] text-[#94A3B8] hover:text-white transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleRegenerate(index)}
                          className="flex items-center gap-1 text-[10px] text-[#94A3B8] hover:text-white transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Regenerate
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {isTyping && (
              <div className="flex gap-4 mr-auto items-start">
                <div className="w-9 h-9 rounded-xl bg-[#3D4FE0]/15 border border-[#3D4FE0]/25 flex items-center justify-center text-[#3D4FE0]">
                  <Sparkles className="w-4 h-4" />
                </div>
                {/* Premium skeleton loading cards */}
                <div className="flex flex-col gap-2 w-64 md:w-80">
                  <div className="h-4 bg-white/5 rounded-full animate-pulse w-full" />
                  <div className="h-4 bg-white/5 rounded-full animate-pulse w-5/6" />
                  <div className="h-4 bg-white/5 rounded-full animate-pulse w-2/3" />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Prompt presets list */}
        {activeSession?.messages.length <= 1 && (
          <div className="px-6 md:px-8 pb-3 flex flex-wrap gap-2 justify-center max-w-3xl mx-auto z-10">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => triggerQuery(p, activeSessionId)}
                className="text-[11px] font-semibold text-[#CBD5E1] bg-[#121826]/40 hover:bg-[#3D4FE0]/10 border border-white/[0.05] hover:border-[#3D4FE0] px-3.5 py-2 rounded-full transition-all cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-6 border-t border-white/[0.04] bg-[#0B1020]/25 backdrop-blur-md relative z-10 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Lay out your figures, ask a question, or request rebalance rule parameters..."
            className="flex-grow h-12 px-4 rounded-xl border border-white/[0.05] bg-[#050816] text-xs sm:text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#3D4FE0]"
          />
          <button
            type="submit"
            className="h-12 px-6 rounded-xl bg-[#3D4FE0] hover:scale-105 active:scale-95 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#3D4FE0]/25"
          >
            Send Query
            <Send className="w-4 h-4" />
          </button>
        </form>
      </main>
    </div>
  );
}

export default function BaniyaPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#94A3B8]">Loading Baniya Workspace...</div>}>
      <BaniyaWorkspace />
    </Suspense>
  );
}
