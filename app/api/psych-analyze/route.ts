// emotitype/app/api/psych-analyze/route.ts

console.log('Full process.env:', process.env);

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define interface for the request body
interface PsychAnalyzeRequest {
  message: string;
  history?: { role: string; content: string }[]; // history is optional
}

console.log('GEMINI_API_KEY loaded:', !!process.env.GEMINI_API_KEY);
console.log('GEMINI_API_KEY value:', process.env.GEMINI_API_KEY ? '[KEY_LOADED]' : '[NOT_LOADED]');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// API 키 검증
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not configured');
}

export async function POST(request: Request) {
  try {
    // Type the incoming request body
    const { message, history }: PsychAnalyzeRequest = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // 대화 세션 시작
    const chat = model.startChat({
      history: history ? history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })) : [], // eslint-disable-line @typescript-eslint/no-explicit-any
    });

    // Removed unused systemPrompt variable
    // const systemPrompt = `You are a psychological counselor...`;

    // Send only the user's message
    const result = await chat.sendMessage(message);
    const aiResponseContent = result.response.text();

    // 응답 형식 통일
    if (aiResponseContent.includes('##심리 분석 결과:##')) {
      const analysisText = aiResponseContent.replace('##심리 분석 결과:##', '').trim();
      return NextResponse.json({
        response: analysisText,
        isAnalysis: true
      });
    } else {
      return NextResponse.json({
        response: aiResponseContent,
        isAnalysis: false
      });
    }

  } catch (error) {
    console.error('AI 분석 오류:', error);
    
    // 구체적인 에러 메시지 반환
    let errorMessage = 'AI 분석 중 오류가 발생했습니다.';
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'API 키가 올바르지 않습니다. 환경 변수를 확인해주세요.';
      } else if (error.message.includes('quota')) {
        errorMessage = 'API 할당량이 초과되었습니다.';
      } else {
        errorMessage = `오류: ${error.message}`;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}