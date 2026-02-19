// API 응답 및 데이터 타입 정의
export interface GeneratedPost {
  title: string;
  content: string;
  hashtags: string[];
  metaDescription: string; // 160자 이내 요약 설명
}

export interface SavedPost {
  id: number;
  title: string;
  content: string;
  hashtags: string[];
  createdAt: string;
}
