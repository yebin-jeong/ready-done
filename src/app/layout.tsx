"use client";

import { useState } from "react";
import "./globals.css";
import MenuButton from "@/components/common/MenuButton";
import Logo from "@/components/common/Logo";
import SidebarItem from "@/components/common/SidebarItem";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <html lang="ko">
      <body className="lg:overflow-hidden font-sans text-slate-900 bg-white">
        {/* 1. 최상위 고정 햄버거 버튼 */}
        <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex flex-col h-screen w-full relative">
          {/* 2. 상단 헤더 */}
          <header className="h-16 border-b border-slate-100 flex items-center bg-white shrink-0">
            <div className="w-16 h-full" />
            <Logo />
          </header>

          <div className="flex flex-1 overflow-hidden relative">
            {/* 3. 배경 오버레이 */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/15 z-90 transition-opacity duration-500 ease-in-out"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* 4. 사이드바 */}
            <aside
              className={`
                fixed top-0 left-0 bottom-0 bg-white border-r border-slate-100 
                transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-100 flex flex-col
                ${isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"}
              `}
            >
              <div className="h-16 flex items-center shrink-0">
                <div className="w-16 h-full bg-slate-50/80 shrink-0" />
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

                <div className="text-[11px] text-slate-400 font-medium px-2 tracking-tight">© 2026 READY, DONE.</div>
              </div>
            </aside>

            {/* 5. 메인 콘텐츠 */}
            <main className="flex-1 h-full overflow-y-auto lg:overflow-hidden bg-slate-100 flex justify-center">
              <div className="w-full sm:max-w-2xl lg:max-w-7xl px-6 lg:px-12 pb-12 pt-0">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
