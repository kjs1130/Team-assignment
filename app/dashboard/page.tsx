'use client'

import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Sample data - in a real app, this would come from your backend
const moodData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Mood Score',
      data: [7, 6, 8, 5, 7, 9, 8],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      tension: 0.4,
    },
  ],
}

const personalityData = {
  labels: ['Extraversion', 'Openness', 'Conscientiousness', 'Agreeableness', 'Neuroticism'],
  datasets: [
    {
      data: [65, 80, 70, 85, 45],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
      ],
      borderWidth: 1,
    },
  ],
}

const insights = [
  {
    title: 'Personality Growth',
    description: 'Your openness to experience has increased by 15% over the last month.',
    type: 'positive',
  },
  {
    title: 'Emotional Pattern',
    description: 'You tend to feel more positive on weekends and after exercise.',
    type: 'neutral',
  },
  {
    title: 'Stress Management',
    description: 'Consider practicing mindfulness during high-stress periods.',
    type: 'suggestion',
  },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Emotional Journey
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Track your mood patterns and personality insights over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mood Tracking Chart */}
          <div className="bg-white shadow-xl rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Mood Trends</h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <div className="h-80">
              <Line
                data={moodData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 10,
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Personality Insights */}
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personality Profile</h2>
            <div className="h-80">
              <Doughnut
                data={personalityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">AI-Generated Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">{insight.title}</h3>
                <p className="text-gray-600">{insight.description}</p>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        insight.type === 'positive'
                          ? 'bg-green-100 text-green-800'
                          : insight.type === 'neutral'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                  >
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 