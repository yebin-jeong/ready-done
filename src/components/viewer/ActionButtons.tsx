// 복사/저장 버튼 및 마크다운→HTML 변환
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { convertMarkdownToHtml, generateHtmlWrapper } from "@/lib/utils";

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
      const htmlContent = convertMarkdownToHtml(content);
      fileContent = generateHtmlWrapper(htmlContent);
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
