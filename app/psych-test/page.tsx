'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function PsychTest() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 대화 메시지가 업데이트될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add initial AI message on component mount
  useEffect(() => {
    setMessages([{ role: 'ai', content: 'Hello! How are you feeling today and what happened?' }]);
  }, []); // Empty dependency array ensures this runs only once on mount

  const sendMessage = async () => {
    if (input.trim() === '' || loading || cooldown || !!analysis) return;

    const userMessage: Message = { role: 'user', content: input };
    // 이전 대화 기록을 Gemini API 역할에 맞게 변환
    // AI의 첫 질문(messages[0])은 history에서 제외합니다.
    const historyForGemini = messages.slice(1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setAnalysis(null);
    setCooldown(true);

    try {
      const response = await fetch('/api/psych-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Gemini API의 history 형식에 맞춰 전송
        body: JSON.stringify({ message: input, history: historyForGemini }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseContent = data.response;
      const isAnalysisResult = data.isAnalysis; // 백엔드에서 추가한 분석 결과 플래그

      if (isAnalysisResult) {
         setAnalysis(aiResponseContent);
         // 분석 완료 메시지를 대화에 추가하고 싶은 경우:
         // setMessages([...newMessages, { role: 'ai', content: '심리 분석 결과가 나왔습니다.'}]);
      } else {
        const aiMessage: Message = { role: 'ai', content: aiResponseContent };
        setMessages([...newMessages, aiMessage]);
      }

    } catch (error) {
      console.error('메시지 전송 오류:', error);
      let errorMessageContent = '메시지를 처리하는 중 오류가 발생했습니다.';
      if (error instanceof Error) {
          errorMessageContent += `: ${error.message}`;
      }
      const errorMessage: Message = { role: 'ai', content: errorMessageContent };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setCooldown(false);
      }, 10000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && input.trim() !== '' && !cooldown && !analysis) {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto w-full bg-white rounded-2xl shadow-xl p-6 flex flex-col flex-grow"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">AI Psychological Chat</h2>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Home
          </Link>
        </div>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Talk briefly with the AI to understand your psychological state.
        </p>

        {/* 대화 영역 */}
        <div className="flex-grow overflow-y-auto border border-gray-200 rounded-lg p-4 mb-6 space-y-4" style={{ maxHeight: '500px' }}>
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none' // User message
                      : 'bg-gray-200 text-gray-800 rounded-bl-none' // AI message
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
             {loading && ( // Loading indicator
                <motion.div
                  key="loading-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="flex justify-start"
                >
                   <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                     AI is thinking...
                   </div>
                </motion.div>
             )}
             <div ref={messagesEndRef} /> {/* Element for auto-scrolling */}
          </AnimatePresence>
        </div>

        {/* 분석 결과 영역 */}
        {analysis && (
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
          >
             <h3 className="text-xl font-semibold text-yellow-700 mb-3">AI Psychological Analysis Result:</h3>
             <p className="text-gray-800 whitespace-pre-wrap">{analysis}</p>
          </motion.div>
        )}

        {/* 입력 영역 */}
        {!analysis && ( // Hide input when analysis result is shown
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={loading ? 'Cannot enter message.' : 'Enter message...'}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                disabled={loading || cooldown || !!analysis}
              />
              <button
                onClick={sendMessage}
                className="flex-shrink-0 px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={loading || input.trim() === '' || cooldown || !!analysis}
              >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
                )}
              </button>
            </div>
        )}

        {analysis && ( // 분석 결과가 나오면 다시 테스트 버튼 표시
             <div className="flex justify-center mt-4">
                 {/* 현재는 분석 결과 후 다시 테스트 기능 없음 */}
                 {/* <button
                     onClick={() => { // 분석 결과 상태 초기화 로직 추가 필요
                         setAnalysis(null);
                         setMessages([]);
                     }}
                     className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                 >
                     다시 테스트하기
                 </button> */}
             </div>
         )}


      </motion.div>
    </div>
  );
}
