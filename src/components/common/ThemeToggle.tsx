"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return <div className="w-24 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="테마 토글"
      className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 
                 text-[11px] font-bold tracking-tight
                 text-slate-900 dark:text-slate-100  
                 bg-slate-50 dark:bg-slate-900 
                 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
    >
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
