import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RupeeWise — Premium AI Financial Intelligence",
  description: "Take control of your wealth with Baniya, your autonomous AI financial intelligence copilot. Budget, analyze, and optimize your wealth with state-of-the-art startup intelligence.",
  keywords: ["financial intelligence", "AI finance", "wealth management", "Baniya AI", "RupeeWise", "personal finance"],
  authors: [{ name: "RupeeWise Team" }],
  openGraph: {
    title: "RupeeWise — Premium AI Financial Intelligence",
    description: "Take control of your wealth with Baniya, your autonomous AI financial intelligence copilot.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-primary">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
