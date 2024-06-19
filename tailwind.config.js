import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif']
      },
      colors: {
        fernGreen: '#468448',
        silver: '#C8C8C8',
        chineseWhite: '#E0E0E0',
        eerieBlack: '#1A1C20',
        ufoGreen: '#33C95D',
        textPrimary: '#FDFDFD',
        textSecondary: '#CDCDCD'
      },
      backgroundColor: {
        chineseBlack: '#0F0F13',
        navbar: '#0F0F0F',
        eerieBlack: '#1A1C20',
        fernGreen: '#468448',
        fernGreenSecondary: '#49824A',
        searchInput: '#23252A',
        ufoGreen: '#33C95D'
      }
    }
  },
  plugins: [flowbite.plugin()]
};
