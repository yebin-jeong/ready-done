// OpenAI 클라이언트 초기화
import OpenAI from "openai";

// .env.local에 저장한 키를 가져와서 OpenAI 객체를 만든다.
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
