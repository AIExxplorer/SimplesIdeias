// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#72BCA5',
        'secondary': '#F4DDB4',
        'accent': '#F1AE2B',
        'danger': '#BC0B27',
        'dark': '#4A2512',
      }
    },
  },
  plugins: [],
}