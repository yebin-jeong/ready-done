"use client";

import { useState } from "react";
import InputSection from "@/components/InputSection";
import EditorSection from "@/components/viewer/PreviewSection";

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("tutorial");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // 1. 에러 상태 추가
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("주제를 입력해주세요!");
    if (!keywords.trim()) return alert("핵심 키워드를 입력해주세요!");

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
        // 3. API 에러 던지기
        if (response.status === 429) {
          throw new Error("현재 사용량이 너무 많거나 잔액이 부족합니다. 잠시 후 다시 시도해주세요.");
        } else if (response.status === 504) {
          throw new Error("서버 응답 시간이 초과되었습니다. 네트워크를 확인해주세요.");
        } else if (response.status === 400) {
          throw new Error("입력 값이 올바르지 않습니다. 주제와 키워드를 확인해주세요.");
        } else {
          throw new Error(errorData.error || "서버에 문제가 생겼습니다.");
        }
      }

      const data = await response.json();
      console.log("AI 응답 데이터 전체 구조:", data);

      if (data.content) {
        const formattedHashtags = data.hashtags
          ? data.hashtags.map((tag: string) => `#${tag.replace(/\s/g, "")}`).join(" ")
          : "";

        const finalMarkdown = `> 💡 **SEO 요약**: ${data.metaDescription}\n\n# ${data.title}\n\n${data.content}\n\n---\n${formattedHashtags}`;
        setResult(finalMarkdown);
      }
    } catch (error: unknown) {
      // 4. 에러 발생 시 상태 업데이트 (alert 대신 섹션에 표시)
      const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      setError(message);
      console.error("Generate Error:", message);
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
          key={result || error || "empty"}
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
