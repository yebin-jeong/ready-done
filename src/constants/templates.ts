// 블로그 스타일별 템플릿 상수
export const TEMPLATES = {
  tutorial: {
    label: "튜토리얼",
    structure: "개요 → 사전 준비 → 단계별 설명 → 마무리",
  },
  til: {
    label: "TIL",
    structure: "오늘 배운 것 → 상세 내용 → 어려웠던 점 → 느낀 점",
  },
  troubleshooting: {
    label: "트러블슈팅",
    structure: "문제 상황 → 원인 분석 → 해결 방법 → 결론",
  },
} as const;
