import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Subjects({ username = "Guest" }) {
  const subjects = [
    { 
      name: "MATH", 
      path: "/math", 
      color: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      icon: "🔢",
      description: "Numbers and calculations"
    },
    { 
      name: "READING", 
      path: "/reading", 
      color: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      icon: "📚",
      description: "Stories and comprehension"
    },
    { 
      name: "SPELLING", 
      path: "/spelling", 
      color: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      icon: "✏️",
      description: "Words and letters"
    },
    { 
      name: "TEST", 
      path: "/test", 
      color: "from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
      icon: "📝",
      description: "Practice assessments"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <NavBar
        title="Edu-Bot"
        username={username}
        links={[
          { to: "/subjects", label: "SUBJECTS" },
          { to: "/evaluations", label: "EVALUATIONS" },
          { to: "/profile", label: "PROFILE" },
        ]}
      />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Subject
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select a subject to start learning and practicing. Each subject is designed to help you grow and improve your skills.
            </p>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {subjects.map((subject) => (
              <Link
                key={subject.name}
                to={subject.path}
                className="group relative"
              >
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105">
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${subject.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {subject.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
                      {subject.description}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="mt-6 relative z-10">
                    <div className={`w-full bg-gradient-to-r ${subject.color} text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 group-hover:shadow-lg`}>
                      Start Learning
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help Getting Started?
              </h2>
              <p className="text-gray-600 mb-6">
                Check your progress and see how you're doing in each subject.
              </p>
              <Link
                to="/evaluations"
                className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Evaluations
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
