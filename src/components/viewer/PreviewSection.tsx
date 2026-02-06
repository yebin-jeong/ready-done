"use client";

interface EditorSectionProps {
  content: string;
  setContent: (val: string) => void;
}

export default function EditorSection({ content, setContent }: EditorSectionProps) {
  return (
    <section className="flex-1 lg:w-1/2 flex flex-col min-h-125 lg:h-full lg:overflow-hidden bg-slate-50/50">
      <div className="p-6 lg:p-8 lg:pb-4 flex justify-between items-center bg-transparent">
        <div className="hidden sm:block">
          <h3 className="text-lg font-bold tracking-tight">
            Done<span className="text-blue-600">.</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">완성된 결과를 확인해보세요.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer shadow-sm">
            복사
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 border border-blue-600 rounded-xl text-xs font-bold text-white hover:bg-blue-700 transition-all cursor-pointer shadow-sm">
            저장하기
          </button>
        </div>
      </div>

      <div className="flex-1 p-5 lg:p-8 lg:pt-0 lg:overflow-y-auto custom-scrollbar">
        <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm p-8 lg:p-16 min-h-full">
          {content ? (
            /* F004: 내용이 있을 때 (에디터/뷰어) */
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-125 outline-none resize-none prose prose-slate max-w-none text-slate-800"
              placeholder="여기에 글을 작성하거나 수정하세요..."
            />
          ) : (
            /* 초기 상태 */
            <article className="prose prose-slate max-w-none mx-auto h-full flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500 text-2xl animate-pulse">
                  ✨
                </div>
                <p className="text-slate-400 text-sm font-medium italic">
                  Ready, Done. <br />
                  당신의 기술 블로그가 여기서 완성됩니다.
                </p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
