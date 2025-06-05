'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const mbtiQuestions = [
  // E/I Questions
  {
    category: 'EI',
    questions: [
      {
        id: 'EI1',
        question: "Meeting new people is enjoyable",
        options: [
          { value: 'E', label: 'Strongly Agree' },
          { value: 'E', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'I', label: 'Disagree' },
          { value: 'I', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'EI2',
        question: "I need time alone",
        options: [
          { value: 'I', label: 'Strongly Agree' },
          { value: 'I', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'E', label: 'Disagree' },
          { value: 'E', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'EI3',
        question: "Starting conversations is not difficult",
        options: [
          { value: 'E', label: 'Strongly Agree' },
          { value: 'E', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'I', label: 'Disagree' },
          { value: 'I', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'EI4',
        question: "I gain energy from being with people",
        options: [
          { value: 'E', label: 'Strongly Agree' },
          { value: 'E', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'I', label: 'Disagree' },
          { value: 'I', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'EI5',
        question: "I can focus better in a quiet environment",
        options: [
          { value: 'I', label: 'Strongly Agree' },
          { value: 'I', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'E', label: 'Disagree' },
          { value: 'E', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'EI6',
        question: "I like giving presentations in front of many people",
        options: [
          { value: 'E', label: 'Strongly Agree' },
          { value: 'E', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'I', label: 'Disagree' },
          { value: 'I', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'EI7',
        question: "I need time alone to organize my thoughts",
        options: [
          { value: 'I', label: 'Strongly Agree' },
          { value: 'I', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'E', label: 'Disagree' },
          { value: 'E', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'EI8',
        question: "I actively participate in conversations in gatherings",
        options: [
          { value: 'E', label: 'Strongly Agree' },
          { value: 'E', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'I', label: 'Disagree' },
          { value: 'I', label: 'Strongly Disagree' }
        ]
      }
    ]
  },
  // S/N Questions
  {
    category: 'SN',
    questions: [
      {
        id: 'SN1',
        question: "I focus on present facts rather than future possibilities",
        options: [
          { value: 'S', label: 'Strongly Agree' },
          { value: 'S', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'N', label: 'Disagree' },
          { value: 'N', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'SN2',
        question: "I enjoy coming up with new ideas",
        options: [
          { value: 'N', label: 'Strongly Agree' },
          { value: 'N', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'S', label: 'Disagree' },
          { value: 'S', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'SN3',
        question: "I value concrete facts and details",
        options: [
          { value: 'S', label: 'Strongly Agree' },
          { value: 'S', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'N', label: 'Disagree' },
          { value: 'N', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'SN4',
        question: "I have a rich imagination and creative thoughts",
        options: [
          { value: 'N', label: 'Strongly Agree' },
          { value: 'N', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'S', label: 'Disagree' },
          { value: 'S', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'SN5',
        question: "I prefer learning through actual experience",
        options: [
          { value: 'S', label: 'Strongly Agree' },
          { value: 'S', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'N', label: 'Disagree' },
          { value: 'N', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'SN6',
        question: "I like to think deeply about theories and concepts",
        options: [
          { value: 'N', label: 'Strongly Agree' },
          { value: 'N', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'S', label: 'Disagree' },
          { value: 'S', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'SN7',
        question: "Finding practical solutions is important",
        options: [
          { value: 'S', label: 'Strongly Agree' },
          { value: 'S', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'N', label: 'Disagree' },
          { value: 'N', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'SN8',
        question: "I enjoy finding new possibilities and alternatives",
        options: [
          { value: 'N', label: 'Strongly Agree' },
          { value: 'N', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'S', label: 'Disagree' },
          { value: 'S', label: 'Strongly Disagree' }
        ]
      }
    ]
  },
  // T/F Questions
  {
    category: 'TF',
    questions: [
      {
        id: 'TF1',
        question: "Logical judgment is more important than emotional judgment",
        options: [
          { value: 'T', label: 'Strongly Agree' },
          { value: 'T', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'F', label: 'Disagree' },
          { value: 'F', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'TF2',
        question: "I understand and empathize well with others' feelings",
        options: [
          { value: 'F', label: 'Strongly Agree' },
          { value: 'F', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'T', label: 'Disagree' },
          { value: 'T', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'TF3',
        question: "Objective analysis is more important than subjective judgment",
        options: [
          { value: 'T', label: 'Strongly Agree' },
          { value: 'T', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'F', label: 'Disagree' },
          { value: 'F', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'TF4',
        question: "Maintaining harmonious relationships is important",
        options: [
          { value: 'F', label: 'Strongly Agree' },
          { value: 'F', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'T', label: 'Disagree' },
          { value: 'T', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'TF5',
        question: "I value principles and rules",
        options: [
          { value: 'T', label: 'Strongly Agree' },
          { value: 'T', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'F', label: 'Disagree' },
          { value: 'F', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'TF6',
        question: "I react sensitively to others' emotions",
        options: [
          { value: 'F', label: 'Strongly Agree' },
          { value: 'F', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'T', label: 'Disagree' },
          { value: 'T', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'TF7',
        question: "I enjoy logical discussions",
        options: [
          { value: 'T', label: 'Strongly Agree' },
          { value: 'T', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'F', label: 'Disagree' },
          { value: 'F', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'TF8',
        question: "I am good at comforting others in emotional situations",
        options: [
          { value: 'F', label: 'Strongly Agree' },
          { value: 'F', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'T', label: 'Disagree' },
          { value: 'T', label: 'Strongly Disagree' }
        ]
      }
    ]
  },
  // J/P Questions
  {
    category: 'JP',
    questions: [
      {
        id: 'JP1',
        question: "It is good to make plans and follow them",
        options: [
          { value: 'J', label: 'Strongly Agree' },
          { value: 'J', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'P', label: 'Disagree' },
          { value: 'P', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'JP2',
        question: "It is good to handle situations flexibly as they arise",
        options: [
          { value: 'P', label: 'Strongly Agree' },
          { value: 'P', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'J', label: 'Disagree' },
          { value: 'J', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'JP3',
        question: "I adhere well to set rules and schedules",
        options: [
          { value: 'J', label: 'Strongly Agree' },
          { value: 'J', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'P', label: 'Disagree' },
          { value: 'P', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'JP4',
        question: "It is good to keep new experiences and possibilities open",
        options: [
          { value: 'P', label: 'Strongly Agree' },
          { value: 'P', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'J', label: 'Disagree' },
          { value: 'J', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'JP5',
        question: "I tend to handle tasks immediately rather than postponing them",
        options: [
          { value: 'J', label: 'Strongly Agree' },
          { value: 'J', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'P', label: 'Disagree' },
          { value: 'P', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'JP6',
        question: "I tend to finish work by the deadline",
        options: [
          { value: 'J', label: 'Strongly Agree' },
          { value: 'J', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'P', label: 'Disagree' },
          { value: 'P', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'JP7',
        question: "I like to consider various options",
        options: [
          { value: 'P', label: 'Strongly Agree' },
          { value: 'P', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'J', label: 'Disagree' },
          { value: 'J', label: 'Strongly Disagree' }
        ]
      },
      {
        id: 'JP8',
        question: "I tend to postpone making decisions",
        options: [
          { value: 'P', label: 'Strongly Agree' },
          { value: 'P', label: 'Agree' },
          { value: 'N', label: 'Neutral' },
          { value: 'J', label: 'Disagree' },
          { value: 'J', label: 'Strongly Disagree' }
        ]
      }
    ]
  }
]

const mbtiDescriptions = {
  ISTJ: {
    title: "The Logistician",
    description: "Practical and fact-minded individuals, whose reliability cannot be doubted.",
    traits: ["Practical", "Responsible", "Logical", "Systematic", "Realistic"],
    strengths: ["Accurate and systematic", "Strong sense of responsibility", "Practical and realistic"],
    weaknesses: ["May lack flexibility", "Resistant to change", "Difficulty expressing emotions"],
    relationships: "Values trust and prefers stable relationships.",
    career_paths: ["Accountant", "Civil Servant", "Programmer", "Manager"],
    personal_growth: "Needs to open up to new ideas and develop flexibility."
  },
  ISFJ: {
    title: "The Defender",
    description: "Very dedicated and warm protectors, always ready to defend their loved ones.",
    traits: ["Dedicated", "Caring", "Responsible", "Patient", "Practical"],
    strengths: ["Devoted and altruistic", "Strong sense of responsibility", "Detail-oriented"],
    weaknesses: ["May sacrifice own needs", "Sensitive to criticism", "Resistant to change"],
    relationships: "Genuinely cares for others and seeks stable, harmonious relationships.",
    career_paths: ["Nurse", "Social Worker", "Teacher", "Office Worker"],
    personal_growth: "Needs to practice expressing own needs and feelings."
  },
  INFJ: {
    title: "The Advocate",
    description: "Quiet and mystical, yet very inspiring and tireless idealists.",
    traits: ["Idealistic", "Insightful", "Creative", "Determined", "Mysterious"],
    strengths: ["Strong insight and intuition", "Idealistic and creative", "Helps others grow"],
    weaknesses: ["Takes on too much", "Tends to be secretive", "Vulnerable to burnout"],
    relationships: "Seeks deep, meaningful relationships and values authenticity.",
    career_paths: ["Counselor", "Writer", "Clergy", "Artist", "Psychologist"],
    personal_growth: "Needs to set realistic goals and take care of own emotions."
  },
  INTJ: {
    title: "The Architect",
    description: "Imaginative and strategic thinkers, with a plan for everything.",
    traits: ["Strategic", "Logical", "Creative", "Independent", "Determined"],
    strengths: ["Excellent analysis and logic", "Independent and decisive", "Long-term planning"],
    weaknesses: ["May be cold in criticism", "Can be stubborn", "Difficulty expressing emotions"],
    relationships: "Values intellectual exchange and may have high standards for partners.",
    career_paths: ["Consultant", "Scientist", "Engineer", "Professor", "Strategist"],
    personal_growth: "Needs to consider others' feelings and develop flexibility."
  },
  ISTP: {
    title: "The Virtuoso",
    description: "Bold experimenters, masters of all kinds of tools.",
    traits: ["Bold", "Realistic", "Adaptable", "Observant", "Practical"],
    strengths: ["Excellent problem-solving", "Realistic and practical", "Crisis management"],
    weaknesses: ["May lack planning", "Can appear indifferent", "Tends to be impulsive"],
    relationships: "Prefers freedom in relationships and enjoys sharing experiences.",
    career_paths: ["Police/Firefighter", "Technician", "Pilot", "Mechanic", "Architect"],
    personal_growth: "Needs to set long-term goals and consider others' feelings."
  },
  ISFP: {
    title: "The Adventurer",
    description: "Spontaneous and artistic, always ready to explore and experience something new.",
    traits: ["Artistic", "Sensitive", "Free-spirited", "Tolerant", "Realistic"],
    strengths: ["Warm and kind", "Spontaneous and flexible", "Strong aesthetic sense"],
    weaknesses: ["Avoids conflict", "Difficulty making decisions", "Sensitive to criticism"],
    relationships: "Values emotional connection and mutual support, prefers free atmosphere.",
    career_paths: ["Artist", "Designer", "Musician", "Therapist", "Veterinarian"],
    personal_growth: "Needs to express opinions and develop planning skills."
  },
  INFP: {
    title: "The Mediator",
    description: "Poetic, kind and altruistic people, always eager to help a good cause.",
    traits: ["Idealistic", "Creative", "Empathetic", "Passionate", "Mysterious"],
    strengths: ["Strong empathy and understanding", "Creative and idealistic", "Strong values"],
    weaknesses: ["May be unrealistic", "Vulnerable to criticism", "Difficulty making decisions"],
    relationships: "Seeks deep emotional and mental connection, values authentic relationships.",
    career_paths: ["Writer", "Counselor", "Artist", "Professor", "Non-profit Activist"],
    personal_growth: "Needs to make realistic plans and let go of perfectionism."
  },
  INTP: {
    title: "The Logician",
    description: "Innovative inventors with an unquenchable thirst for knowledge.",
    traits: ["Logical", "Creative", "Objective", "Curious", "Original"],
    strengths: ["Excellent analysis", "Creative and innovative", "Strong intellectual curiosity"],
    weaknesses: ["Lacks social skills", "May be impractical", "May ignore rules"],
    relationships: "Values intellectual stimulation and independent space, awkward with emotions.",
    career_paths: ["Scientist", "Mathematician", "Programmer", "Professor", "Researcher"],
    personal_growth: "Needs to practice emotional expression and pay attention to relationships."
  },
  ESTP: {
    title: "The Entrepreneur",
    description: "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
    traits: ["Bold", "Realistic", "Adaptable", "Observant", "Practical"],
    strengths: ["Realistic and practical", "Excellent adaptability", "Energetic and spontaneous"],
    weaknesses: ["Lacks long-term planning", "Tends to be impulsive", "Dislikes rules"],
    relationships: "Seeks active and fun relationships, solves problems directly.",
    career_paths: ["Entrepreneur", "Salesperson", "Athlete", "Police", "Emergency Responder"],
    personal_growth: "Needs to think carefully before making decisions and consider others' feelings."
  },
  ESFP: {
    title: "The Entertainer",
    description: "Spontaneous, energetic and enthusiastic entertainers - life is never boring around them.",
    traits: ["Fun-loving", "Sociable", "Spontaneous", "Passionate", "Creative"],
    strengths: ["Sociable and optimistic", "Spontaneous and flexible", "Makes others happy"],
    weaknesses: ["May lack planning", "Avoids conflict", "Cannot stand boredom"],
    relationships: "Prefers fun and active relationships, spreads positive energy.",
    career_paths: ["Entertainer", "Service Industry", "Teacher", "Counselor", "Event Planner"],
    personal_growth: "Needs to set long-term goals and manage finances."
  },
  ENFP: {
    title: "The Campaigner",
    description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
    traits: ["Enthusiastic", "Creative", "Sociable", "Spontaneous", "Imaginative"],
    strengths: ["Creative and passionate", "Excellent empathy", "Discovers new possibilities"],
    weaknesses: ["May be scattered", "Good at starting, poor at finishing", "Sensitive to criticism"],
    relationships: "Seeks deep, meaningful relationships and supports partner's growth.",
    career_paths: ["Consultant", "Psychologist", "Writer", "Artist", "Professor"],
    personal_growth: "Needs to practice decision-making and make realistic plans."
  },
  ENTP: {
    title: "The Debater",
    description: "Smart and curious thinkers who cannot resist an intellectual challenge.",
    traits: ["Creative", "Logical", "Curious", "Adaptable", "Original"],
    strengths: ["Logical and analytical", "Creative and original", "Explores new ideas"],
    weaknesses: ["Difficulty making decisions", "Bored by routine", "May be insensitive to feelings"],
    relationships: "Enjoys intellectual debate and humor, prefers independent relationships.",
    career_paths: ["Lawyer", "Engineer", "Scientist", "Entrepreneur", "Consultant"],
    personal_growth: "Needs to consider others' feelings and develop patience."
  },
  ESTJ: {
    title: "The Executive",
    description: "Efficient and organized, they value tradition and order.",
    traits: ["Systematic", "Practical", "Responsible", "Traditional", "Decisive"],
    strengths: ["Systematic and organized", "Decisive and realistic", "Strong sense of responsibility"],
    weaknesses: ["May lack flexibility", "Can be stubborn", "May be insensitive to feelings"],
    relationships: "Prefers stable and responsible relationships, values clear rules.",
    career_paths: ["Manager", "Administrator", "Judge", "Police", "Teacher"],
    personal_growth: "Needs to develop flexibility and consider others' feelings."
  },
  ESFJ: {
    title: "The Consul",
    description: "Extraordinarily caring, social and popular people, always eager to help.",
    traits: ["Sociable", "Cooperative", "Responsible", "Empathetic", "Practical"],
    strengths: ["Sociable and kind", "Good at taking care of others", "Cooperative and responsible"],
    weaknesses: ["Sensitive to criticism", "Tries too hard to please", "Suppresses own feelings"],
    relationships: "Seeks warm and harmonious relationships, prioritizes others' needs.",
    career_paths: ["Teacher", "Nurse", "Social Worker", "Sales", "Service Industry"],
    personal_growth: "Needs to prioritize own needs and practice saying no."
  },
  ENFJ: {
    title: "The Protagonist",
    description: "Charismatic and inspiring leaders, able to mesmerize their listeners.",
    traits: ["Charismatic", "Altruistic", "Creative", "Responsible", "Passionate"],
    strengths: ["Excellent leadership and communication", "Altruistic and inspiring", "Sees potential in others"],
    weaknesses: ["Too focused on ideals", "Ignores own needs", "Excessive responsibility"],
    relationships: "Seeks deep, meaningful relationships, actively helps partner grow.",
    career_paths: ["Teacher", "Counselor", "Politician", "Writer", "Non-profit Activist"],
    personal_growth: "Needs to take care of own emotions and focus on realistic goals."
  },
  ENTJ: {
    title: "The Commander",
    description: "Bold, imaginative and strong-willed leaders, always finding a way - or making one.",
    traits: ["Leadership", "Decisive", "Strategic", "Logical", "Confident"],
    strengths: ["Decisive and driven", "Strategic and logical", "Excellent leadership"],
    weaknesses: ["Can be stubborn", "Insensitive to feelings", "May be authoritative"],
    relationships: "Prefers goal-oriented relationships, enjoys growing and challenging with partner.",
    career_paths: ["Manager", "Entrepreneur", "Consultant", "Lawyer", "Politician"],
    personal_growth: "Needs to consider others' feelings and develop flexibility."
  }
}

export default function MBTIMatch() {
  const [step, setStep] = useState<'input' | 'test' | 'result'>('input')
  const [userMBTI, setUserMBTI] = useState('')
  const [currentCategory, setCurrentCategory] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [matchResult, setMatchResult] = useState<{
    isMatch: boolean
    userType: string
    testType: string
  } | null>(null)
  const [myMbti, setMyMbti] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    setMyMbti(searchParams.get('myMbti'));
  }, [searchParams]);

  const handlePreviousQuestion = () => {
    const category = mbtiQuestions[currentCategory]
    const currentQuestion = category.questions[currentQuestionIndex]
    
    // Remove the answer for the current question
    setAnswers(prev => {
      const newAnswers = { ...prev }
      delete newAnswers[currentQuestion.id]
      return newAnswers
    })

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1)
      const prevCategory = mbtiQuestions[currentCategory - 1]
      setCurrentQuestionIndex(prevCategory.questions.length - 1)
    }
  }

  const handleMBTISubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formattedMBTI = userMBTI.toUpperCase()
    if (formattedMBTI.length === 4 && /^[EI][SN][TF][JP]$/.test(formattedMBTI)) {
      setUserMBTI(formattedMBTI)
      setStep('test')
    } else {
      alert('Invalid MBTI format. (e.g. ENFP, ISTJ)')
    }
  }

  const handleAnswer = (label: string) => {
    const category = mbtiQuestions[currentCategory]
    const currentQuestion = category.questions[currentQuestionIndex]

    // Remove previous answer and save new answer (save as label)
    setAnswers(prev => {
      const newAnswers = { ...prev }
      delete newAnswers[currentQuestion.id]
      return { ...newAnswers, [currentQuestion.id]: label }
    })

    if (currentQuestionIndex < category.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else if (currentCategory < mbtiQuestions.length - 1) {
      setCurrentCategory(prev => prev + 1)
      setCurrentQuestionIndex(0)
    } else {
      calculateResult()
    }
  }

  const calculateResult = () => {
    const categoryScores = {
      EI: { E: 0, I: 0 },
      SN: { S: 0, N: 0 },
      TF: { T: 0, F: 0 },
      JP: { J: 0, P: 0 }
    }

    const scoreValueMap = {
      'Strongly Agree': 2,
      'Agree': 1,
      'Neutral': 0,
      'Disagree': 1,
      'Strongly Disagree': 2,
    };

    Object.entries(answers).forEach(([questionId, answerLabel]) => {
      const category = questionId.substring(0, 2) as keyof typeof categoryScores;
      const point = scoreValueMap[answerLabel as keyof typeof scoreValueMap] || 0;

      // Find the value corresponding to the selected label in the original options for the question
      const currentQuestion = mbtiQuestions
        .find(cat => cat.category === category)
        ?.questions.find(q => q.id === questionId);

      if (currentQuestion) {
         const selectedOption = currentQuestion.options.find(opt => opt.label === answerLabel);

         if (selectedOption && point > 0) { // Do not reflect 'Neutral' (point 0) answers in the score
           const value = selectedOption.value; // One of E, I, S, N, T, F, J, P

            if (category === 'EI') {
              if (value === 'E') categoryScores.EI.E += point;
              else if (value === 'I') categoryScores.EI.I += point;
            } else if (category === 'SN') {
              if (value === 'S') categoryScores.SN.S += point;
              else if (value === 'N') categoryScores.SN.N += point;
            } else if (category === 'TF') {
              if (value === 'T') categoryScores.TF.T += point;
              else if (value === 'F') categoryScores.TF.F += point;
            } else if (category === 'JP') {
              if (value === 'J') categoryScores.JP.J += point;
              else if (value === 'P') categoryScores.JP.P += point;
            }
         }
      }
    });

    const result = [
      categoryScores.EI.E >= categoryScores.EI.I ? 'E' : 'I',
      categoryScores.SN.S >= categoryScores.SN.N ? 'S' : 'N',
      categoryScores.TF.T >= categoryScores.TF.F ? 'T' : 'F',
      categoryScores.JP.J >= categoryScores.JP.P ? 'J' : 'P'
    ].join('')

    setMatchResult({
      isMatch: result === userMBTI.toUpperCase(),
      userType: userMBTI.toUpperCase(),
      testType: result
    })
    setStep('result')
  }

  const restartTest = () => {
    setStep('input')
    setUserMBTI('')
    setCurrentCategory(0)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setMatchResult(null)
  }

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-purple-600">MBTI Match Test</h2>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </Link>
          </div>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Enter your known MBTI and take the test to find your actual MBTI!
          </p>

          <form onSubmit={handleMBTISubmit} className="space-y-6">
            <div>
              <label htmlFor="mbti" className="block text-sm font-medium text-gray-700 mb-2">
                Your MBTI
              </label>
              <input
                type="text"
                id="mbti"
                value={userMBTI}
                onChange={(e) => setUserMBTI(e.target.value.toUpperCase())}
                placeholder="e.g. ENFP"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                maxLength={4}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Start Test
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  if (step === 'test') {
    const category = mbtiQuestions[currentCategory]
    const currentQuestion = category.questions[currentQuestionIndex]
    const totalQuestions = mbtiQuestions.reduce((acc, category) => acc + category.questions.length, 0)
    const currentQuestionNumber = mbtiQuestions
      .slice(0, currentCategory)
      .reduce((acc, category) => acc + category.questions.length, 0) + currentQuestionIndex + 1

    const canGoBack = currentQuestionIndex > 0 || currentCategory > 0

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">MBTI Test</h2>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </Link>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">MBTI Test</h2>
              <span className="text-sm text-gray-500">
                {currentQuestionNumber} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            key={`${currentCategory}-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h3>
            <div className="space-y-4">
              {currentQuestion.options.map((option: { value: string; label: string }, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.label)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    answers[currentQuestion.id] === option.label
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePreviousQuestion}
              disabled={!canGoBack}
              className={`px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                canGoBack
                  ? 'text-white bg-purple-600 hover:bg-purple-700'
                  : 'text-gray-400 bg-gray-100 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            >
              Previous Question
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (step === 'result' && matchResult) {
    const userType = mbtiDescriptions[matchResult.userType as keyof typeof mbtiDescriptions]
    const testType = mbtiDescriptions[matchResult.testType as keyof typeof mbtiDescriptions]

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-8 w-full">
            <h2 className="text-3xl font-bold text-gray-900 text-center flex-grow">Test Results</h2>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </Link>
          </div>
          <div className="text-center mb-8">
            {matchResult.isMatch ? (
              <div className="flex items-center justify-center text-green-600 mb-4">
                <CheckCircleIcon className="h-12 w-12" />
              </div>
            ) : (
              <div className="flex items-center justify-center text-red-600 mb-4">
                <XCircleIcon className="h-12 w-12" />
              </div>
            )}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {matchResult.isMatch ? 'Accurate MBTI!' : 'MBTI Mismatch'} ({matchResult.testType})
            </h2>
            <p className="text-lg text-gray-600">
              {matchResult.isMatch
                ? 'Your known MBTI is accurate!'
                : `Your input MBTI (${matchResult.userType}) differs from the test result (${matchResult.testType}).`}
            </p>
          </div>

          <div className={`grid grid-cols-1 ${myMbti && testType ? 'md:grid-cols-2' : ''} gap-8 mb-8`}>
            {/* Your Input MBTI Information */}
            {myMbti && userType && testType && (
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 h-full">
                <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
                  Your Input MBTI: {matchResult.userType}
                </h3>
                <h4 className="text-lg font-medium text-gray-800 mb-2 text-center">{userType.title}</h4>
                <p className="text-gray-600 mb-4 text-center">{userType.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  <span className="font-semibold text-gray-700">Traits:</span>
                  {userType.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Additional Detailed Information (Your Input MBTI Section) */}
                {userType.strengths && userType.strengths.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">Strengths:</h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 leading-relaxed">
                      {userType.strengths.map((item, index) => (
                        <li key={index} className="text-center">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {userType.weaknesses && userType.weaknesses.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">Weaknesses:</h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 leading-relaxed">
                      {userType.weaknesses.map((item, index) => (
                        <li key={index} className="text-center">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {userType.relationships && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">Relationship Characteristics:</h5>
                    <p className="text-gray-600 leading-relaxed text-center">{userType.relationships}</p>
                  </div>
                )}

                {userType.career_paths && userType.career_paths.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">Recommended Careers/Fields:</h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 leading-relaxed">
                      {userType.career_paths.map((item, index) => (
                        <li key={index} className="text-center">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Test Result MBTI Information */}
            {testType && (
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 h-full">
                <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
                  Test Result MBTI: {matchResult.testType}
                </h3>
                <h4 className="text-lg font-medium text-gray-800 mb-2 text-center">{testType.title}</h4>
                <p className="text-gray-600 mb-4 text-center">{testType.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  <span className="font-semibold text-gray-700">Traits:</span>
                  {testType.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Additional Detailed Information (Test Result MBTI Section) */}
                {testType.strengths && testType.strengths.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">Strengths:</h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 leading-relaxed">
                      {testType.strengths.map((item, index) => (
                        <li key={index} className="text-center">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {testType.weaknesses && testType.weaknesses.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">Weaknesses:</h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 leading-relaxed">
                      {testType.weaknesses.map((item, index) => (
                        <li key={index} className="text-center">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {testType.relationships && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">Relationship Characteristics:</h5>
                    <p className="text-gray-600 leading-relaxed text-center">{testType.relationships}</p>
                  </div>
                )}

                {testType.career_paths && testType.career_paths.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2 text-center">Recommended Careers/Fields:</h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 leading-relaxed">
                      {testType.career_paths.map((item, index) => (
                        <li key={index} className="text-center">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={restartTest}
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Take Test Again
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return null
} 