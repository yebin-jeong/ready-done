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

  const handleGenerate = async () => {
    if (!topic) return alert("주제를 입력해주세요!");

    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, keywords, style }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "알 수 없는 에러가 발생했습니다.");
      }

      // JSON 구조로 데이터 수신
      const data = await response.json();

      /* 기획서 JSON 구조 반영: 
        data.title, data.content, data.hashtags, data.metaDescription 
      */
      if (data.content) {
        // 뷰어에 예쁘게 보여주기 위해 제목, 본문, 해시태그를 마크다운으로 재조
        const formattedHashtags = data.hashtags
          ? data.hashtags.map((tag: string) => `#${tag.replace(/\s/g, "")}`).join(" ")
          : "";

        const finalMarkdown = `# ${data.title}\n\n${data.content}\n\n---\n${formattedHashtags}`;

        setResult(finalMarkdown);

        // F007: SEO 메타 데이터 확인용
        console.log("SEO Meta Description:", data.metaDescription);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Generate Error:", error.message);
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
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

        <EditorSection key={result || "empty"} content={result} setContent={setResult} isLoading={isLoading} />
      </div>
    </div>
  );
}
