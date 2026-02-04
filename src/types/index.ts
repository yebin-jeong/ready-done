export interface GeneratedPost {
  title: string; // SEO 최적화 제목
  content: string; // 마크다운 형식의 본문
  hashtags: string[]; // 해시태그 배열
  metaDescription: string; // 160자 이내 요약 설명
}
