import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/services/auth';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // update individual field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // simple front‑end required fields guard
  const isFormValid = form.username.trim() && form.password.trim();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isFormValid) return;
  setError('');
  setLoading(true);
  try{
    await login(form.username, form.password);
    navigate('/subjects');
    }
  catch {
    setError('Invalid username or password. Please try again.');
  }
  finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <Link to="/" className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Go to landing page">
          <span className="text-white font-bold text-4xl">🤖</span>
        </Link>
        <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h1>
      </div>

      {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200" role="alert">
          {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* USERNAME */}
            <div>
          <div className="flex items-center justify-between">
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            {/* Empty span to align with Forgot? link on password */}
            <span className="text-sm font-medium text-indigo-600 opacity-0 select-none">Forgot?</span>
          </div>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={form.username}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          />
            </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-pink-600 hover:font-bold transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-600">
          Not a member?{' '}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-pink-600 hover:font-bold transition-colors"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
