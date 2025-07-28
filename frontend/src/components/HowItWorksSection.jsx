import React from 'react';
import StepCard from '@/components/ui/StepCard';
import { STEPS } from '@/data/landingContent';


export default function HowItWorksSection () {
return (
  <section id="how-it-works" className="py-40 bg-gradient-to-br from-indigo-50 to-purple-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Learning Made Simple</h2>
        <p className="text-xl text-gray-600">Three easy steps to personalized learning</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {STEPS.map((s) => (
          <StepCard key={s.step} item={s} />
        ))}
      </div>
    </div>
  </section>
)};