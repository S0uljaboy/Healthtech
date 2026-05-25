import type { Metadata } from "next";

import "./globals.css";

import { Inter } from "next/font/google";
import { AppShell } from "@healthtech/ui";
import { AuthProvider } from "@/features/auth/providers/auth-provider";
import { Providers } from "./providers";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { FeedbackWidget } from "@/components/layout/FeedbackWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HealthTech SaaS Platform",
  description: "Mental Health Platform for Schools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        <Providers>
          <AuthProvider>
            <AppShell topbar={<AppTopbar />}>
              {children}
              <FeedbackWidget />
            </AppShell>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
