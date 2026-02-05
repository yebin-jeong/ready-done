// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen">
          {/* 사이드바 영역 */}
          <aside className="w-64 border-r bg-gray-50 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-8">Ready, Done.</h2>
              <nav className="space-y-2">
                <a href="/write" className="block p-2 bg-black text-white rounded-md text-sm">
                  글쓰기
                </a>
                <a href="/posts" className="block p-2 text-gray-600 hover:bg-gray-200 rounded-md text-sm">
                  내 포스트
                </a>
              </nav>
            </div>
            <div className="text-xs text-gray-400">© 2026 Ready, Done.</div>
          </aside>

          {/* 메인 콘텐츠 영역 (여기에 page.tsx들) */}
          <main className="flex-1 bg-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
