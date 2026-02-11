"use client";

import { useState } from "react";
import InputSection from "@/components/InputSection";
import EditorSection from "@/components/viewer/PreviewSection";
import toast from "react-hot-toast";

// 에러 메시지 추출 헬퍼 함수
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
  const [isLoading, setIsLoading] = useState(false);
  // 1. 에러 상태 추가
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return toast.error("주제를 입력해주세요!", { id: "topic-warn" });
    if (!keywords.trim()) return toast.error("핵심 키워드를 입력해주세요!", { id: "key-warn" });

    setIsLoading(true);
    setResult("");
    setError(null); // 2. 새로 생성 시작 시 이전 에러 초기화

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, keywords, style }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // 서버가 보낸 구체적인 메시지가 있으면 쓰고, 없으면 기본 메시지
        throw new Error(errorData.error || "서버 응답 오류가 발생했습니다.");
      }
      const data = await response.json();

      if (data.content) {
        const formattedHashtags = data.hashtags
          ? (data.hashtags as string[]).map((tag: string) => `#${tag.replace(/\s/g, "")}`).join(" ")
          : "";

        const finalMarkdown = `> 💡 **SEO 요약**: ${data.metaDescription}\n\n# ${data.title}\n\n${data.content}\n\n---\n${formattedHashtags}`;
        setResult(finalMarkdown);
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

        {/* 5. EditorSection에 error와 onRetry 전달 */}
        <EditorSection
          content={result}
          setContent={setResult}
          isLoading={isLoading}
          error={error}
          onRetry={handleGenerate}
        />
      </div>
    </div>
  );
}
