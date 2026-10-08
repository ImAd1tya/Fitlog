import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "./components/providers/plan-provider";
import Navbar from "./components/shared/Navbar";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Browse workouts and build your plan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="fitlog"
      className={`${inter.variable} ${oswald.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-base-100 font-[family-name:var(--font-inter)] text-base-content antialiased">
        <PlanProvider>
          <Navbar />
          {children}
        </PlanProvider>
      </body>
    </html>
  );
}