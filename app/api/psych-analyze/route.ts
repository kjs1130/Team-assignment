// emotitype/app/api/psych-analyze/route.ts

console.log('Full process.env:', process.env);

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

console.log('GOOGLE_GEMINI_API_KEY loaded:', !!process.env.GOOGLE_GEMINI_API_KEY);
console.log('GOOGLE_GEMINI_API_KEY value:', process.env.GOOGLE_GEMINI_API_KEY ? '[KEY_LOADED]' : '[NOT_LOADED]');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

// API 키 검증
if (!process.env.GOOGLE_GEMINI_API_KEY) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not configured');
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // 대화 세션 시작
    const chat = model.startChat({
      history: history ? history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })) : [],
    });

    // 시스템 프롬프트 추가
    const systemPrompt = `당신은 심리 상담사입니다. 사용자의 이야기를 듣고 공감하며, 
    마지막에는 "##심리 분석 결과:##"로 시작하는 심리 분석을 제공해주세요. 
    분석은 공감적이고 전문적이어야 합니다.`;

    // 첫 메시지에 시스템 프롬프트 포함
    const result = await chat.sendMessage(`${systemPrompt}\n\n${message}`);
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