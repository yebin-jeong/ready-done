"use client";

import { useState } from "react";
import InputSection from "@/components/InputSection";
import EditorSection from "@/components/viewer/PreviewSection";

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("tutorial");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!topic) return alert("주제를 입력해주세요!");

    // F002: AI 연동 전 임시 확인용
    setResult(`# ${topic}\n\n키워드: ${keywords}\n스타일: ${style}\n\n글 생성이 완료되었습니다.`);
  };

  return (
    <div className="flex justify-center bg-gray-50 h-auto lg:h-full">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl h-auto lg:h-full lg:overflow-hidden bg-white shadow-sm overflow-hidden border border-slate-200/60">
        {/* 입력 섹션 (Ready) */}
        <InputSection
          topic={topic}
          setTopic={setTopic}
          keywords={keywords}
          setKeywords={setKeywords}
          style={style}
          setStyle={setStyle}
          onGenerate={handleGenerate}
        />

        {/* 편집/뷰어 섹션 (Done) */}
        <EditorSection content={result} setContent={setResult} />
      </div>
    </div>
  );
}
