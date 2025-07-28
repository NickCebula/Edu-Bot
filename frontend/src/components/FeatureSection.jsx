import React from 'react';
import { FEATURES } from '@/data/landingContent';
import FeatureCard from '@/components/ui/FeatureCard';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Kids Love Edu‑Bot</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powered by advanced AI and designed with child‑development experts, Edu‑Bot creates a magical learning experience that adapts to every child.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  )};
