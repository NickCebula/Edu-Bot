import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { SUBJECTS} from '@/data/landingContent';
import SubjectBadge from '@/components/ui/SubjectBadge';

export default function HeroSection ({email, setEmail, onSubmit, isSubmitting}){
  const [mascotAnimation, setMascotAnimation] = useState('bounce');

  useEffect(() => {
    const animations = ['bounce', 'wiggle', 'pulse'];
    const interval = setInterval(() => {
      setMascotAnimation(animations[Math.floor(Math.random() * animations.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-10 h-10 bg-yellow-200 rounded-full opacity-20 animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-10 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-30 left-40 w-12 h-12 bg-red-200 rounded-full opacity-40 animate-bounce" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-200 rounded-full opacity-30 animate-pulse"/>

      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 hover:scale-110 transition-transform duration-300">
            Meet Your Child's
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block pb-1">AI Learning Buddy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Edu‑Bot makes learning as fun as playing games! With voice interaction,
            personalized lessons, and a cute mascot to customize, your child will
            love practicing reading, math, and spelling.
          </p>

          {/* Subject badges */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
            {SUBJECTS.map((s) => (
              <SubjectBadge key={s.name} subject={s} />
            ))}
          </div>

          {/* Email signup */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Signing up…' : 'Start Learning'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">Free to try • Common Core aligned • No credit card required</p>
        </div>

            {/* Mascot */}
        <div className="flex justify-center lg:justify-end">
        <div className={`relative animate-${mascotAnimation}`}>
            <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 rounded-full relative shadow-2xl">
            {/* robot face */}
            <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl lg:text-8xl animate-bounce">
                🤖
            </div>

            {/* ⭐ */}
            <div className="absolute -top-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl sm:text-2xl animate-spin">
                ⭐
            </div>
            {/* 🎉 */}
            <div className="absolute -bottom-3 -right-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl sm:text-3xl animate-pulse">
                🎉
            </div>
            {/* 💎 */}
            <div className="absolute top-1/4 -right-4 sm:-right-6 lg:-right-8 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-lg sm:text-xl animate-bounce">
                💎
            </div>
            </div>
        </div>
        </div>
      </div>
    </section>
  );
};