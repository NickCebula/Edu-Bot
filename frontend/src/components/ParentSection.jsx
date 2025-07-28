
import React from 'react';
import { CheckCircle } from 'lucide-react';


export default function ParentSection () {
    return (
  <section id="parents" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Peace of Mind for Parents</h2>
        <p className="text-xl text-gray-600 mb-8">
          Get detailed insights into your child's learning journey with AI‑generated reports, accuracy tracking, and curriculum alignment.
        </p>
        <div className="space-y-4">
          {[
            'Real‑time progress tracking',
            'Common Core standard alignment',
            'Personalized recommendations',
            'Safe, ad‑free environment',
            'Works offline on any device',
          ].map((b) => (
            <div key={b} className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-xl">📊</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Parent Dashboard</h3>
        <p className="text-gray-600 mb-6">
          Track streaks, see skill improvements, and get tips to support your child's education.
        </p>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-6 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-lg">View Demo Dashboard</button>
      </div>
    </div>
  </section>
)};