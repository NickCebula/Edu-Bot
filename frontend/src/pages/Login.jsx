import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/subjects");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold mb-4">Edu-Bot Login</h2>

            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <label className="label">
                  <Link to="/forgot-password" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Logging in…" : "Login"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center">
              New to Edu-Bot?{" "}
              <Link to="/register" className="link link-primary">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
