// 루트 레이아웃
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Ready - Ready, Done.",
    description: "기술 블로그 작성의 막막함을 해소하는 AI 마크다운 초안 생성기",
    url: "https://ready-done-kappa.vercel.app/",
    siteName: "Ready",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Ready 서비스 아이콘",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="lg:overflow-hidden font-sans text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
