import React from 'react';

export default function StepCard({ item }) {
  return (
    <div className="text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-2xl">
          {item.step}
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
          {item.icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
    </div>
  );
}
