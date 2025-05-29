'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const questions = [
  {
    id: 1,
    question: "How do you typically respond to social situations?",
    options: [
      { value: "extrovert", label: "I enjoy being around people and feel energized by social interactions" },
      { value: "introvert", label: "I prefer smaller groups and need time alone to recharge" },
      { value: "ambivert", label: "It depends on the situation and my energy levels" }
    ]
  },
  {
    id: 2,
    question: "When making decisions, you tend to:",
    options: [
      { value: "thinking", label: "Analyze facts and logic carefully" },
      { value: "feeling", label: "Consider how others will feel and the impact on relationships" },
      { value: "balanced", label: "Use a combination of both approaches" }
    ]
  },
  // Add more questions as needed
]

export default function PersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }))
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setIsAnalyzing(true)
      // Here we would typically send the answers to our AI analysis endpoint
      setTimeout(() => {
        // Simulate analysis completion
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Personality Analysis
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Answer a few questions to discover your personality traits and get AI-powered insights.
          </p>
        </div>

        {!isAnalyzing ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white shadow-xl rounded-lg p-6"
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-indigo-600">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Analyzing your responses...</p>
          </div>
        )}

        {currentQuestion > 0 && !isAnalyzing && (
          <button
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  )
} 