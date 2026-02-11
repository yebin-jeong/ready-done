// 블로그 스타일별 템플릿 상수
export const TEMPLATES = {
  tutorial: {
    label: "튜토리얼",
    structure: "개요 -> 준비물 -> 단계별 가이드(코드예시 반드시 포함) -> 요약 및 다음 학습 방향",
  },
  til: {
    label: "TIL",
    structure: "오늘 배운 것 요약 -> 상세 내용(코드예시 반드시 포함) -> 어려웠던 점(겪은 문제와 해결 과정) -> 느낀 점",
  },
  troubleshooting: {
    label: "트러블슈팅",
    structure: "문제 상황 -> 원인 분석 -> 해결 방법(코드예시 반드시 포함) -> 결론(배운 점과 예방법)",
  },
} as const;

export type TemplateStyle = keyof typeof TEMPLATES;
