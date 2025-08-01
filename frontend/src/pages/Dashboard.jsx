import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { authFetch } from "../utils/authFetch";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/api/profile/").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <NavBar title="Edu-Bot" links={[]} />
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <NavBar title="Edu-Bot" links={[]} />
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">❗</div>
          <p className="text-gray-600 mb-4">Unable to load profile data</p>
          <Link 
            to="/subjects" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300"
          >
            Go to Subjects
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <NavBar 
        title="Edu-Bot" 
        username={profile.username || "Guest"}
        links={[
          { to: "/subjects", label: "SUBJECTS" },
          { to: "/evaluations", label: "EVALUATIONS" },
          { to: "/profile", label: "PROFILE" },
        ]} 
      />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-4xl">📊</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Welcome back! Here's your learning overview.
            </p>
          </div>

          {/* Profile Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Grade Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🎓</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Grade</p>
                  <p className="text-2xl font-bold text-gray-900">{profile.grade || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Favorite Subject Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">❤️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Favorite Subject</p>
                  <p className="text-lg font-semibold text-gray-900">{profile.favorite_subject || 'Not set'}</p>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-lg font-semibold text-gray-900">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {profile.notes && (
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">📝</span>
                Notes
              </h2>
              <p className="text-gray-700 leading-relaxed">{profile.notes}</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/subjects"
                className="flex items-center p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span className="text-2xl mr-3">📚</span>
                <div>
                  <p className="font-semibold">Subjects</p>
                  <p className="text-sm opacity-90">Start learning</p>
                </div>
              </Link>

              <Link
                to="/evaluations"
                className="flex items-center p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span className="text-2xl mr-3">📈</span>
                <div>
                  <p className="font-semibold">Evaluations</p>
                  <p className="text-sm opacity-90">Check progress</p>
                </div>
              </Link>

              <Link
                to="/profile"
                className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span className="text-2xl mr-3">👤</span>
                <div>
                  <p className="font-semibold">Profile</p>
                  <p className="text-sm opacity-90">View details</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}