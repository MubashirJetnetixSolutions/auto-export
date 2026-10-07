import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Auto Export Logistics | Vehicle Dispatch & Freight Portal",
  description: "Next generation vehicle dispatch, container shipping, and auto export logistics management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="min-h-screen bg-[#dce5dd] text-[#111615] font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
