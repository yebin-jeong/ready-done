import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

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
          1. tutorial: 개요 -> 준비물 -> 단계별 가이드 -> 요약
          2. til: 오늘 배운 것 요약 -> 상세 내용(코드 포함) -> 어려웠던 점 -> 느낀 점
          3. troubleshooting: 문제 상황 -> 원인 분석 -> 해결 방법 -> 결론`,
        },
        {
          role: "user",
          content: `주제: ${topic}, 키워드: ${keywords}, 스타일: ${style}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const rawData = response.choices[0].message.content;
    if (!rawData) throw new Error("AI 응답이 비어있습니다.");

    // AI가 준 JSON 문자열을 파싱
    return NextResponse.json(JSON.parse(rawData));
  } catch (error: unknown) {
    let message = "오류가 발생했습니다.";
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
