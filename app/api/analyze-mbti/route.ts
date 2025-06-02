import { NextResponse } from 'next/server';
import OpenAI from 'openai'; // OpenAI 라이브러리 임포트

// 환경 변수에서 API 키 불러오기
// .env.local 파일에 OPENAI_API_KEY=YOUR_KEY 형태로 저장해야 합니다.
const openaiApiKey = process.env.OPENAI_API_KEY;

// API 키 로딩 상태 확인 로그
console.log('--- API Route Init ---');
console.log(`OPENAI_API_KEY is configured: ${!!openaiApiKey}`); // API 키가 로딩되었는지 여부 (값 자체는 노출 X)
console.log('------------------------');

// API 키가 없는 경우 서버 시작 시 또는 호출 시 오류 발생
if (!openaiApiKey) {
   console.error('!!! FATAL ERROR: OpenAI API Key not configured. Please set OPENAI_API_KEY in your .env.local file !!!');
   // 실제 배포 환경에서는 이보다 더 안전한 방법으로 처리해야 합니다.
   // 이 시점에서는 API 호출 자체가 불가능하므로 명확한 오류 메시지 출력
}

// OpenAI 인스턴스 생성
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

export async function POST(request: Request) {
  console.log('--- API Route POST Request Received ---');
  try {
    // 클라이언트에서 보낸 MBTI 결과 받기
    const { mbti } = await request.json();
    console.log(`Received MBTI: ${mbti}`);

    // MBTI 결과가 없으면 오류 응답
    if (!mbti) {
      console.error('Error: MBTI type not provided in request.');
      return NextResponse.json({ error: 'MBTI 유형이 제공되지 않았습니다.' }, { status: 400 });
    }

    // API 키가 설정되지 않았으면 오류 응답 (이 검사는 사실상 위의 초기화 단계에서 먼저 걸러집니다)
    if (!openaiApiKey) {
       console.error('Error: API Key missing during POST handling.');
       return NextResponse.json({ error: '서버 설정 오류: API 키 누락' }, { status: 500 });
    }

    console.log('Attempting to call OpenAI API...');
    // === AI 모델 호출 (OpenAI Chat Completions API 사용 예시) ===
    // 사용하려는 AI 모델과 프롬프트는 여기서 조정할 수 있습니다.
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // TODO: 사용하려는 모델 (예: "gpt-3.5-turbo", "gpt-4")
      messages: [
        // TODO: 시스템 메시지를 조정하여 AI의 역할과 응답 스타일을 정의합니다.
        {"role": "system", "content": "You are a helpful assistant that analyzes MBTI types and provides detailed, warm, and encouraging descriptions and insights. Analyze the given MBTI type in Korean. Provide the analysis in easily readable paragraphs with headings or bullet points using markdown."},
        // TODO: 사용자 메시지를 조정하여 분석 요청 내용을 구체화합니다.
        {"role": "user", "content": `다음 MBTI 유형에 대해 상세하게 분석해줘: ${mbti}. 강점, 약점, 대인 관계 스타일, 업무/학습 스타일, 그리고 개인 성장을 위한 조언 등을 포함해서 친근하고 긍정적인 어조로 설명해줘.`}
      ],
      max_tokens: 800, // TODO: 응답 최대 길이 조절 (필요에 따라 늘리거나 줄일 수 있습니다)
    });
    console.log('OpenAI API call successful.');

    // AI 응답에서 분석 텍스트 추출
    const analysisText = completion.choices[0].message.content;
    console.log('Analysis text extracted.');

    // AI 분석 결과를 웹사이트(클라이언트)로 전송
    console.log('Sending JSON response to client.');
    return NextResponse.json({ analysis: analysisText });

  } catch (error: any) { // 에러 타입을 더 구체적으로 정의할 수 있습니다.
    console.error('--- Error during API Route POST handling ---');
    console.error('Full error details:', error); // 터미널에 상세 오류 출력
    console.error('--------------------------------------------');
    // 클라이언트에는 일반적인 오류 메시지만 반환합니다.
    return NextResponse.json({ error: 'AI 분석 중 오류가 발생했습니다. 서버 로그를 확인하세요.' }, { status: 500 });
  }
} 