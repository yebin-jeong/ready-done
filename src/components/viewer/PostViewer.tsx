// AI가 생성한 포스팅 내용을 화면에 출력하는 뷰어 페이지
"use client";

import { useRef, useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";

interface PostViewerProps {
  content: string;
  hashtags?: string[];
}

export default function PostViewer({ content, hashtags = [] }: PostViewerProps) {
  const viewerRef = useRef<Viewer>(null);
  const safeContent = typeof content === "string" ? content : "";

  // 다크모드 대응 커스텀 스타일
  const darkThemeStyles = `
    /* 1. 일반 텍스트 색상 */
    .dark .toastui-editor-contents, 
    .dark .toastui-editor-contents p,
    .dark .toastui-editor-contents li,
    .dark .toastui-editor-contents h1,
    .dark .toastui-editor-contents h2,
    .dark .toastui-editor-contents h3,
    .dark .toastui-editor-contents h4 {
      color: #f8fafc   ; /* slate-50 */
    }

    /* 2. 문장 중간 인라인 코드 */
    .dark .toastui-editor-contents :not(pre) > code {
      background-color: #1e293b; /* slate-800 */
      color: #f1f5f9; /* slate-100 */
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      font-size: 0.9em;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }

    /* 3. 큰 코드 블록 배경 및 테두리 */
    .dark .toastui-editor-contents pre {
      background-color: #0f172a; /* slate-900 */
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 1rem;
    }

    /* 4. Prism 하이라이팅 색상 유지 */
    .dark .toastui-editor-contents pre * {
      color: inherit; 
    }

    /* 주요 Prism 토큰 색상 복구 */
    /* 라이트 모드 프리즘 색상 */
    .token.keyword, .token.operator, .token.selector, .token.property { color: #0077aa; }
    .token.tag, .token.boolean, .token.number { color: #990055; }
    .token.string, .token.attr-value, .token.char { color: #669900; }
    .token.function, .token.class-name { color: #dd4a68; }
    .token.comment { color: #708090; }

    /* 다크 모드일 때만 프리즘 색상을 밝게 오버라이드 */
    .dark .token.tag, 
    .dark .token.keyword, 
    .dark .token.selector,
    .dark .token.property,
    .dark .token.operator { color: #7dd3fc; }

    .dark .token.function,
    .dark .token.class-name { color: #fbbf24; }

    .dark .token.string, 
    .dark .token.attr-value { color: #34d399; }

    .dark .token.comment { color: #64748b; }
    .dark .token.punctuation { color: #94a3b8; }
    .dark .token.boolean,
    .dark .token.number { color: #f472b6; }

    /* 인용문 스타일 */
    .dark .toastui-editor-contents blockquote {
      border-left: 4px solid #334155;
      background-color: #1e293b44;
      color: #94a3b8;
    }
  `;

  useEffect(() => {
    if (viewerRef.current) {
      const instance = viewerRef.current.getInstance();
      instance.setMarkdown(safeContent);
    }
  }, [safeContent]);

  return (
    <div className="flex flex-col gap-6">
      <style>{darkThemeStyles}</style>

      <div className="dark:text-slate-100 toastui-editor-dark">
        <Viewer ref={viewerRef} initialValue={safeContent} plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} />
      </div>

      {/* 해시태그 영역 */}
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
