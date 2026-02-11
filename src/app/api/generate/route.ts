// OpenAI API 호출 서버 라우트
import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { APIError } from "openai";

interface GenerateResponse {
  title: string;
  content: string;
  hashtags: string[];
  metaDescription: string;
}

export async function POST(req: Request) {
  try {
    const { topic, keywords, style } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `당신은 전문 기술 블로그 작가이자 SEO 전문가입니다. 
          반드시 아래 JSON 형식으로만 응답하세요. 다른 설명은 하지 마세요.

          {
            "title": "SEO에 최적화된 제목",
            "content": "마크다운 본문 (선택한 스타일에 맞는 구조 적용)",
            "hashtags": ["태그1", "태그2", "태그3", "태그4", "태그5"],
            "metaDescription": "SEO용 설명 (160자 이내)"
          }

          [스타일별 본문 구조 가이드]
          1. tutorial: 개요 -> 준비물 -> 단계별 가이드(코드예시 반드시 포함) -> 요약 및 다음 학습 방향
          2. til: 오늘 배운 것 요약 -> 상세 내용(코드예시 반드시 포함) -> 어려웠던 점(겪은 문제와 해결 과정) -> 느낀 점
          3. troubleshooting: 문제 상황 -> 원인 분석 -> 해결 방법(코드예시 반드시 포함) -> 결론(배운 점과 예방법)`,
        },
        {
          role: "user",
          content: `주제: ${topic}, 키워드: ${keywords}, 스타일: ${style}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const rawData = response.choices?.[0]?.message?.content;
    if (!rawData) throw new Error("AI 응답이 비어있습니다.");

    let parsed: GenerateResponse;
    if (typeof rawData === "string") {
      try {
        parsed = JSON.parse(rawData) as GenerateResponse;
      } catch {
        throw new Error("AI 응답 JSON 파싱에 실패했습니다.");
      }
    } else if (typeof rawData === "object") {
      parsed = rawData as GenerateResponse;
    } else {
      throw new Error("AI 응답 형식이 올바르지 않습니다.");
    }

    // 필수 속성 유효성 검사
    if (
      !parsed ||
      typeof parsed.title !== "string" ||
      typeof parsed.content !== "string" ||
      !Array.isArray(parsed.hashtags) ||
      typeof parsed.metaDescription !== "string"
    ) {
      return NextResponse.json({ error: "AI 응답에 필요한 속성이 없습니다." }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    // OpenAI 전용 에러 클래스인지 확인
    if (error instanceof APIError) {
      const status = error.status || 500;
      const message = status === 429 ? "사용량이 너무 많습니다. 잠시 후 다시 시도해주세요." : error.message;
      return NextResponse.json({ error: message }, { status });
    }

    // 일반적인 Error 객체인지 확인
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 그 외 정체불명의 에러
    return NextResponse.json({ error: "알 수 없는 오류 발생" }, { status: 500 });
  }
}
