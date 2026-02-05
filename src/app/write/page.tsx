"use client";

import { useState } from "react";

export default function WritePage() {
  const [topic, setTopic] = useState("");

  return (
    // 전체를 감싸는 컨테이너: 데스크탑일 때 높이를 꽉 채우고 좌우로 배치
    <main className="flex min-h-[calc(100vh-2rem)] flex-col gap-6 p-6 lg:flex-row">
      {/* 1. 입력 섹션 (왼쪽 또는 위쪽) */}
      <section className="flex flex-col rounded-xl border bg-white p-6 shadow-sm lg:w-1/3">
        <div className="mb-6">
          <h2 className="text-xl font-bold">포스팅 생성</h2>
          <p className="text-sm text-gray-500">주제를 입력하면 AI가 글을 작성합니다.</p>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label htmlFor="topic" className="mb-2 block text-sm font-medium text-gray-700">
              블로그 주제
            </label>
            <textarea
              id="topic"
              rows={5}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="예: Next.js 15의 새로운 기능들에 대해 설명해줘"
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button className="w-full rounded-lg bg-black py-4 font-semibold text-white transition-all hover:bg-gray-800">
            포스팅 생성하기
          </button>
        </div>
      </section>

      {/* 2. 결과 섹션 (오른쪽 또는 아래쪽) */}
      <section className="flex flex-1 flex-col rounded-xl border bg-gray-50 p-6 shadow-inner">
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">미리보기</h2>
          <span className="text-xs text-gray-400">Ready, Done. Editor</span>
        </div>

        {/* 실제 글이 들어갈 공간 */}
        <div className="flex-1 overflow-y-auto rounded-lg bg-white p-8 shadow-sm">
          {topic ? (
            <div className="prose prose-slate max-w-none">
              <p className="text-gray-400">AI가 작성한 글이 여기에 표시됩니다...</p>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-300">
              <p>왼쪽에서 주제를 입력하고 생성 버튼을 눌러보세요.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
