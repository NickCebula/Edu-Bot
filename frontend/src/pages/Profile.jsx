import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { authFetch } from "../utils/authFetch";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authFetch("/api/profile/");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <NavBar
          title="Edu-Bot"
          username="Guest"
          links={[
            { to: "/subjects", label: "SUBJECTS" },
            { to: "/evaluations", label: "EVALUATIONS" },
            { to: "/profile", label: "PROFILE" },
          ]}
        />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <NavBar
          title="Edu-Bot"
          username="Guest"
          links={[
            { to: "/subjects", label: "SUBJECTS" },
            { to: "/evaluations", label: "EVALUATIONS" },
            { to: "/profile", label: "PROFILE" },
          ]}
        />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">❗</div>
            <p className="text-gray-600 mb-4">Unable to load profile</p>
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
  }

  const subjectData = [
    { 
      name: "MATH", 
      color: "from-red-500 to-red-600",
      icon: "🔢",
      time: "2h 30m" // Placeholder - replace with actual data if available
    },
    { 
      name: "READING", 
      color: "from-green-500 to-green-600",
      icon: "📚",
      time: "3h 15m" // Placeholder - replace with actual data if available
    },
    { 
      name: "SPELLING", 
      color: "from-blue-500 to-blue-600",
      icon: "✏️",
      time: "1h 45m" // Placeholder - replace with actual data if available
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <NavBar
        title="Edu-Bot"
        username={profile.username}
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
              <span className="text-white text-4xl">👤</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              My Profile
            </h1>
            <p className="text-lg text-gray-600">
              Your learning journey and achievements
            </p>
          </div>

          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Personal Information Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">ℹ️</span>
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-900">{profile.name}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-sm">@</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-semibold text-gray-900">{profile.username}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-sm">🎂</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-semibold text-gray-900">{profile.age} years old</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-sm">📍</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">State</p>
                    <p className="font-semibold text-gray-900">{profile.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">❤️</span>
                Preferences
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                  <p className="text-sm text-pink-700 mb-1">Favorite Subject</p>
                  <p className="text-xl font-bold text-pink-900">{profile.favorite_subject}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                  <p className="text-sm text-indigo-700 mb-1">Favorite Hobby</p>
                  <p className="text-xl font-bold text-indigo-900">{profile.favorite_hobby}</p>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="mt-6">
                <Link
                  to="/subjects"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">📚</span>
                  Start Learning {profile.favorite_subject}
                </Link>
              </div>
            </div>
          </div>

          {/* Subject Time Tracking */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">⏱️</span>
              Study Time Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjectData.map((subject) => (
                <div
                  key={subject.name}
                  className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-white text-2xl">{subject.icon}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{subject.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">Total Time</p>
                    <p className="text-2xl font-bold text-gray-800">{subject.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Keep up the great work! Your dedication is paying off.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}