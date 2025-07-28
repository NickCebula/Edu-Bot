import { Brain, Mic, BookOpen, Award, TrendingUp, Zap } from 'lucide-react';
import { Users, Volume2, Star } from 'lucide-react';

export const FEATURES = [
  {
      icon: <Brain className="w-8 h-8" />,
    title: 'AI‑Powered Learning',
    description:
      "Adaptive curriculum that evolves with your child's progress using GPT‑4o‑mini.",
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: 'Voice Interaction',
    description:
      'Kids speak answers and hear responses with natural TTS technology.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Common Core Aligned',
    description:
      'Every lesson mapped to U.S. Common Core standards for Pre‑K – 5.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Gamified Experience',
    description: 'Earn coins, customize mascots, and unlock rewards as you learn.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Parent Insights',
    description: 'Detailed reports and AI‑generated evaluations for parents.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Works Offline',
    description: 'Runs on Raspberry Pi with cached lessons for uninterrupted fun.',
    color: 'from-yellow-500 to-amber-600',
  },
];

export const SUBJECTS = [
  { name: 'Reading', icon: '📚', color: 'bg-blue-100 text-blue-800' },
  { name: 'Math', icon: '🔢', color: 'bg-green-100 text-green-800' },
  { name: 'Spelling', icon: '✏️', color: 'bg-purple-100 text-purple-800' },
];

export const STEPS = [
  {
    step: '1',
    title: 'Create Profile',
    description: "Tell us about your child's age, grade, and interests.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    step: '2',
    title: 'Start Learning',
    description: 'Edu‑Bot creates personalized lessons and listens to responses.',
    icon: <Volume2 className="w-8 h-8" />,
  },
  {
    step: '3',
    title: 'Track Progress',
    description: 'Watch growth with detailed insights and celebrations.',
    icon: <Star className="w-8 h-8" />,
  },
];