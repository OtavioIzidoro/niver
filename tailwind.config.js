/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matte: {
          black: '#0a0a0a',
          'black-light': '#111111',
        },
        brown: {
          50: '#efebd9',
          100: '#d4c5a9',
          200: '#b8a078',
          300: '#9d7a47',
          400: '#825416',
          500: '#674000',
          600: '#523300',
          700: '#3d2600',
          800: '#281900',
          900: '#130d00',
        },
        amber: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        bronze: {
          400: '#cd7f32',
          500: '#b87333',
          600: '#9c5f1f',
        }
      },
      fontFamily: {
        display: ['"Fredoka One"', 'cursive'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

