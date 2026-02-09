"use client";

interface InputSectionProps {
  topic: string;
  setTopic: (val: string) => void;
  keywords: string;
  setKeywords: (val: string) => void;
  style: string;
  setStyle: (val: string) => void;
  onGenerate: () => void;
  disabled: boolean;
}

export default function InputSection({
  topic,
  setTopic,
  keywords,
  setKeywords,
  style,
  setStyle,
  onGenerate,
  disabled,
}: InputSectionProps) {
  return (
    /* 1. 섹션 전체 배경 및 테두리 */
    <section className="w-full lg:w-[40%] p-6 lg:p-10 flex flex-col gap-8 bg-white dark:bg-slate-950 lg:overflow-y-auto custom-scrollbar border-r border-slate-100 dark:border-slate-800 transition-colors">
      <div>
        <h3 className="text-lg font-bold tracking-tight dark:text-slate-100">
          Ready<span className="text-orange-500">,</span>
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">블로그의 뼈대를 구성해주세요.</p>
      </div>

      <div className="flex flex-col gap-7">
        {/* 2. 블로그 주제 입력창 */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-slate-800 dark:text-slate-200 ml-1 transition-colors">
            블로그 주제
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="예: Next.js 15 App Router 설정 방법"
            className="w-full p-4 h-32 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-sm leading-relaxed bg-slate-50/30 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder:text-slate-600"
          />
        </div>

        {/* 3. 핵심 키워드 입력창 */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-slate-800 dark:text-slate-200 ml-1 transition-colors">
            핵심 키워드
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="쉼표로 구분 (예: React, API, 배포)"
            className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm bg-slate-50/30 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder:text-slate-600"
          />
        </div>

        {/* 4. 포스팅 스타일 선택 버튼 */}
        <div className="flex flex-col gap-3">
          <label className="text-[13px] font-bold text-slate-800 dark:text-slate-200 ml-1 transition-colors">
            포스팅 스타일
          </label>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
            {[
              { id: "tutorial", label: "튜토리얼", sub: "Tutorial", desc: "단계별 가이드" },
              { id: "til", label: "TIL", sub: "TIL", desc: "배운 점 기록" },
              { id: "troubleshooting", label: "트러블슈팅", sub: "Issue", desc: "문제 해결 과정" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setStyle(item.id)}
                className={`group flex flex-col lg:flex-row items-center lg:justify-between p-3 lg:p-4 border rounded-2xl transition-all cursor-pointer h-20 lg:h-auto ${
                  style === item.id
                    ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 shadow-md ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-slate-950"
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span
                    className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-wider ${
                      style === item.id ? "text-blue-400 dark:text-blue-100" : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {item.sub}
                  </span>
                  <span
                    className={`text-xs lg:text-sm font-bold leading-tight mt-0.5 ${
                      style === item.id ? "text-white" : "text-slate-900 dark:text-slate-100"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`hidden lg:block text-xs mt-1 ${
                      style === item.id ? "text-slate-400 dark:text-blue-200" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {item.desc}
                  </span>
                </div>
                <div
                  className={`transition-all ${
                    style === item.id
                      ? "bg-blue-500 dark:bg-white rounded-full mt-1 lg:mt-0 w-3 h-1 lg:w-2 lg:h-2"
                      : "bg-transparent w-1 h-1"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 5. 생성 버튼 */}
        <button
          onClick={onGenerate}
          disabled={disabled}
          className={`w-full py-4.5 mb-8 lg:mb-0 rounded-full font-bold transition-all active:scale-[0.98] shadow-xl text-sm tracking-tight font-sans ${
            disabled
              ? "bg-slate-400 dark:bg-slate-700 text-white cursor-not-allowed"
              : "bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 cursor-pointer"
          }`}
        >
          {disabled ? "생성 중..." : "AI 포스팅 생성하기"}
        </button>
      </div>
    </section>
  );
}
