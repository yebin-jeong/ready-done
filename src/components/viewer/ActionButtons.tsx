"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface ActionButtonsProps {
  content: string;
  isLoading: boolean;
}

export default function ActionButtons({ content, isLoading }: ActionButtonsProps) {
  const [showSaveOptions, setShowSaveOptions] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("클립보드에 복사되었습니다!", { id: "copy-success" });
    } catch {
      toast.error("복사에 실패했습니다.");
    }
  };

  const handleDownload = (type: "md" | "html") => {
    const timestamp = Date.now();
    const fileName = `ReadyDone_${timestamp}`;
    let fileContent = content;
    let mimeType = "text/markdown";
    let extension = ".md";

    if (type === "html") {
      // 1. 코드 블록 선행 처리
      let processedContent = content.replace(/```([\s\S]*?)```/gm, (_, p1) => {
        const safeCode = p1.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<pre><code>${safeCode}</code></pre>`;
      });

      // 2. 나머지 요소 변환
      processedContent = processedContent
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/^\s*[\-\*] (.*$)/gim, "<ul><li>$1</li></ul>")
        .replace(/<\/ul>\s*<ul>/g, "")
        .replace(/\n/g, "<br>");

      fileContent = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; line-height: 1.7; max-width: 800px; margin: 40px auto; padding: 20px; color: #334155; }
          h1 { font-size: 2.25rem; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a; }
          h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; color: #1e293b; }
          h3 { font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; }
          blockquote { border-left: 4px solid #3b82f6; background: #eff6ff; padding: 1rem; margin: 1.5rem 0; border-radius: 8px; font-style: italic; }
          pre { background: #1e293b; color: #f8fafc; padding: 1.5rem; border-radius: 12px; overflow-x: auto; font-family: monospace; margin: 1.5rem 0; white-space: pre-wrap; }
          code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; color: #e11d48; }
          pre code { background: transparent; padding: 0; color: inherit; }
          ul { padding-left: 1.5rem; margin: 1rem 0; }
          li { margin-bottom: 0.5rem; list-style-type: disc; }
        </style>
      </head>
      <body>${processedContent}</body>
      </html>`.trim();

      mimeType = "text/html";
      extension = ".html";
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName + extension;
    a.click();
    URL.revokeObjectURL(url);

    setShowSaveOptions(false);
    toast.success(`${extension.toUpperCase()} 저장 완료!`, { id: "save-success" });
  };

  return (
    <div className="flex gap-2 w-full sm:w-auto relative">
      <button
        onClick={handleCopy}
        disabled={!content || isLoading}
        className="flex-1 sm:flex-none px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        복사
      </button>

      <div className="relative flex-1 sm:flex-none">
        <button
          onClick={() => setShowSaveOptions(!showSaveOptions)}
          disabled={!content || isLoading}
          className="w-full px-6 py-2.5 bg-blue-600 border border-blue-600 rounded-xl text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          저장하기
        </button>

        {showSaveOptions && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowSaveOptions(false)} />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => handleDownload("md")}
                className="w-full px-4 py-3.5 text-left text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Markdown (.md) 저장
              </button>
              <button
                onClick={() => handleDownload("html")}
                className="w-full px-4 py-3.5 text-left text-[13px] font-bold text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                HTML (.html) 저장
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
