// 루트 레이아웃
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="lg:overflow-hidden font-sans text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
