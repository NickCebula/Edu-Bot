import { Link } from "react-router-dom";

export default function NavBarHome () {
  return (
  <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">🤖</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Edu‑Bot</span>
      </div>
      <div className="hidden md:flex space-x-8">
        <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium">Features</a>
        <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 font-medium">How It Works</a>
        <a href="#parents" className="text-gray-600 hover:text-indigo-600 font-medium">For Parents</a>
      </div>
      <Link to ="/register" className="hidden md:inline-block">
      <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 shadow-lg">Get Started Free</button>
    </Link>
    </div>
  </nav>
)};
