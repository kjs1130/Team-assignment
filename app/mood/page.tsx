'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaceSmileIcon, FaceFrownIcon } from '@heroicons/react/24/outline'

const emotions = [
  { value: 'happy', label: 'Happy', icon: FaceSmileIcon, color: 'text-yellow-400' },
  { value: 'neutral', label: 'Neutral', icon: FaceSmileIcon, color: 'text-gray-400' },
  { value: 'sad', label: 'Sad', icon: FaceFrownIcon, color: 'text-blue-400' },
  { value: 'excited', label: 'Excited', icon: FaceSmileIcon, color: 'text-green-400' },
  { value: 'anxious', label: 'Anxious', icon: FaceFrownIcon, color: 'text-red-400' },
  { value: 'calm', label: 'Calm', icon: FaceSmileIcon, color: 'text-purple-400' },
]

const activities = [
  { emotion: 'happy', suggestions: ['Share your joy with others', 'Document what made you happy', 'Plan something fun'] },
  { emotion: 'neutral', suggestions: ['Take a moment to reflect', 'Try something new', 'Connect with a friend'] },
  { emotion: 'sad', suggestions: ['Practice self-care', 'Listen to uplifting music', 'Write in your journal'] },
  { emotion: 'excited', suggestions: ['Channel your energy into a project', 'Share your excitement', 'Plan your next steps'] },
  { emotion: 'anxious', suggestions: ['Try deep breathing exercises', 'Take a short walk', 'Write down your thoughts'] },
  { emotion: 'calm', suggestions: ['Enjoy the moment', 'Practice mindfulness', 'Share your peace with others'] },
]

export default function MoodCheck() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedEmotion) return

    setIsSubmitting(true)
    // Here we would typically send the mood data to our backend
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    setIsSubmitting(false)
    setSelectedEmotion(null)
    setNote('')
  }

  const getSuggestions = () => {
    if (!selectedEmotion) return []
    return activities.find(a => a.emotion === selectedEmotion)?.suggestions || []
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How are you feeling today?
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Select your current emotion and get personalized suggestions for support.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {emotions.map((emotion) => {
              const Icon = emotion.icon
              return (
                <button
                  key={emotion.value}
                  onClick={() => setSelectedEmotion(emotion.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2
                    ${selectedEmotion === emotion.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                    }`}
                >
                  <Icon className={`h-8 w-8 ${emotion.color}`} />
                  <span className="text-sm font-medium text-gray-900">{emotion.label}</span>
                </button>
              )
            })}
          </div>

          {selectedEmotion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                  How are you feeling? (optional)
                </label>
                <textarea
                  id="note"
                  rows={3}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Share your thoughts..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Suggested Activities</h3>
                <ul className="space-y-2">
                  {getSuggestions().map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Mood Entry'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 