'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, SparklesIcon, ChartBarIcon, HeartIcon } from '@heroicons/react/24/outline'

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
  {
    id: 3,
    question: "How do you prefer to process information?",
    options: [
      { value: "sensing", label: "Focus on concrete facts and details" },
      { value: "intuitive", label: "Look for patterns and possibilities" },
      { value: "balanced", label: "Use both approaches depending on the situation" }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to organize your life?",
    options: [
      { value: "judging", label: "Plan ahead and stick to schedules" },
      { value: "perceiving", label: "Keep options open and be spontaneous" },
      { value: "balanced", label: "Adapt based on the situation" }
    ]
  }
]

// Sample personality types and their descriptions
const personalityTypes = {
  ENFJ: {
    title: "The Protagonist",
    description: "Charismatic and inspiring leaders, able to mesmerize their listeners. They are passionate and altruistic, naturally gifted at influencing others.",
    traits: ["Charismatic", "Reliable", "Passionate", "Altruistic", "Natural Leaders"],
    strengths: [
      "Exceptional communication skills",
      "Natural leadership abilities",
      "Empathetic and understanding",
      "Organized and decisive",
      "Strong sense of responsibility"
    ],
    challenges: [
      "Overly idealistic",
      "Too selfless",
      "Too sensitive to criticism",
      "Fluctuating self-esteem",
      "Difficulty accepting failure"
    ]
  },
  INTJ: {
    title: "The Architect",
    description: "Imaginative and strategic thinkers, with a plan for everything. They are independent and analytical, always looking for ways to improve systems.",
    traits: ["Strategic", "Independent", "Analytical", "Creative", "Determined"],
    strengths: [
      "Quick to understand complex ideas",
      "High standards and perfectionism",
      "Independent and decisive",
      "Open-minded and innovative",
      "Strong analytical skills"
    ],
    challenges: [
      "Perfectionist tendencies",
      "Can be arrogant",
      "Overly analytical",
      "Struggle with small talk",
      "Difficulty expressing emotions"
    ]
  },
  ISTJ: {
    title: "The Logistician",
    description: "Practical and fact-minded individuals, whose reliability cannot be doubted. They are responsible and organized, always following through on their commitments.",
    traits: ["Practical", "Organized", "Reliable", "Traditional", "Detail-oriented"],
    strengths: [
      "Honest and direct communication",
      "Strong-willed and dutiful",
      "Excellent at planning and organization",
      "Calm and practical under pressure",
      "High attention to detail"
    ],
    challenges: [
      "Can be stubborn",
      "Sometimes insensitive",
      "Too rigid with rules",
      "Difficulty with change",
      "May judge others too quickly"
    ]
  },
  ISFJ: {
    title: "The Defender",
    description: "Very dedicated and warm protectors, always ready to defend their loved ones. They are practical and caring, with a strong sense of responsibility.",
    traits: ["Protective", "Supportive", "Reliable", "Patient", "Observant"],
    strengths: [
      "Extremely supportive of others",
      "Reliable and patient",
      "Excellent memory for details",
      "Practical and hands-on",
      "Strong sense of duty"
    ],
    challenges: [
      "Too humble and shy",
      "Take things too personally",
      "Overload themselves with work",
      "Reluctant to change",
      "Difficulty saying no"
    ]
  },
  INFJ: {
    title: "The Advocate",
    description: "Quiet and mystical, yet very inspiring and tireless idealists. They are creative and insightful, with a strong sense of personal integrity.",
    traits: ["Creative", "Insightful", "Principled", "Passionate", "Altruistic"],
    strengths: [
      "Creative problem-solving",
      "Deep understanding of others",
      "Strong personal integrity",
      "Determined and passionate",
      "Excellent at seeing patterns"
    ],
    challenges: [
      "Sensitive to criticism",
      "Perfectionist tendencies",
      "Avoid conflict at all costs",
      "Burn out easily",
      "Difficulty with small talk"
    ]
  },
  INFP: {
    title: "The Mediator",
    description: "Poetic, kind and altruistic people, always eager to help a good cause. They are idealistic and creative, with a strong sense of personal values.",
    traits: ["Idealistic", "Creative", "Empathetic", "Curious", "Adaptable"],
    strengths: [
      "Creative and artistic",
      "Empathetic and understanding",
      "Open-minded and curious",
      "Strong personal values",
      "Adaptable to change"
    ],
    challenges: [
      "Too idealistic",
      "Overly sensitive",
      "Difficulty with practical matters",
      "Tendency to procrastinate",
      "Struggle with criticism"
    ]
  },
  ENFP: {
    title: "The Campaigner",
    description: "Enthusiastic, creative, and sociable free spirits, who can always find a reason to smile. They are spontaneous and energetic, with a contagious enthusiasm for new ideas.",
    traits: ["Enthusiastic", "Creative", "Sociable", "Spontaneous", "Energetic"],
    strengths: [
      "Excellent communication skills",
      "Creative problem-solving",
      "Natural enthusiasm",
      "Adaptable and flexible",
      "Strong people skills"
    ],
    challenges: [
      "Easily distracted",
      "Difficulty with routine",
      "Overthink decisions",
      "Struggle with follow-through",
      "Too idealistic"
    ]
  },
  ESTJ: {
    title: "The Executive",
    description: "Efficient, energetic, and organized individuals who excel at managing projects and people. They are practical and traditional, with a strong sense of duty.",
    traits: ["Efficient", "Organized", "Traditional", "Direct", "Responsible"],
    strengths: [
      "Excellent organizational skills",
      "Direct and honest communication",
      "Strong leadership abilities",
      "Dedicated and hardworking",
      "Practical problem-solving"
    ],
    challenges: [
      "Can be inflexible",
      "Too focused on rules",
      "Difficulty with emotions",
      "May be too direct",
      "Resistant to change"
    ]
  }
}

// MBTI dimension mappings
const dimensionMappings = {
  social: {
    extrovert: 'E',
    introvert: 'I',
    ambivert: 'X' // Will be determined by other answers
  },
  decision: {
    thinking: 'T',
    feeling: 'F',
    balanced: 'X' // Will be determined by other answers
  },
  information: {
    sensing: 'S',
    intuitive: 'N',
    balanced: 'X' // Will be determined by other answers
  },
  organization: {
    judging: 'J',
    perceiving: 'P',
    balanced: 'X' // Will be determined by other answers
  }
}

// Helper function to determine MBTI type from answers
function determineMBTIType(answers: Record<number, string>): keyof typeof personalityTypes {
  // Count occurrences of each dimension
  const dimensions = {
    E: 0, I: 0,
    T: 0, F: 0,
    S: 0, N: 0,
    J: 0, P: 0
  }

  // Map answers to dimensions
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions[parseInt(questionId)]
    if (question.id === 1) { // Social question
      const dimension = dimensionMappings.social[answer as keyof typeof dimensionMappings.social]
      if (dimension !== 'X') dimensions[dimension as keyof typeof dimensions]++
    } else if (question.id === 2) { // Decision question
      const dimension = dimensionMappings.decision[answer as keyof typeof dimensionMappings.decision]
      if (dimension !== 'X') dimensions[dimension as keyof typeof dimensions]++
    } else if (question.id === 3) { // Information question
      const dimension = dimensionMappings.information[answer as keyof typeof dimensionMappings.information]
      if (dimension !== 'X') dimensions[dimension as keyof typeof dimensions]++
    } else if (question.id === 4) { // Organization question
      const dimension = dimensionMappings.organization[answer as keyof typeof dimensionMappings.organization]
      if (dimension !== 'X') dimensions[dimension as keyof typeof dimensions]++
    }
  })

  // Determine each letter of MBTI type
  const type = [
    dimensions.E > dimensions.I ? 'E' : 'I',
    dimensions.S > dimensions.N ? 'S' : 'N',
    dimensions.T > dimensions.F ? 'T' : 'F',
    dimensions.J > dimensions.P ? 'J' : 'P'
  ].join('')

  // Return the determined type, or default to ENFJ if type not found
  return (type in personalityTypes ? type : 'ENFJ') as keyof typeof personalityTypes
}

export default function PersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [personalityResult, setPersonalityResult] = useState<typeof personalityTypes[keyof typeof personalityTypes] | null>(null)

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }))
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setIsAnalyzing(true)
      // Analyze answers and determine personality type
      setTimeout(() => {
        const determinedType = determineMBTIType(answers)
        const result = personalityTypes[determinedType]
        setPersonalityResult(result)
        setIsAnalyzing(false)
        setShowResults(true)
      }, 2000)
    }
  }

  const restartTest = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setPersonalityResult(null)
  }

  if (showResults && personalityResult) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Personality Type: {personalityResult.title}
              </h1>
              <p className="text-lg text-gray-600">{personalityResult.description}</p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Traits</h2>
                <div className="flex flex-wrap gap-2">
                  {personalityResult.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Strengths</h2>
                  <ul className="space-y-2">
                    {personalityResult.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <SparklesIcon className="h-5 w-5 text-green-500" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Challenges</h2>
                  <ul className="space-y-2">
                    {personalityResult.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={restartTest}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Take Test Again
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
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