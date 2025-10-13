"use client";

import { usePathname } from "next/navigation";
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
    <ThemeContextProvider>
      <ActiveSectionContextProvider>
        {!isProjectDetailPage && <Header />}
        {children}
        {!isProjectDetailPage && <Footer />}
        <Toaster position="top-right" />
      </ActiveSectionContextProvider>
      <ThemeSwitch />
    </ThemeContextProvider>
  );
}