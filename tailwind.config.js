/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f0',
          100: '#ffe8db',
          200: '#ffcdb2',
          300: '#ffab7a',
          400: '#ff7f40',
          500: '#ff6b35',
          600: '#f0511a',
          700: '#c73d0f',
          800: '#9d3010',
          900: '#7e2c11',
        },
        secondary: {
          50: '#fff9e6',
          100: '#ffefb3',
          200: '#ffe180',
          300: '#ffd34d',
          400: '#f7931e',
          500: '#e6850e',
          600: '#cc7700',
          700: '#b36800',
          800: '#995900',
          900: '#804b00',
        },
        accent: {
          50: '#f0fdfc',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#26d0ce',
          500: '#4ecdc4',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        success: {
          500: '#95e06c',
        },
        warning: {
          500: '#ffb84d',
        },
        error: {
          500: '#ff6b6b',
        },
        cream: '#fff8f3',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}