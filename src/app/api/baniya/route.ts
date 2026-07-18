import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, profile, history } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    // Format financial data context for the system prompt
    const surplus = profile.monthlyIncome - profile.monthlyExpenses;
    const profileContext = `
USER'S DECLARED FINANCIAL PROFILE:
- Monthly Income: ₹${profile.monthlyIncome.toLocaleString("en-IN")}
- Monthly Expenses: ₹${profile.monthlyExpenses.toLocaleString("en-IN")}
- Monthly Surplus/Deficit: ₹${surplus.toLocaleString("en-IN")}
- Savings (Cash/Bank): ₹${profile.savings.toLocaleString("en-IN")}
- Total Investments: ₹${profile.investments.toLocaleString("en-IN")}
- Liabilities (Debt): ₹${profile.liabilities.toLocaleString("en-IN")}
- Savings/Financial Goal: ${profile.goalName ? `"${profile.goalName}" of ₹${profile.goalAmount.toLocaleString("en-IN")}` : "No goal defined"}

EXPENSES BREAKDOWN:
- Housing: ₹${profile.expenses.housing.toLocaleString("en-IN")}
- Food: ₹${profile.expenses.food.toLocaleString("en-IN")}
- Transport: ₹${profile.expenses.transport.toLocaleString("en-IN")}
- Utilities: ₹${profile.expenses.utilities.toLocaleString("en-IN")}
- Lifestyle: ₹${profile.expenses.lifestyle.toLocaleString("en-IN")}
- Other: ₹${profile.expenses.other.toLocaleString("en-IN")}

INVESTMENT ALLOCATION:
- Equity (Stocks/Mutual Funds): ₹${profile.investmentAllocation.equity.toLocaleString("en-IN")}
- Fixed Income (FD/Bonds): ₹${profile.investmentAllocation.fixedIncome.toLocaleString("en-IN")}
- Cash/Deposits: ₹${profile.investmentAllocation.cash.toLocaleString("en-IN")}
- Other Assets: ₹${profile.investmentAllocation.other.toLocaleString("en-IN")}
`;

    const systemPrompt = `You are Baniya, a highly capable, autonomous, and premium AI financial intelligence advisor.
Your goal is to help the user reason through purchases, savings goals, budgets, debt, and investments.
Always use the user's declared financial profile provided below to ground your reasoning and calculations. Do not invent or assume data that contradicts this profile.

${profileContext}

GUIDELINES:
1. Act as a mathematically rigorous and sound advisor. Calculate loan payments, compounding interest, or opportunity costs when relevant.
2. Maintain a professional, wise, yet direct and friendly tone. Keep formatting clear with bullet points, short paragraphs, or bold text.
3. Keep response sizes concise and readable (typically 2-4 short paragraphs maximum).
4. Always prefix recommendations or major tips with clear action items.
5. If the user asks general definitions (like EMI, SIP, credit score, mutual funds, etc.), explain them briefly in terms of how they relate to the user's current situation.
6. When calculating affordability for a purchase, consider the user's monthly surplus, down payment impact, and emergency fund buffer (3-6 months of expenses).
`;

    // Map history to standard chat completion format
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Groq API responded with status ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I couldn't process that request.";

    return NextResponse.json({ text: reply });
  } catch (error: any) {
    console.error("Baniya API handler error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
