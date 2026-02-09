"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PostEditor = dynamic(() => import("./PostEditor"), { ssr: false });
const PostViewer = dynamic(() => import("./PostViewer"), { ssr: false });

interface PreviewSectionProps {
  content: string;
  setContent: (val: string) => void;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function PreviewSection({ content, setContent, isLoading, error, onRetry }: PreviewSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="flex-1 lg:w-[60%] flex flex-col min-h-125 lg:h-full lg:overflow-hidden bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <div className="p-6 lg:p-8 lg:pb-4 flex justify-between items-center bg-transparent">
        <div className="hidden sm:block">
          <h3 className="text-lg font-bold tracking-tight dark:text-slate-100">
            Done<span className="text-blue-600">.</span>
          </h3>
          {content && !isLoading && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold mt-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
            >
              {isEditing ? "수정 완료" : "내용 수정하기"}
            </button>
          )}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* 복사 버튼 */}
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm">
            복사
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 border border-blue-600 rounded-xl text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm">
            저장하기
          </button>
        </div>
      </div>

      <div className="flex-1 p-5 lg:p-8 lg:pt-0 lg:overflow-hidden">
        {/* 2. 핵심 콘텐츠 박스 */}
        <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-800 rounded-[40px] shadow-sm overflow-hidden h-full transition-colors">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">AI가 포스팅을 생성하고 있습니다...</p>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
              <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 text-red-500 text-2xl pb-2.5">
                ⚠️
              </div>
              <h4 className="text-slate-800 dark:text-slate-100 font-bold mb-2">문제가 발생했어요</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{error}</p>
              <button
                onClick={onRetry}
                className="px-6 py-2 cursor-pointer text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold hover:text-blue-400 dark:hover:text-blue-300"
              >
                다시 시도하기
              </button>
            </div>
          ) : !content ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 text-blue-500 text-2xl animate-pulse">
                ✨
              </div>
              <p className="text-slate-400 dark:text-slate-500  text-sm font-medium italic">
                Ready, Done. <br /> 당신의 기술 블로그가 여기서 완성됩니다.
              </p>
            </div>
          ) : isEditing ? (
            <PostEditor content={content} onChange={setContent} />
          ) : (
            <div className="h-full overflow-y-auto p-8 lg:p-12 custom-scrollbar">
              <PostViewer content={content} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
