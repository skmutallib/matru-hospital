import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";
import ScrollReveal from "./components/ScrollReveal";
import ScrollControls from "./components/ScrollControls";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mātru Multispeciality Hospital",
  description: "India's first preventive-focused hospital.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">
        <SmoothScroll />
        <ScrollReveal />
        <Preloader />
        <Navbar />
        {children}
        <ScrollControls />
      </body>
    </html>
  );
}
