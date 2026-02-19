// 블로그 스타일별 템플릿 상수
export const TEMPLATES = {
  tutorial: {
    id: "tutorial",
    label: "튜토리얼",
    sub: "Tutorial",
    desc: "단계별 가이드",
    structure: "개요 -> 준비물 -> 단계별 가이드(코드예시 반드시 포함) -> 요약 및 다음 학습 방향",
  },
  til: {
    id: "til",
    label: "TIL",
    sub: "TIL",
    desc: "배운 점 기록",
    structure: "오늘 배운 것 요약 -> 상세 내용(코드예시 반드시 포함) -> 어려웠던 점(겪은 문제와 해결 과정) -> 느낀 점",
  },
  troubleshooting: {
    id: "troubleshooting",
    label: "트러블슈팅",
    sub: "Issue",
    desc: "문제 해결 과정",
    structure: "문제 상황 -> 원인 분석 -> 해결 방법(코드예시 반드시 포함) -> 결론(배운 점과 예방법)",
  },
} as const;

export type TemplateStyle = keyof typeof TEMPLATES;

/** 스타일 선택 UI 옵션 배열 */
export const STYLE_OPTIONS = Object.values(TEMPLATES);

/** AI 블로그 생성 시스템 프롬프트 */
export function generateSystemPrompt(): string {
  const structureGuide = Object.entries(TEMPLATES)
    .map(([_, template]) => `${template.id}: ${template.structure}`)
    .join("\n");

  return `당신은 전문 기술 블로그 작가이자 SEO 전문가입니다. 
반드시 아래 JSON 형식으로만 응답하세요. 다른 설명은 하지 마세요.

[작성 분량 규칙]
- 본문은 최소 1200자 이상 작성하세요.
- 각 섹션은 충분한 설명과 예시를 포함하세요.
- 얕은 요약이 아니라 실무에 도움이 되는 깊이 있는 내용을 작성하세요.

{
  "title": "SEO에 최적화된 제목",
  "content": "마크다운 본문",
  "hashtags": ["태그1", "태그2", "태그3"],
  "metaDescription": "SEO용 설명 (160자 이내)"
}

[스타일별 본문 구조 가이드]
${structureGuide}`;
}
