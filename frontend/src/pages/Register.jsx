import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "", email: "", password: "", confirm_password: "",
    name: "", age: "", state: "", favorite_subject: "", favorite_hobby: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      username: form.username,
      email: form.email,
      password1: form.password,
      password2: form.confirm_password,
      name: form.name,
      age: form.age,
      state: form.state,
      favorite_subject: form.favorite_subject,
      favorite_hobby: form.favorite_hobby
    };

    fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include"
    })
      .then(r => r.json())
      .then(data => {
        if (data.detail || data.error) {
          setMessage(data.detail || data.error);
        } else if (data.username || data.password1) {
          const errors = [];
          for (let field in data) {
            errors.push(`${field}: ${data[field].join(", ")}`);
          }
          setMessage(errors.join(" | "));
        } else {
          setMessage("Registered! Redirecting…");
          setTimeout(() => navigate("/login"), 1000);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Registration failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link to="/" className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Go to landing page">
          <span className="text-white font-bold text-4xl">🤖</span>
        </Link>
        <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join us to start your learning journey
        </p>
      </div>

      {/* Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg">
        {message && (
          <div className={`mb-4 rounded-md p-4 text-sm border ${
            message.includes("error") || message.includes("failed") 
              ? "bg-red-50 text-red-700 border-red-200" 
              : message.includes("Registered") 
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
          }`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Choose a username"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Your full name"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-900">
              Age
            </label>
            <select
              id="age"
              name="age"
              required
              value={form.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Age</option>
              {[...Array(15)].map((_, i) => (
                <option key={i+4} value={i+4}>{i+4}</option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-900">
              State
            </label>
            <select
              id="state"
              name="state"
              required
              value={form.state}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select State</option>
              {[
                "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
                "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
                "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
                "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
                "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
              ].map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Favorite Subject */}
          <div>
            <label htmlFor="favorite_subject" className="block text-sm font-medium text-gray-900">
              Favorite Subject
            </label>
            <select
              id="favorite_subject"
              name="favorite_subject"
              required
              value={form.favorite_subject}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Favorite Subject</option>
              <option value="Math">Math</option>
              <option value="Reading">Reading</option>
              <option value="Spelling">Spelling</option>
            </select>
          </div>

          {/* Favorite Hobby */}
          <div>
            <label htmlFor="favorite_hobby" className="block text-sm font-medium text-gray-900">
              Favorite Hobby
            </label>
            <input
              id="favorite_hobby"
              name="favorite_hobby"
              type="text"
              required
              value={form.favorite_hobby}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="What do you love to do?"
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                value={form.confirm_password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-pink-600 hover:font-bold transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}