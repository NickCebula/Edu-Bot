export default function CTASection ( {email, setEmail, onSubmit, isSubmitting} ) {
return (
  <section className="py-40 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-6">Ready to Transform Learning?</h2>
      <p className="text-xl mb-8 opacity-90">
        Join families already using Edu‑Bot to make learning fun and effective.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Signing up…' : 'Start Free Trial'}
        </button>
      </div>
      <p className="text-sm opacity-75">No credit card required • 14‑day free trial • Cancel anytime</p>
    </div>
  </section>
)};