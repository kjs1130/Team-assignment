import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const features = [
    {
      title: 'Simple Personality Test',
      description: 'Discover your personality type',
      icon: '🎯',
      href: '/psych-test',
      color: 'from-pink-400 to-rose-400',
    },
    {
      title: 'MBTI Match',
      description: 'Compare your real vs MBTI personality',
      icon: '🎭',
      href: '/personality-match',
      color: 'from-purple-400 to-indigo-400',
    },
    {
      title: 'Mood & Task Suggestions',
      description: 'Get personalized recommendations',
      icon: '✨',
      href: '/mood-suggestions',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      title: 'Mood Journal',
      description: 'Track your daily mood and thoughts',
      icon: '📝',
      href: '/mood-journal',
      color: 'from-green-400 to-emerald-400',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Site Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-12 sm:mb-16 text-purple-700">
          EmotiType
        </h1>

        {/* Feature Buttons Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group flex items-center rounded-2xl bg-white p-6 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className={`flex items-center justify-center rounded-full p-3 mr-5 ${feature.color} text-white`}>
                 <span className="text-2xl sm:text-3xl lg:text-4xl">
                  {feature.icon}
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
                  {feature.title}
                </h2>
                <p className="text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
               <ArrowRightIcon className="h-6 w-6 text-gray-400 ml-auto group-hover:text-purple-600 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
