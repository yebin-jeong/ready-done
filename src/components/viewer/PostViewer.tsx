// Toast UI 기반 마크다운 뷰어 + 해시태그 표시
"use client";

import { useRef, useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

interface PostViewerProps {
  content: string;
  hashtags?: string[];
}

export default function PostViewer({ content, hashtags = [] }: PostViewerProps) {
  const viewerRef = useRef<Viewer>(null);
  // content가 string이 아닐 경우 빈 string으로 처리
  const safeContent = typeof content === "string" ? content : "";

  // content가 변경되면 Viewer의 내용도 업데이트
  useEffect(() => {
    if (viewerRef.current) {
      const instance = viewerRef.current.getInstance();
      instance.setMarkdown(safeContent);
    }
  }, [safeContent]);

  return (
    <div className="dark:text-slate-100 flex flex-col gap-6">
      <Viewer ref={viewerRef} initialValue={safeContent} plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} />

      {/* 해시태그 표시 */}
      {hashtags.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-700/50"
              >
                <span className="text-sm">🏷️</span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
