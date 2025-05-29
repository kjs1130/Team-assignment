import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon, ChartBarIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Discover Your Emotional Intelligence with{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  EmotiType
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Explore your personality traits and emotional states through AI-powered insights. 
                Get personalized recommendations and track your emotional journey.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/personality"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Start Your Journey
                  <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5 inline" />
                </Link>
                <Link href="/mood" className="text-sm font-semibold leading-6 text-gray-900">
                  Check Your Mood <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">AI-Powered Insights</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to understand yourself better
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            EmotiType combines advanced AI technology with psychological insights to help you explore and understand your personality and emotions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <SparklesIcon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Smart Personality Analysis
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Get detailed insights into your personality traits using our advanced AI-powered analysis system.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <ChartBarIcon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Mood Tracking
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Track your emotional patterns over time and receive personalized recommendations for emotional well-being.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <HeartIcon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Emotional Support
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Receive AI-powered emotional support and guidance tailored to your current state and needs.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
