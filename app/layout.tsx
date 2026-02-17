import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "FinanceFlow — The Financial Operating System for Modern Companies",
    template: "%s | FinanceFlow",
  },
  description:
    "FinanceFlow is the financial operating system for the next generation of global companies. Streamline your finances with AI-driven analytics, cash flow management, and compliance tools.",
  keywords: ["fintech", "finance software", "cash flow", "financial analytics", "compliance", "FinanceFlow"],
  openGraph: {
    title: "FinanceFlow — The Financial Operating System",
    description: "Streamline your finances with AI-driven analytics, cash flow management, and compliance tools.",
    siteName: "FinanceFlow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased bg-black text-white font-sans`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
