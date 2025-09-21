// tailwind.config.js
module.exports = {
  darkMode: 'class', // important: we toggle dark by adding 'dark' class to <html>
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      // add customizations if needed
    }
  },
  plugins: []
}
