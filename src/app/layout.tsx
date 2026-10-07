import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Browse workouts and build your plan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="fitlog"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-base-100 font-[family-name:var(--font-inter)] text-base-content">
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}