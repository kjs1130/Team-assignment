'use client';

<div className="mt-10"></div>

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import AnimatedFace from '../components/AnimatedFace';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function MoodJournal() {
  const { data: session, status } = useSession();
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');
  const [moodEntries, setMoodEntries] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status !== 'loading' && !session) {
      signIn('google', { callbackUrl: '/mood-journal' });
    }
  }, [session, status]);

  // Load saved entries from Firestore when page loads
  const loadEntries = async () => {
    if (status === 'authenticated' && session?.user?.email) {
      try {
        const q = query(
          collection(db, 'moodEntries'),
          where('userEmail', '==', session.user.email),
          orderBy('timestamp', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const entries = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMoodEntries(entries);
      } catch (error) {
        console.error('Error loading entries:', error);
      }
    }
  };

  useEffect(() => {
    loadEntries();
  }, [session, status, loadEntries]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      alert('Please sign in to save your mood entry');
      return;
    }

    try {
      const newEntry = {
        date: new Date().toISOString().split('T')[0],
        mood: mood,
        note: note,
        userEmail: session.user.email,
        timestamp: serverTimestamp(),
      };

      // Save to Firestore
      await addDoc(collection(db, 'moodEntries'), newEntry);

      // Reset and reload
      setNote('');
      setMood(5);
      await loadEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'moodEntries', id));
      await loadEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry. Please try again.');
    }
  };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-800 text-xl">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-purple-800">
          Mood Journal
        </h1>

        {/* Mood Input Form */}
        <div className="bg-white rounded-3xl shadow-lg p-10 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  <div className="flex justify-between text-lg text-gray-600 mt-1">
                    <span>😞 Sad</span>
                    <span>😊 Happy</span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex justify-center">
                  <AnimatedFace mood={mood} className="w-32 h-32 sm:w-40 sm:h-40" />
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

        {/* Mood Trend Chart */}
        <div className="mt-12 px-4 py-6 bg-white rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            Mood Trend
          </h2>
          <ResponsiveContainer width="100%" height={420}>
            <LineChart
              data={moodEntries
                .slice()
                .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds)}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => {
                  if (!timestamp?.seconds) return '';
                  const date = new Date(timestamp.seconds * 1000);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
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

        {/* Previous Entries */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Previous Entries
          </h2>
          {moodEntries.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              No entries yet. Start by adding your first mood entry!
            </p>
          ) : (
            moodEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-purple-50 rounded-lg p-4 mb-4 relative"
              >
                {/* 삭제 버튼 (오른쪽 상단) */}
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="absolute top-3 right-4 text-sm text-red-500 underline hover:text-red-700"
                >
                  삭제
                </button>

                <p className="text-purple-800 font-bold">Date: {entry.date}</p>
                <p className="text-purple-700">Mood: {entry.mood}</p>
                <p className="text-gray-700 mt-2">Notes: {entry.note || 'None'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
