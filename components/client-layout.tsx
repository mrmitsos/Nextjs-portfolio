"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import ActiveSectionContextProvider from "@/context/active-section-context";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProjectDetailPage = pathname?.startsWith("/projects/");

  return (
    <MotionConfig reducedMotion="user">
      <ThemeContextProvider>
        <ActiveSectionContextProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-gray-900 focus:px-5 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          {!isProjectDetailPage && <Header />}
          {children}
          {!isProjectDetailPage && <Footer />}
          <Toaster position="top-right" />
        </ActiveSectionContextProvider>
        <ThemeSwitch />
      </ThemeContextProvider>
    </MotionConfig>
  );
}