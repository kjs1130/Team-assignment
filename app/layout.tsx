import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <div className="min-h-full">
          <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      EmotiType
                    </span>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                    Home
                  </a>
                  <a href="/personality" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                    Personality
                  </a>
                  <a href="/mood" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                    Mood Check
                  </a>
                  <a href="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                    Dashboard
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
