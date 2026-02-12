// 클라이언트 레이아웃 쉘 (헤더, 사이드바, 오버레이)
"use client";

import { useState } from "react";
import MenuButton from "@/components/common/MenuButton";
import Logo from "@/components/common/Logo";
import SidebarItem from "@/components/common/SidebarItem";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemeToggle from "@/components/common/ThemeToggle";
import { Toaster } from "react-hot-toast";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "dark:bg-slate-800 dark:text-white",
          duration: 3000,
        }}
      />

      <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-col h-screen w-full relative">
        <header className="h-16 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-950 shrink-0 px-4 lg:px-8 transition-colors">
          <div className="flex items-center gap-4 lg:pl-6 dark:text-white">
            <div className="w-10 lg:hidden" />
            <Logo />
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden relative">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/15 dark:bg-black/40 z-90 transition-opacity duration-500 ease-in-out"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <aside
            className={`
              fixed top-0 left-0 bottom-0 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 
              transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-100 flex flex-col
              ${isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"}
            `}
          >
            <div className="h-16 flex items-center shrink-0">
              <div className="w-16 h-full bg-slate-50/80 dark:bg-slate-900/50 shrink-0" />
            </div>

            <div className="p-6 flex flex-col h-full justify-between">
              <nav className="space-y-1.5">
                <SidebarItem
                  href="/"
                  label="글쓰기"
                  isActive={pathname === "/"}
                  onClick={() => setIsSidebarOpen(false)}
                />
                <SidebarItem
                  href="/posts"
                  label="내 포스트"
                  isActive={pathname === "/posts"}
                  onClick={() => setIsSidebarOpen(false)}
                />
              </nav>

              <div className="px-2">
                <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-tight">
                  © 2026 READY, DONE.
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 h-full overflow-y-auto lg:overflow-hidden bg-slate-100 dark:bg-slate-900 flex justify-center transition-colors">
            <div className="w-full sm:max-w-2xl lg:max-w-7xl px-6 lg:px-12 pb-12 pt-0">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
