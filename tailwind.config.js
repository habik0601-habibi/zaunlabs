/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Spline-matched palette — icy blue sky, soft white, cobalt deep
        spline: {
          sky: '#B8D8F8',       // Spline scene light-blue sky
          iceBlue: '#D6ECFF',   // pale ice-blue
          mid: '#4A90D9',       // mid cobalt blue
          deep: '#1A4A8A',      // deep hero blue
          navy: '#0D2851',      // darkest section bg
          white: '#FFFFFF',
          offWhite: '#F7FBFF',  // near-white with blue tint
        },
        zaun: {
          emerald: '#005F33',
          lightGreen: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        // Matches Spline's blue-to-white radial atmosphere
        'spline-radial': 'radial-gradient(ellipse at 50% 0%, #B8D8F8 0%, #D6ECFF 35%, #FFFFFF 70%)',
        'spline-hero': 'linear-gradient(180deg, #B8D8F8 0%, #D6ECFF 40%, #FFFFFF 100%)',
        'section-blue': 'linear-gradient(180deg, #EAF4FF 0%, #F7FBFF 100%)',
        'footer-bg': 'linear-gradient(180deg, #0D2851 0%, #08172E 100%)',
      },
      animation: {
        'float': 'float 6s infinite ease-in-out',
        'pulse-soft': 'pulseSoft 4s infinite ease-in-out',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
