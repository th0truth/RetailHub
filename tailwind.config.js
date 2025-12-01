/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        base: {
          900: '#030712',
          800: '#0A0F1E',
          700: '#131A2C',
          600: '#1F2535',
          500: '#2C3447',
          400: '#3E465B',
          300: '#55607C',
          200: '#7A85A6',
          100: '#A6B1CF',
        },
        accent: {
          DEFAULT: '#24E0C4',
          400: '#2DF5D6',
          600: '#0CB599',
        },
        success: '#4ADE80',
        warning: '#FACC15',
        danger: '#F87171',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.25rem',
      },
      boxShadow: {
        soft: '0 20px 60px -35px rgba(0, 0, 0, 0.85)',
        card: '0 14px 45px -30px rgba(16, 185, 129, 0.5)',
      },
      backgroundImage: {
        'radial-fade':
          'radial-gradient(circle at top, rgba(36, 224, 196, 0.18), rgba(3, 7, 18, 0))',
      },
      keyframes: {
        fadeSlide: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-slide': 'fadeSlide 0.45s ease forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

