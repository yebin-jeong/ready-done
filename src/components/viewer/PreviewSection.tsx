// 생성 결과 미리보기 영역
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ActionButtons from "./ActionButtons";
import { updateSavedPosts } from "@/lib/utils";
import toast from "react-hot-toast";

const PostEditor = dynamic(() => import("./PostEditor"), { ssr: false });
const PostViewer = dynamic(() => import("./PostViewer"), { ssr: false });

interface PreviewSectionProps {
  content: string;
  setContent: (val: string) => void;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  hashtags?: string[];
  currentPostId: number | null;
}

export default function PreviewSection({
  content,
  setContent,
  isLoading,
  error,
  onRetry,
  hashtags = [],
  currentPostId,
}: PreviewSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  // 1. 실시간 백업
  useEffect(() => {
    if (content && !isLoading) {
      localStorage.setItem("ready-done-temp-content", content);
      if (currentPostId) {
        localStorage.setItem("ready-done-temp-id", currentPostId.toString());
      }
    }
  }, [content, isLoading, currentPostId]);

  // 2. 수정 중 실수로 새로고침하는 것을 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditing) {
        e.preventDefault();
        return "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isEditing]);

  // 3. 수정 완료 및 목록 업데이트 핸들러
  const handleFinishEditing = () => {
    if (isEditing) {
      // 제목 추출 (마크다운 첫 줄의 # 제목 형태를 파싱)
      const titleMatch = content.match(/^#\s+(.*)$/m);
      const title = titleMatch ? titleMatch[1] : "수정된 포스트";

      const updatedPost = {
        id: currentPostId || Date.now(), // 부모에게 받은 원본 ID 유지 (없으면 생성)
        title: title,
        content: content,
        hashtags: hashtags,
        createdAt: new Date().toISOString(),
      };

      updateSavedPosts(updatedPost);
      localStorage.removeItem("ready-done-temp-content");
      localStorage.removeItem("ready-done-temp-id");
      toast.success("수정 내용이 목록에 반영되었습니다.");
    }
    setIsEditing(!isEditing);
  };

  return (
    <section className="flex-1 lg:w-[60%] flex flex-col min-h-125 lg:h-full lg:overflow-hidden bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <div className="p-6 lg:p-8 lg:pb-4 flex justify-between items-center bg-transparent">
        <div className="hidden sm:block">
          <h3 className="text-lg font-bold tracking-tight dark:text-slate-100">
            Done<span className="text-blue-600">.</span>
          </h3>
          {content && !isLoading && (
            <button
              onClick={handleFinishEditing}
              className="text-xs font-bold mt-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
            >
              {isEditing ? "수정 완료" : "내용 수정하기"}
            </button>
          )}
        </div>
        <ActionButtons content={content} isLoading={isLoading} />
      </div>

      <div className="flex-1 p-5 lg:p-8 lg:pt-0 lg:overflow-hidden">
        {/* 핵심 콘텐츠 박스 */}
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
            <div className="h-full overflow-y-auto p-8 lg:p-12 custom-scrollbar flex flex-col">
              <PostViewer content={content} hashtags={hashtags} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
