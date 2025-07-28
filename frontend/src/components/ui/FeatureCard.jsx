import React from 'react';

export default function FeatureCard({ feature }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg bg-gradient-to-br ${feature.color}`}>
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );
}
