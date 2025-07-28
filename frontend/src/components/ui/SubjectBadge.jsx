import React from 'react';

export default function SubjectBadge({ subject }) {
  const Icon = subject.icon;

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${subject.color}`}
    >
      {typeof Icon === 'string' ? (
        <span>{Icon}</span>
      ) : (
        <Icon className="w-6 h-6" />
      )}
      <span>{subject.name}</span>
    </span>
  );
}
