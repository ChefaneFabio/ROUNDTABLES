/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Maka Learning Management Centre brand colors
        primary: {
          50: '#fdfdf5',
          100: '#f9f7e8',
          200: '#f0ecc5',
          300: '#e4dc9a',
          400: '#c9be6a',
          500: '#a89d4f',
          600: '#848642',
          700: '#6b6d36',
          800: '#565830',
          900: '#484a2b',
        },
        accent: {
          50: '#fffdf0',
          100: '#fff9d6',
          200: '#fff3ad',
          300: '#ffeb7a',
          400: '#ffdf47',
          500: '#FFCC2E',
          600: '#e6b000',
          700: '#bf8f00',
          800: '#996f08',
          900: '#7a5a0d',
        },
        // Portal colors
        corporate: {
          500: '#1e40af',
          600: '#1e3a8a',
          700: '#172554',
        },
        teacher: {
          500: '#059669',
          600: '#047857',
          700: '#065f46',
        },
        student: {
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}