import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { APIError } from "openai";
import { TEMPLATES, generateSystemPrompt } from "@/constants/templates";
import { GeneratedPost } from "@/types/index";

export async function POST(req: Request) {
  try {
    const { topic, keywords, style } = await req.json();

    const selectedStyle = style as keyof typeof TEMPLATES;
    const currentTemplate = TEMPLATES[selectedStyle];

    if (!currentTemplate) {
      return NextResponse.json({ error: "올바르지 않은 포스팅 스타일입니다." }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: generateSystemPrompt(),
        },
        {
          role: "user",
          content: `주제: ${topic}, 키워드: ${keywords}, 스타일: ${currentTemplate.label}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const rawData = response.choices?.[0]?.message?.content;
    if (!rawData) throw new Error("AI 응답이 비어있습니다.");

    const parsed = JSON.parse(rawData) as GeneratedPost;

    if (!parsed.title || !parsed.content || !Array.isArray(parsed.hashtags)) {
      throw new Error("AI 응답에 필요한 속성이 누락되었습니다.");
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Generate API Error:", error);

    //  OpenAI 전용 에러 클래스인지 확인
    if (error instanceof APIError) {
      const status = error.status || 500;
      const message = status === 429 ? "사용량이 너무 많습니다. 잠시 후 다시 시도해주세요." : error.message;
      return NextResponse.json({ error: message }, { status });
    }

    // 일반적인 Error 객체인지 확인
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 정체불명의 에러 처리
    return NextResponse.json({ error: "알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
}
