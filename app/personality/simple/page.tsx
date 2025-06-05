'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { } from '@heroicons/react/24/outline'

const questions = [
  {
    id: 1,
    question: "친구들과 함께 있을 때 당신은?",
    options: [
      { value: "extrovert", label: "대화를 이끌고 분위기를 만드는 편이다" },
      { value: "introvert", label: "조용히 듣고 관찰하는 편이다" }
    ]
  },
  {
    id: 2,
    question: "문제가 생겼을 때 당신은?",
    options: [
      { value: "thinking", label: "논리적으로 분석하고 해결책을 찾는다" },
      { value: "feeling", label: "감정에 따라 직관적으로 해결한다" }
    ]
  },
  {
    id: 3,
    question: "새로운 일을 시작할 때 당신은?",
    options: [
      { value: "planning", label: "계획을 세우고 차근차근 진행한다" },
      { value: "spontaneous", label: "즉흥적으로 시작하고 상황에 맞춰 진행한다" }
    ]
  }
]

const personalityTypes = {
  extrovert_thinking_planning: {
    title: "리더형",
    description: "당신은 논리적이고 계획적인 리더십을 가진 사람입니다. 목표를 명확히 설정하고 체계적으로 실행하는 능력이 뛰어납니다.",
    traits: ["논리적", "계획적", "리더십", "체계적", "결단력"]
  },
  extrovert_thinking_spontaneous: {
    title: "도전형",
    description: "당신은 적응력이 뛰어나고 새로운 상황을 즐기는 사람입니다. 문제 해결 능력이 뛰어나며 위기 상황에서도 침착하게 대처합니다.",
    traits: ["적응력", "도전정신", "문제해결력", "유연성", "침착함"]
  },
  extrovert_feeling_planning: {
    title: "소통형",
    description: "당신은 따뜻한 마음과 계획적인 성격을 가진 사람입니다. 다른 사람들과의 관계를 중요시하며, 체계적으로 일을 진행합니다.",
    traits: ["공감능력", "계획성", "사교성", "배려심", "책임감"]
  },
  extrovert_feeling_spontaneous: {
    title: "활동형",
    description: "당신은 에너지 넘치고 창의적인 사람입니다. 새로운 아이디어를 잘 떠올리며, 사람들과 함께하는 것을 즐깁니다.",
    traits: ["창의성", "활동성", "사교성", "낙천적", "적응력"]
  },
  introvert_thinking_planning: {
    title: "분석형",
    description: "당신은 깊이 있는 사고와 체계적인 접근을 하는 사람입니다. 문제를 꼼꼼히 분석하고 최선의 해결책을 찾아냅니다.",
    traits: ["분석력", "집중력", "체계성", "독창성", "신중함"]
  },
  introvert_thinking_spontaneous: {
    title: "탐구형",
    description: "당신은 독창적이고 깊이 있는 사고를 하는 사람입니다. 새로운 아이디어를 탐구하고 실험하는 것을 즐깁니다.",
    traits: ["독창성", "탐구심", "분석력", "창의성", "집중력"]
  },
  introvert_feeling_planning: {
    title: "조화형",
    description: "당신은 따뜻한 마음과 체계적인 성격을 가진 사람입니다. 깊이 있는 관계를 중요시하며, 계획적으로 일을 진행합니다.",
    traits: ["공감능력", "계획성", "신중함", "배려심", "책임감"]
  },
  introvert_feeling_spontaneous: {
    title: "예술형",
    description: "당신은 감성적이고 창의적인 사람입니다. 깊이 있는 통찰력과 예술적 감각을 가지고 있습니다.",
    traits: ["감성", "창의성", "통찰력", "예술성", "독창성"]
  }
}

export default function SimplePersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion + 1]: value }))
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const restartTest = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const getPersonalityType = () => {
    const social = answers[1] || 'introvert'
    const decision = answers[2] || 'thinking'
    const approach = answers[3] || 'planning'
    return `${social}_${decision}_${approach}`
  }

  if (showResult) {
    const type = getPersonalityType()
    const result = personalityTypes[type as keyof typeof personalityTypes]

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">{result.title}</h2>
          <p className="text-lg text-gray-700 mb-8">{result.description}</p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">주요 특성</h3>
            <div className="flex flex-wrap gap-2">
              {result.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={restartTest}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            다시 테스트하기
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">간단한 성격 테스트</h2>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 