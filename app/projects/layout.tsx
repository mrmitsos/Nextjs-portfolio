// app/projects/layout.tsx
"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import ThemeSwitch from "@/components/theme-switch";
import Link from "next/link";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <header className="z-[999] relative">
        <div className="fixed top-0 left-0 right-0 h-[4.5rem] bg-white/80 backdrop-blur-[0.5rem] border-b border-black/5 dark:bg-gray-950/75 dark:border-white/5">
          <nav className="flex items-center justify-between h-full max-w-7xl mx-auto px-4">
            <Link
              href="/#projects"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-950 transition dark:text-gray-300 dark:hover:text-gray-50"
            >
              <HiArrowLeft className="text-xl" />
              <span className="font-medium">Back to Projects</span>
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}