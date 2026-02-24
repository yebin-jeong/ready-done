// AI 포스팅 생성 서비스의 메인 페이지 컨트롤러
"use client";

import { useState, useEffect } from "react";
import InputSection from "@/components/InputSection";
import PreviewSection from "@/components/viewer/PreviewSection";
import toast from "react-hot-toast";
import { formatGeneratedContent, saveNewPost, updateSavedPosts } from "@/lib/utils";

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "알 수 없는 오류가 발생했습니다.";
}

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("tutorial");
  const [result, setResult] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  useEffect(() => {
    // 마운트 시점에 로컬스토리지 확인
    const tempContent = localStorage.getItem("ready-done-temp-content");
    const tempId = localStorage.getItem("ready-done-temp-id");

    if (tempContent) {
      setResult(tempContent);
      if (tempId) setCurrentPostId(Number(tempId));
    }

    const handleLoadPost = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: number; content: string; hashtags: string[] } | string>;
      if (customEvent.detail) {
        if (typeof customEvent.detail === "string") {
          setResult(customEvent.detail);
          setHashtags([]);
          setCurrentPostId(null);
        } else {
          setResult(customEvent.detail.content);
          setHashtags(customEvent.detail.hashtags || []);
          if (customEvent.detail.id) {
            setCurrentPostId(customEvent.detail.id);
          }
        }
        setError(null);
        toast.success("포스트를 불러왔습니다.");
      }
    };

    const handleResetEditor = () => {
      setTopic("");
      setKeywords("");
      setStyle("tutorial");
      setResult("");
      setHashtags([]);
      setError(null);
      setCurrentPostId(null);
      // 리셋 시 임시 저장소도 비워줌
      localStorage.removeItem("ready-done-temp-content");
      localStorage.removeItem("ready-done-temp-id");
    };

    window.addEventListener("load-post", handleLoadPost);
    window.addEventListener("reset-editor", handleResetEditor);

    return () => {
      window.removeEventListener("load-post", handleLoadPost);
      window.removeEventListener("reset-editor", handleResetEditor);
    };
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return toast.error("주제를 입력해주세요!", { id: "topic-warn" });
    if (!keywords.trim()) return toast.error("핵심 키워드를 입력해주세요!", { id: "key-warn" });

    setIsLoading(true);
    setResult("");
    setHashtags([]);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, keywords, style }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "서버 응답 오류가 발생했습니다.");
      }
      const data = await response.json();

      if (data.content) {
        const finalMarkdown = formatGeneratedContent(data);
        setResult(finalMarkdown);
        setHashtags(data.hashtags);

        const newPost = saveNewPost(data.title, finalMarkdown, data.hashtags);
        setCurrentPostId(newPost.id);
        updateSavedPosts(newPost);
        toast.success("포스팅이 성공적으로 생성되었습니다!");
      }
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-50 h-auto lg:h-full">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl h-auto lg:h-full lg:overflow-hidden bg-white shadow-sm overflow-hidden border border-slate-200/60">
        <InputSection
          topic={topic}
          setTopic={setTopic}
          keywords={keywords}
          setKeywords={setKeywords}
          style={style}
          setStyle={setStyle}
          onGenerate={handleGenerate}
          disabled={isLoading}
        />
        <PreviewSection
          content={result}
          setContent={setResult}
          isLoading={isLoading}
          error={error}
          onRetry={handleGenerate}
          hashtags={hashtags}
          currentPostId={currentPostId}
        />
      </div>
    </div>
  );
}
