import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import ScrollReveal from "./components/ScrollReveal";
import ScrollControls from "./components/ScrollControls";
import CustomCursor from "./components/CustomCursor";

// Body text stays on Inter (neutral, readable). Display/UI headings use
// Geist for a more refined, premium grotesk than the previous Sora.
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
    <html lang="en" className={`${inter.variable} ${GeistSans.variable}`}>
      <body className="min-h-screen">
        <SmoothScroll />
        <ScrollReveal />
        <Navbar />
        {children}
        <Footer />
        <ScrollControls />
        <CustomCursor />
      </body>
    </html>
  );
}
