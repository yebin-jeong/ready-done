"use client";

import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <html lang="ko">
      <body className="overflow-hidden font-sans">
        <div className="flex h-screen w-full bg-white text-slate-900 relative">
          {/* 1. 햄버거 버튼 (최상위 레이어 고정) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed left-4 top-4 z-100 p-2.5 focus:outline-none cursor-pointer"
            aria-label="메뉴 토글"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-gray-600"></span>
              <span className="block h-0.5 w-5 bg-gray-600"></span>
              <span className="block h-0.5 w-5 bg-gray-600"></span>
            </div>
          </button>

          {/* 2. 모바일 오버레이 배경 (터치 시 닫기) */}
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-[80] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
          )}

          {/* 3. 사이드바 (데스크탑: 공간 차지 / 모바일: 오버레이) */}
          <aside
            className={`
    ${isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:translate-x-0"}
    fixed lg:relative h-full bg-gray-50 border-r border-slate-100 transition-all duration-300 ease-in-out z-90 flex flex-col overflow-hidden
  `}
          >
            <div className="w-64 p-6 pt-20 flex flex-col h-full justify-between">
              <div>
                <h2 className="text-2xl font-black mb-10 tracking-tighter">
                  Ready<span className="text-orange-500">,</span> Done<span className="text-blue-600">.</span>
                </h2>
                <nav className="space-y-2">
                  <Link
                    href="/"
                    className="block p-3 bg-black text-white rounded-lg text-sm font-medium"
                    onClick={() => {
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }}
                  >
                    글쓰기
                  </Link>
                  <Link
                    href="/posts"
                    className="block p-3 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium"
                    onClick={() => {
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }}
                  >
                    내 포스트
                  </Link>
                </nav>
              </div>
              <div className="text-xs text-gray-400">© 2026 Ready, Done.</div>
            </div>
          </aside>

          {/* 4. 메인 콘텐츠 영역 */}
          <main className="relative flex-1 h-full overflow-hidden bg-white">
            <div className="h-full w-full overflow-y-auto pt-16">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
