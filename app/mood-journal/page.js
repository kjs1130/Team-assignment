'use client';

import { useState, useEffect } from 'react';
import AnimatedFace from '../components/AnimatedFace';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function MoodJournal() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');

  const [moodEntries, setMoodEntries] = useState([]);

  // Load saved entries from localStorage when page loads
  useEffect(() => {
    const saved = localStorage.getItem('moodEntries');
    if (saved) {
      setMoodEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when moodEntries changes
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toISOString().split('T')[0], // '2025-06-01' 이런 식으로
      mood: mood,
    };
    setMoodEntries([ ...moodEntries, newEntry ]);
    setNote('');
    setMood(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-purple-800">
          Mood Journal
        </h1>
        
        <div className="bg-white rounded-3xl shadow-lg p-10 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* How are you feeling section */}
            <div>
              <label className="block text-2xl font-semibold text-gray-800 mb-4">
                How are you feeling today? (1-10)
              </label>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-grow">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={mood}
                    onChange={(e) => setMood(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  {/* Sad/Happy labels */}
                  <div className="flex justify-between text-lg text-gray-600 mt-1">
                    <span>😞 Sad</span>
                    <span>😊 Happy</span>
                  </div>
                </div>
                {/* Animated Face */}
                <div className="flex-shrink-0 flex justify-center">
                  <AnimatedFace mood={mood} className="w-32 h-32 sm:w-40 sm:h-40"/>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-2xl font-semibold text-gray-800 mb-2">
                Notes
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 resize-none text-gray-800"
                placeholder="How was your day? What made you feel this way?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Save Entry
            </button>
          </form>
        </div>

        {/* Updated Mood Trend Chart Section Styling */}
        <div className="mt-12 px-4 py-6 bg-white rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            Mood Trend
          </h2>
          <ResponsiveContainer width="100%" height={420}>
            <LineChart
              data={moodEntries.sort((a, b) => new Date(a.date) - new Date(b.date))} // 최근 날짜가 오른쪽
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
              <XAxis 
                dataKey="date"
                tickFormatter={(str) => {
                  const date = new Date(str);
                  return `${date.getMonth() + 1}/${date.getDate()}`; // "6/1" 형식
                }}
                tick={{ fill: '#6b7280', fontSize: 14 }}
              />
              <YAxis
                type="number"
                domain={[1, 10]}
                ticks={[1, 3, 5, 7, 9, 10]}
                tick={{ fill: '#6b7280', fontSize: 14 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#8b5cf6' }}
                itemStyle={{ color: '#8b5cf6' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#8b5cf6"
                strokeWidth={4}
                dot={{
                  r: 8,
                  stroke: '#8b5cf6',
                  strokeWidth: 3,
                  fill: 'white',
                  shadowBlur: 4,
                }}
                activeDot={{
                  r: 10,
                  stroke: '#8b5cf6',
                  strokeWidth: 4,
                  fill: '#f3e8ff',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Consistent spacing between sections */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Previous Entries
          </h2>
          {/* This is where you would list previous entries - map over moodEntries */}
          {moodEntries.map((entry) => (
            <div key={entry.date} className="bg-purple-50 rounded-lg p-4 mb-4">
              <p className="text-purple-800 font-bold">Date: {entry.date}</p>
              <p className="text-purple-700">Mood: {entry.mood}</p>
              <p className="text-gray-700 mt-2">Notes: {entry.note || 'None'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 