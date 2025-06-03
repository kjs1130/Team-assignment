import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmotiType - AI-Powered Personality & Mood Companion",
  description: "Explore your personality traits and emotional states with AI-powered insights and support.",
  keywords: "personality, MBTI, emotional intelligence, AI, mood tracking, self-awareness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50`}>
        <Providers>
          <div className="min-h-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
