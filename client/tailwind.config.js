/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'slight-grey' : "rgba(217, 217, 217, 0.25)",
      },
    },
  },
  plugins: [],
}

