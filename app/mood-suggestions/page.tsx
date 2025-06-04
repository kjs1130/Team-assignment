'use client';

import React, { useState } from 'react';

const moodOptions = [
  'Happy', 'Sad', 'Anxious', 'Bored', 'Lonely', 'Stressed', 'Angry', 'Tired',
];

export default function MoodSuggestionsPage() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [mbti, setMbti] = useState<string>('');
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleMoodChange = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood)
        ? prev.filter((m) => m !== mood)
        : [...prev, mood]
    );
  };

  const handleSubmit = async () => {
    if (selectedMoods.length === 0 || mbti.trim() === '') {
      alert('Please select at least one mood and enter your MBTI.');
      return;
    }

    setLoading(true);
    setRecommendations('');

    const response = await fetch('/api/get-activity-suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moods: selectedMoods, mbti }),
    });

    const data = await response.json();
    setRecommendations(data.recommendations);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-purple-700">
          Mood & Task Suggestions
        </h1>

        <p className="text-center mb-4 text-gray-600">
          Select how you're feeling right now:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-8">
          {moodOptions.map((mood) => (
            <label
              key={mood}
              className="flex items-center space-x-2 bg-purple-50 rounded-lg px-3 py-2 cursor-pointer hover:bg-purple-100 transition"
            >
              <input
                type="checkbox"
                checked={selectedMoods.includes(mood)}
                onChange={() => handleMoodChange(mood)}
                className="accent-purple-500"
              />
              <span className="text-gray-800">{mood}</span>
            </label>
          ))}
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">Your MBTI:</label>
          <input
            type="text"
            placeholder="e.g. INFP"
            value={mbti}
            onChange={(e) => setMbti(e.target.value.toUpperCase())}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : '입력'}
          </button>
        </div>

        {recommendations && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">AI Recommendations:</h2>
            <p className="whitespace-pre-line text-gray-700">{recommendations}</p>
          </div>
        )}
      </div>
    </main>
  );
}
