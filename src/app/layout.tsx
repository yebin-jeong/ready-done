"use client";

import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="ko">
      <body className="overflow-hidden font-sans text-slate-900 bg-white">
        {/* --- 1. 최상위 고정 햄버거 버튼 --- */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed left-0 top-0 z-110 w-16 h-16 flex items-center justify-center cursor-pointer select-none outline-none focus:outline-none group"
          aria-label="메뉴 토글"
        >
          <div className="space-y-1.5 pointer-events-none">
            <span className="block h-0.5 w-5 bg-slate-600 transition-transform duration-500"></span>
            <span className="block h-0.5 w-5 bg-slate-600 transition-transform duration-500"></span>
            <span className="block h-0.5 w-5 bg-slate-600 transition-transform duration-500"></span>
          </div>
        </button>

        <div className="flex flex-col h-screen w-full relative">
          {/* --- 2. 상단 헤더 --- */}
          <header className="h-16 border-b border-slate-100 flex items-center bg-white shrink-0">
            {/* 버튼 영역만큼의 공간  */}
            <div className="w-16 h-full" />
            <h1 className="text-xl font-black tracking-tighter ml-2">
              Ready<span className="text-orange-500">,</span> Done<span className="text-blue-600">.</span>
            </h1>
          </header>

          <div className="flex flex-1 overflow-hidden relative">
            {/* --- 3. 배경 오버레이 --- */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/15 z-90 transition-opacity duration-500 ease-in-out"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* --- 4. 사이드바 --- */}
            <aside
              className={`
                fixed top-0 left-0 bottom-0 bg-white border-r border-slate-100 
                transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-100 flex flex-col
                ${isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"}
              `}
            >
              {/* 사이드바 상단 헤더 영역 */}
              <div className="h-16 flex items-center shrink-0">
                <div className="w-16 h-full bg-slate-50/80 shrink-0" />
              </div>

              {/* 메뉴 리스트 */}
              <div className="p-6 flex flex-col h-full justify-between">
                <nav className="space-y-1.5">
                  <Link
                    href="/"
                    className="flex items-center p-3 bg-slate-900 text-white rounded-xl text-sm font-semibold shadow-sm"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    글쓰기
                  </Link>
                  <Link
                    href="/posts"
                    className="flex items-center p-3 text-slate-600 hover:bg-slate-50 rounded-xl text-sm font-medium transition-colors"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    내 포스트
                  </Link>
                </nav>

                <div className="text-[11px] text-slate-400 font-medium px-2 tracking-tight">© 2026 READY, DONE.</div>
              </div>
            </aside>

            {/* --- 5. 메인 콘텐츠 --- */}
            <main className="flex-1 h-full overflow-y-auto bg-white">
              <div className="max-w-4xl mx-auto p-6 lg:p-12">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
