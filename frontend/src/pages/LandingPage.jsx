import 'tailwindcss/tailwind.css';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-white font-sans">
      
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-blue-700 shadow-md">
        <div className="text-2xl font-bold">
          <img src="https://edubot-media-storage.s3.amazonaws.com/images/logo.png" alt="EduBot Logo" className="h-10 inline-block mr-2" />
          Edu-Bot
        </div>
        <nav className="space-x-4">
          <a href="/login" className="hover:underline">Log In</a>
          <a href="/register" className="hover:underline">Sign Up</a>
          <a href="/profile" className="hover:underline">Profile</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Welcome to Edu-Bot</h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8 text-white/90">
          Your AI-powered tutor, here to help your child master math, reading, and spelling — all at their own pace.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-md hover:bg-blue-100 transition transform hover:scale-105"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-xl shadow-md hover:bg-blue-900 transition transform hover:scale-105"
          >
            Log In
          </a>
          <a
            href="/profile"
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 transition transform hover:scale-105"
          >
            Profile
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-center py-4 text-sm text-white/80 mt-8">
        © {new Date().getFullYear()} Edu-Bot • Built with love and Tailwind CSS
      </footer>
    </div>
  );
}
