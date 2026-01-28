import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers'
import ContextProvider from '@/context'
import { NetworkValidator } from '@/components/NetworkValidator'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hearst - Real Yield from Bitcoin Mining",
  description: "RWA-backed yield from green Bitcoin mining farms. Tokenized hashrate, sustainable energy, institutional-grade infrastructure.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-slate-50`}
      >
        <ContextProvider cookies={cookies}>
          {children}
          <NetworkValidator />
        </ContextProvider>
      </body>
    </html>
  );
}
