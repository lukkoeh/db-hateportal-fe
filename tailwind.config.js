/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/bundle.js", "index.html"],
  theme: {
    extend: {
      animation: {
        fadeInFromBottom: 'fadeInFromBottom 0.5s ease-in',
        fadeOutToBottom: 'fadeOutToBottom 0.5s ease-out'
      },

      keyframes: theme => ({
        fadeInFromBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeOutToBottom: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      }),
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

