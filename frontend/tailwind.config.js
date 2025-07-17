export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandYellow: '#FFE45E',
        brandBlue: '#60A5FA',
        brandPink: '#FBB6CE',
        brandGreen: '#A3E635',
        brandPurple: '#C084FC',
        correct: '#22C55E',
        wrong: '#EF4444',
      },
      fontFamily: {
        comic: ['"Comic Neue"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
