
import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer (){
    return (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">🤖</span>
        </div>
        <span className="text-2xl font-bold">Edu‑Bot</span>
      </div>
      <div className="flex space-x-8 text-sm">
        <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
        <a href="#" className="hover:text-indigo-400">Terms of Service</a>
        <a href="#" className="hover:text-indigo-400">Contact Us</a>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} Edu‑Bot. Made with <Heart className="w-4 h-4 inline text-red-500" /> for young learners.
    </div>
  </footer>
)};