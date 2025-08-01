// src/pages/Subjects.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import {
  Calculator,
  BookOpen,
  SpellCheck2,
  ClipboardList,
} from 'lucide-react';   // icons ⇒ npm i lucide-react

// Centralised list so it's easy to add / reorder subjects later
const subjects = [
  { id: 'math',     title: 'Math',     icon: Calculator,    bg: 'bg-red-500' },
  { id: 'reading',  title: 'Reading',  icon: BookOpen,      bg: 'bg-green-500' },
  { id: 'spelling', title: 'Spelling', icon: SpellCheck2,   bg: 'bg-yellow-300' },
  { id: 'test',     title: 'Test',     icon: ClipboardList, bg: 'bg-blue-500' },
];

export default function Subjects() {
  const nav = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';

  return (
    <>
      <NavBar
        title="Edu-Bot"
        username={username}
        links={[
          { to: '/subjects',    label: 'SUBJECTS' },
          { to: '/evaluations', label: 'EVALUATIONS' },
          { to: '/profile',     label: 'PROFILE' },
        ]}
      />

      {/* --- main content --- */}
      <main className="min-h-[calc(100vh-4rem)] bg-surface py-10">
        <h2 className="mb-8 text-center text-3xl font-display text-primary">
          SUBJECTS
        </h2>

        <section className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map(({ id, title, icon: Icon, bg }) => (
            <button
              key={id}
              onClick={() => nav(`/${id}`)}
              className={`group relative overflow-hidden rounded-2xl p-6 text-left shadow transition hover:scale-105 ${bg}`}
            >
              <Icon className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary">
                {title}
              </h3>
              <span className="absolute right-4 top-4 text-gray-400 group-hover:text-primary/60">
                ➔
              </span>
            </button>
          ))}
        </section>
      </main>
    </>
  );
}