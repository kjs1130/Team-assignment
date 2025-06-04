// /app/api/get-activity-suggestions/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { moods, mbti } = await req.json();

  const prompt = `
My current feelings are: ${moods.join(', ')}.
My MBTI type is: ${mbti}.
Please suggest 5 personalized activities that would help me feel better and suit my personality type.
Give the answer as a simple list.
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini Response:', text);

    return NextResponse.json({ recommendations: text || 'No recommendations found.' });
  } catch (error: any) {
    console.error('Error during Gemini API call:', error);
    return NextResponse.json({ recommendations: `Error: ${error?.message || 'Failed to get recommendations.'}` });
  }
}
