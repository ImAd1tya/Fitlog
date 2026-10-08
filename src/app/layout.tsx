import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { PlanProvider } from "./components/providers/plan-provider";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Browse workouts, build your plan, and log your training. Train hard, log honest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={2200}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}