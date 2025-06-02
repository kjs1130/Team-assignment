'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, CheckCircleIcon, XCircleIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const mbtiQuestions = [
  // E/I 질문들
  {
    category: 'EI',
    questions: [
      {
        id: 'EI1',
        question: "새로운 사람들과 만나는 것이 즐겁다",
        options: [
          { value: 'E', label: '매우 그렇다' },
          { value: 'E', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'I', label: '아니다' },
          { value: 'I', label: '전혀 아니다' }
        ]
      },
      {
        id: 'EI2',
        question: "혼자 있는 시간이 필요하다",
        options: [
          { value: 'I', label: '매우 그렇다' },
          { value: 'I', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'E', label: '아니다' },
          { value: 'E', label: '전혀 아니다' }
        ]
      },
      {
        id: 'EI3',
        question: "대화를 시작하는 것이 어렵지 않다",
        options: [
          { value: 'E', label: '매우 그렇다' },
          { value: 'E', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'I', label: '아니다' },
          { value: 'I', label: '전혀 아니다' }
        ]
      },
      {
        id: 'EI4',
        question: "사람들과 함께 있을 때 에너지를 얻는다",
        options: [
          { value: 'E', label: '매우 그렇다' },
          { value: 'E', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'I', label: '아니다' },
          { value: 'I', label: '전혀 아니다' }
        ]
      },
      {
        id: 'EI5',
        question: "조용한 환경에서 더 집중할 수 있다",
        options: [
          { value: 'I', label: '매우 그렇다' },
          { value: 'I', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'E', label: '아니다' },
          { value: 'E', label: '전혀 아니다' }
        ]
      },
      {
        id: 'EI6',
        question: "여러 사람 앞에서 발표하는 것을 좋아한다",
        options: [
          { value: 'E', label: '매우 그렇다' },
          { value: 'E', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'I', label: '아니다' },
          { value: 'I', label: '전혀 아니다' }
        ]
      },
      {
        id: 'EI7',
        question: "생각을 정리하기 위해 혼자만의 시간이 필요하다",
        options: [
          { value: 'I', label: '매우 그렇다' },
          { value: 'I', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'E', label: '아니다' },
          { value: 'E', label: '전혀 아니다' }
        ]
      },
      {
        id: 'EI8',
        question: "모임에서 적극적으로 대화에 참여한다",
        options: [
          { value: 'E', label: '매우 그렇다' },
          { value: 'E', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'I', label: '아니다' },
          { value: 'I', label: '전혀 아니다' }
        ]
      }
    ]
  },
  // S/N 질문들
  {
    category: 'SN',
    questions: [
      {
        id: 'SN1',
        question: "미래의 가능성보다 현재의 사실에 집중한다",
        options: [
          { value: 'S', label: '매우 그렇다' },
          { value: 'S', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'N', label: '아니다' },
          { value: 'N', label: '전혀 아니다' }
        ]
      },
      {
        id: 'SN2',
        question: "새로운 아이디어를 떠올리는 것을 좋아한다",
        options: [
          { value: 'N', label: '매우 그렇다' },
          { value: 'N', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'S', label: '아니다' },
          { value: 'S', label: '전혀 아니다' }
        ]
      },
      {
        id: 'SN3',
        question: "구체적인 사실과 세부사항을 중요시한다",
        options: [
          { value: 'S', label: '매우 그렇다' },
          { value: 'S', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'N', label: '아니다' },
          { value: 'N', label: '전혀 아니다' }
        ]
      },
      {
        id: 'SN4',
        question: "상상력이 풍부하고 창의적인 생각을 한다",
        options: [
          { value: 'N', label: '매우 그렇다' },
          { value: 'N', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'S', label: '아니다' },
          { value: 'S', label: '전혀 아니다' }
        ]
      },
      {
        id: 'SN5',
        question: "실제 경험을 통해 배우는 것을 선호한다",
        options: [
          { value: 'S', label: '매우 그렇다' },
          { value: 'S', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'N', label: '아니다' },
          { value: 'N', label: '전혀 아니다' }
        ]
      },
      {
        id: 'SN6',
        question: "이론과 개념에 대해 깊이 생각하는 것을 좋아한다",
        options: [
          { value: 'N', label: '매우 그렇다' },
          { value: 'N', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'S', label: '아니다' },
          { value: 'S', label: '전혀 아니다' }
        ]
      },
      {
        id: 'SN7',
        question: "현실적인 해결책을 찾는 것이 중요하다",
        options: [
          { value: 'S', label: '매우 그렇다' },
          { value: 'S', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'N', label: '아니다' },
          { value: 'N', label: '전혀 아니다' }
        ]
      },
      {
        id: 'SN8',
        question: "새로운 가능성과 대안을 찾는 것을 좋아한다",
        options: [
          { value: 'N', label: '매우 그렇다' },
          { value: 'N', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'S', label: '아니다' },
          { value: 'S', label: '전혀 아니다' }
        ]
      }
    ]
  },
  // T/F 질문들
  {
    category: 'TF',
    questions: [
      {
        id: 'TF1',
        question: "논리적인 판단이 감정적인 판단보다 중요하다",
        options: [
          { value: 'T', label: '매우 그렇다' },
          { value: 'T', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'F', label: '아니다' },
          { value: 'F', label: '전혀 아니다' }
        ]
      },
      {
        id: 'TF2',
        question: "다른 사람의 감정을 잘 이해하고 공감한다",
        options: [
          { value: 'F', label: '매우 그렇다' },
          { value: 'F', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'T', label: '아니다' },
          { value: 'T', label: '전혀 아니다' }
        ]
      },
      {
        id: 'TF3',
        question: "객관적인 분석이 주관적인 판단보다 중요하다",
        options: [
          { value: 'T', label: '매우 그렇다' },
          { value: 'T', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'F', label: '아니다' },
          { value: 'F', label: '전혀 아니다' }
        ]
      },
      {
        id: 'TF4',
        question: "조화로운 관계를 유지하는 것이 중요하다",
        options: [
          { value: 'F', label: '매우 그렇다' },
          { value: 'F', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'T', label: '아니다' },
          { value: 'T', label: '전혀 아니다' }
        ]
      },
      {
        id: 'TF5',
        question: "원칙과 규칙을 중요시한다",
        options: [
          { value: 'T', label: '매우 그렇다' },
          { value: 'T', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'F', label: '아니다' },
          { value: 'F', label: '전혀 아니다' }
        ]
      },
      {
        id: 'TF6',
        question: "다른 사람의 감정에 민감하게 반응한다",
        options: [
          { value: 'F', label: '매우 그렇다' },
          { value: 'F', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'T', label: '아니다' },
          { value: 'T', label: '전혀 아니다' }
        ]
      },
      {
        id: 'TF7',
        question: "논리적인 토론을 즐긴다",
        options: [
          { value: 'T', label: '매우 그렇다' },
          { value: 'T', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'F', label: '아니다' },
          { value: 'F', label: '전혀 아니다' }
        ]
      },
      {
        id: 'TF8',
        question: "감정적인 상황에서 다른 사람을 위로하는 것을 잘한다",
        options: [
          { value: 'F', label: '매우 그렇다' },
          { value: 'F', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'T', label: '아니다' },
          { value: 'T', label: '전혀 아니다' }
        ]
      }
    ]
  },
  // J/P 질문들
  {
    category: 'JP',
    questions: [
      {
        id: 'JP1',
        question: "계획을 세우고 그대로 실행하는 것이 좋다",
        options: [
          { value: 'J', label: '매우 그렇다' },
          { value: 'J', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'P', label: '아니다' },
          { value: 'P', label: '전혀 아니다' }
        ]
      },
      {
        id: 'JP2',
        question: "상황에 따라 유연하게 대처하는 것이 좋다",
        options: [
          { value: 'P', label: '매우 그렇다' },
          { value: 'P', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'J', label: '아니다' },
          { value: 'J', label: '전혀 아니다' }
        ]
      },
      {
        id: 'JP3',
        question: "정해진 규칙과 일정을 잘 지킨다",
        options: [
          { value: 'J', label: '매우 그렇다' },
          { value: 'J', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'P', label: '아니다' },
          { value: 'P', label: '전혀 아니다' }
        ]
      },
      {
        id: 'JP4',
        question: "새로운 경험과 가능성을 열어두는 것이 좋다",
        options: [
          { value: 'P', label: '매우 그렇다' },
          { value: 'P', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'J', label: '아니다' },
          { value: 'J', label: '전혀 아니다' }
        ]
      },
      {
        id: 'JP5',
        question: "일을 미루지 않고 즉시 처리하는 편이다",
        options: [
          { value: 'J', label: '매우 그렇다' },
          { value: 'J', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'P', label: '아니다' },
          { value: 'P', label: '전혀 아니다' }
        ]
      },
      {
        id: 'JP6',
        question: "마감 시간에 맞춰 일을 마무리하는 편이다",
        options: [
          { value: 'J', label: '매우 그렇다' },
          { value: 'J', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'P', label: '아니다' },
          { value: 'P', label: '전혀 아니다' }
        ]
      },
      {
        id: 'JP7',
        question: "여러 가지 선택지를 고려하는 것을 좋아한다",
        options: [
          { value: 'P', label: '매우 그렇다' },
          { value: 'P', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'J', label: '아니다' },
          { value: 'J', label: '전혀 아니다' }
        ]
      },
      {
        id: 'JP8',
        question: "결정을 내리는 것을 미루는 편이다",
        options: [
          { value: 'P', label: '매우 그렇다' },
          { value: 'P', label: '그렇다' },
          { value: 'N', label: '보통이다' },
          { value: 'J', label: '아니다' },
          { value: 'J', label: '전혀 아니다' }
        ]
      }
    ]
  }
]

const mbtiDescriptions = {
  ISTJ: {
    title: "청렴결백한 논리주의자",
    description: "사실에 근거하여 신중하고 논리적으로 판단하며 책임감이 강한 현실주의자입니다.",
    traits: ["신중함", "책임감", "논리적", "체계적", "현실적"]
  },
  ISFJ: {
    title: "용감한 수호자",
    description: "성실하고 따뜻한 마음을 가진 수호자로서 주변 사람들을 보살피는 것을 좋아합니다.",
    traits: ["성실함", "배려심", "책임감", "인내심", "실용적"]
  },
  INFJ: {
    title: "선의의 옹호자",
    description: "차분하고 신비한 성격으로 다른 사람의 성장을 돕고자 하는 이상주의자입니다.",
    traits: ["이상주의", "통찰력", "창의성", "결단력", "신비함"]
  },
  INTJ: {
    title: "용의주도한 전략가",
    description: "논리적이고 창의적인 성격으로 모든 가능성을 고려하여 계획을 세우는 전략가입니다.",
    traits: ["전략적", "논리적", "창의성", "독립성", "결단력"]
  },
  ISTP: {
    title: "만능 재주꾼",
    description: "대담하고 현실적인 성격으로 다양한 도구 사용에 능숙한 탐험가입니다.",
    traits: ["대담함", "현실적", "적응력", "관찰력", "실용적"]
  },
  ISFP: {
    title: "호기심 많은 예술가",
    description: "따뜻한 감성을 가진 성격으로 매 순간을 즐기는 예술가입니다.",
    traits: ["예술성", "감성적", "자유로움", "관용적", "현실적"]
  },
  INFP: {
    title: "열정적인 중재자",
    description: "이상적인 세상을 만들어가는 낭만적인 성격의 중재자입니다.",
    traits: ["이상주의", "창의성", "공감능력", "열정", "신비함"]
  },
  INTP: {
    title: "논리적인 사색가",
    description: "끊임없이 새로운 지식을 탐구하는 혁신적인 발명가입니다.",
    traits: ["논리적", "창의성", "객관성", "호기심", "독창성"]
  },
  ESTP: {
    title: "모험을 즐기는 사업가",
    description: "위험을 기꺼이 감수하는 성격으로 영리하고 에너지 넘치는 사업가입니다.",
    traits: ["대담함", "현실적", "적응력", "관찰력", "실용적"]
  },
  ESFP: {
    title: "자유로운 영혼의 연예인",
    description: "즐거움을 좋아하는 성격으로 주변 사람들을 즐겁게 하는 연예인입니다.",
    traits: ["즐거움", "사교성", "자발성", "열정", "창의성"]
  },
  ENFP: {
    title: "재기발랄한 활동가",
    description: "열정적인 성격으로 새로운 가능성을 찾아 떠나는 활동가입니다.",
    traits: ["열정", "창의성", "사교성", "자발성", "상상력"]
  },
  ENTP: {
    title: "논쟁을 즐기는 변론가",
    description: "지적 도전을 즐기는 성격으로 영리하고 호기심 많은 변론가입니다.",
    traits: ["창의성", "논리적", "호기심", "적응력", "독창성"]
  },
  ESTJ: {
    title: "엄격한 관리자",
    description: "사실과 전통을 중시하는 성격으로 체계적인 관리자입니다.",
    traits: ["체계적", "실용적", "책임감", "전통적", "결단력"]
  },
  ESFJ: {
    title: "사교적인 외교관",
    description: "동정심 많고 협조적인 성격으로 타인을 돕는 것을 좋아하는 외교관입니다.",
    traits: ["사교성", "협조성", "책임감", "동정심", "실용적"]
  },
  ENFJ: {
    title: "정의로운 사회운동가",
    description: "카리스마 있고 이타적인 성격으로 다른 사람의 성장을 돕는 지도자입니다.",
    traits: ["카리스마", "이타심", "창의성", "책임감", "열정"]
  },
  ENTJ: {
    title: "대담한 통솔자",
    description: "천성적인 리더로서 항상 도전을 추구하는 성격의 통솔자입니다.",
    traits: ["리더십", "결단력", "전략적", "논리적", "자신감"]
  }
}

export default function MBTIMatch() {
  const [step, setStep] = useState<'input' | 'test' | 'result'>('input')
  const [userMBTI, setUserMBTI] = useState('')
  const [currentCategory, setCurrentCategory] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [testResult, setTestResult] = useState('')
  const [matchResult, setMatchResult] = useState<{
    isMatch: boolean
    userType: string
    testType: string
  } | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [loadingAnalysis, setLoadingAnalysis] = useState(false)

  const handlePreviousQuestion = () => {
    const category = mbtiQuestions[currentCategory]
    const currentQuestion = category.questions[currentQuestionIndex]
    
    // 현재 질문의 답변을 삭제
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

  const fetchAIAnalysis = async (mbtiType: string) => {
    setLoadingAnalysis(true)
    setAiAnalysis(null)
    try {
      const response = await fetch('/api/analyze-mbti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mbti: mbtiType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `AI 분석 요청 실패: 상태 코드 ${response.status}`);
      }

      const data = await response.json();

      if (data.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        throw new Error('AI 분석 결과 형식이 올바르지 않습니다.');
      }

    } catch (error: any) {
      console.error('AI 분석 중 오류 발생:', error);
      setAiAnalysis(`AI 분석을 불러오는데 실패했습니다. 오류: ${error.message}`);
    } finally {
      setLoadingAnalysis(false);
    }
  }

  const handleMBTISubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formattedMBTI = userMBTI.toUpperCase()
    if (formattedMBTI.length === 4 && /^[EI][SN][TF][JP]$/.test(formattedMBTI)) {
      setUserMBTI(formattedMBTI)
      setStep('test')
    } else {
      alert('올바른 MBTI 형식이 아닙니다. (예: ENFP, ISTJ)')
    }
  }

  const handleAnswer = (value: string) => {
    const category = mbtiQuestions[currentCategory]
    const currentQuestion = category.questions[currentQuestionIndex]
    
    // 이전 답변을 삭제하고 새로운 답변 저장
    setAnswers(prev => {
      const newAnswers = { ...prev }
      delete newAnswers[currentQuestion.id]
      return { ...newAnswers, [currentQuestion.id]: value }
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

    Object.entries(answers).forEach(([questionId, answer]) => {
      const category = questionId.substring(0, 2) as keyof typeof categoryScores
      const scoreValue = (label: string) => {
        switch (label) {
          case '매우 그렇다': return 2;
          case '그렇다': return 1;
          case '보통이다': return 0;
          case '아니다': return 1;
          case '전혀 아니다': return 2;
          default: return 0;
        }
      }

      const currentQuestion = mbtiQuestions
        .find(cat => cat.category === category)
        ?.questions.find(q => q.id === questionId)

      if (currentQuestion) {
        const selectedOption = currentQuestion.options.find(opt => opt.label === answer)
        if (selectedOption) {
          const value = selectedOption.value;
          const point = scoreValue(answer);

          if (point > 0) {
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
      }
    })

    const result = [
      categoryScores.EI.E >= categoryScores.EI.I ? 'E' : 'I',
      categoryScores.SN.S >= categoryScores.SN.N ? 'S' : 'N',
      categoryScores.TF.T >= categoryScores.TF.F ? 'T' : 'F',
      categoryScores.JP.J >= categoryScores.JP.P ? 'J' : 'P'
    ].join('')

    setTestResult(result)
    setMatchResult({
      isMatch: result === userMBTI.toUpperCase(),
      userType: userMBTI.toUpperCase(),
      testType: result
    })
    setStep('result')

    fetchAIAnalysis(result)
  }

  const restartTest = () => {
    setStep('input')
    setUserMBTI('')
    setCurrentCategory(0)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setTestResult('')
    setMatchResult(null)
    setAiAnalysis(null)
    setLoadingAnalysis(false)
  }

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-purple-600">MBTI 매칭 테스트</h2>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              메인으로
            </Link>
          </div>
          <p className="text-lg text-gray-700 mb-8 text-center">
            당신이 알고 있는 MBTI를 입력하고, 실제 MBTI를 테스트해보세요!
          </p>

          <form onSubmit={handleMBTISubmit} className="space-y-6">
            <div>
              <label htmlFor="mbti" className="block text-sm font-medium text-gray-700 mb-2">
                당신의 MBTI
              </label>
              <input
                type="text"
                id="mbti"
                value={userMBTI}
                onChange={(e) => setUserMBTI(e.target.value.toUpperCase())}
                placeholder="예: ENFP"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                maxLength={4}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              테스트 시작하기
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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">MBTI 테스트</h2>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              메인으로
            </Link>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">MBTI 테스트</h2>
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
              {currentQuestion.options.map((option: { value: string; label: string }) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    answers[currentQuestion.id] === option.value
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
              이전 질문
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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">테스트 결과</h2>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              메인으로
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
              {matchResult.isMatch ? '정확한 MBTI!' : 'MBTI가 다릅니다'}
            </h2>
            <p className="text-lg text-gray-600">
              {matchResult.isMatch
                ? '당신이 알고 있는 MBTI가 정확합니다!'
                : '테스트 결과와 입력하신 MBTI가 다릅니다.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">
                입력하신 MBTI: {matchResult.userType}
              </h3>
              <h4 className="text-lg font-medium text-gray-800 mb-2">{userType.title}</h4>
              <p className="text-gray-600 mb-4">{userType.description}</p>
              <div className="flex flex-wrap gap-2">
                {userType.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">
                테스트 결과 MBTI: {matchResult.testType}
              </h3>
              <h4 className="text-lg font-medium text-gray-800 mb-2">{testType.title}</h4>
              <p className="text-gray-600 mb-4">{testType.description}</p>
              <div className="flex flex-wrap gap-2">
                {testType.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-green-50 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-green-700 mb-4">AI 분석</h3>
            {loadingAnalysis ? (
              <p className="text-gray-600">AI가 분석 중입니다...</p>
            ) : aiAnalysis ? (
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{aiAnalysis}</p>
            ) : (
              <p className="text-gray-600">AI 분석을 불러올 수 없습니다. (API 연동 필요)</p>
            )}
          </motion.div>

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

  return null
} 