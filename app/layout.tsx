import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], weight: ["400","500","600","700"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JagX AI - Grok-like Coding Agent",
  description: "Claude-style AI Chat & Coding Agent with Custom Skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-zinc-950 text-white min-h-screen">
        <QueryProvider>
          <SupabaseProvider>
            {children}
            <Toaster position="top-center" richColors />
          </SupabaseProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
