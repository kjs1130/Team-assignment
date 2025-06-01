import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Simple Personality Test',
      description: 'Discover your personality type',
      icon: '🎯',
      href: '/personality',
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
      href: '/mood-advice',
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
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        {/* Site Title */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
          EmotiType
        </h1>

        {/* Feature Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group relative overflow-hidden rounded-3xl bg-white p-5 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative flex flex-col items-center text-center">
                <span className="text-4xl sm:text-5xl lg:text-6xl mb-5 block transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
