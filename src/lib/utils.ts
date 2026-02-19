// 유틸리티 함수들
import { SavedPost } from "@/types";
import { GeneratedPost } from "@/types";

/**
 * Markdown을 간단한 HTML로 변환
 */
export function convertMarkdownToHtml(markdown: string): string {
  let html = markdown;
  html = html.replace(/```(\w+)?([\s\S]*?)```/gm, (_, lang, code) => {
    const safecode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
    const languageClass = lang ? `class="language-${lang}"` : "";
    return `<pre><code ${languageClass}>${safecode}</code></pre>`;
  });

  // 코드블록 (```...```)
  html = html.replace(/```([\s\S]*?)```/gm, (_, code) => {
    const safecode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<pre><code>${safecode}</code></pre>`;
  });

  // 제목 (# ## ###)
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // 인라인 코드 (`...`)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // 인용문 (> ...)
  html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");

  // 리스트 (- * ...)
  html = html.replace(/^\s*[-*] (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(\n)?<li>(.*?)<\/li>/g, "<ul><li>$2</li></ul>");
  html = html.replace(/<\/ul>\s*<ul>/g, "");

  // 줄바꿈
  html = html.replace(/\n/g, "<br>");

  return html;
}

/**
 * HTML 테이블 생성 헬퍼
 */
export function generateHtmlWrapper(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
          line-height: 1.7; 
          max-width: 800px; 
          margin: 40px auto; 
          padding: 20px; 
          color: #334155; 
        }
        h1 { font-size: 2.25rem; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a; }
        h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; color: #1e293b; }
        h3 { font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; }
        blockquote { border-left: 4px solid #3b82f6; background: #eff6ff; padding: 1rem; margin: 1.5rem 0; border-radius: 8px; font-style: italic; }
        pre { background: #1e293b; color: #f8fafc; padding: 1.5rem; border-radius: 12px; overflow-x: auto; font-family: 'Fira Code', monospace; margin: 1.5rem 0; white-space: pre-wrap; }
        code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: 'Fira Code', monospace; color: #e11d48; }
        pre code { background: transparent; padding: 0; color: inherit; }
        ul { padding-left: 1.5rem; margin: 1rem 0; }
        li { margin-bottom: 0.5rem; list-style-type: disc; }
      </style>
    </head>
    <body>${content}</body>
    </html>
  `.trim();
}

/**
 * AI 생성 결과를 마크다운으로 포매팅 (해시태그 제외)
 */
export function formatGeneratedContent(data: GeneratedPost): string {
  return `> 💡 **SEO 요약**: ${data.metaDescription}\n\n# ${data.title}\n\n${data.content}`;
}

/**
 * 새로운 포스트 생성 및 저장
 */
export function saveNewPost(title: string, content: string, hashtags: string[] = []): SavedPost {
  return {
    id: Date.now(),
    title: title.trim() || "제목 없는 포스트",
    content,
    hashtags: hashtags.map((tag: string) => tag.replace(/\s/g, "")),
    createdAt: new Date().toISOString(),
  };
}

/**
 * 저장된 포스트 목록 업데이트 (최대 10개 유지)
 */
export function updateSavedPosts(newPost: SavedPost): void {
  const existingPosts: SavedPost[] = JSON.parse(localStorage.getItem("ready-done-posts") || "[]");
  const updatedPosts = [newPost, ...existingPosts].slice(0, 10);
  localStorage.setItem("ready-done-posts", JSON.stringify(updatedPosts));
}
