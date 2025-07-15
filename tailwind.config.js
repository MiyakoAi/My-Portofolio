/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Consolas', 'Monaco', 'Courier New', 'monospace'],
        'mono': ['Consolas', 'Monaco', 'Courier New', 'monospace'],
        'serif': ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0d1117',
          border: '#30363d',
          text: '#e6edf3',
          green: '#7ee787',
          blue: '#79c0ff',
          yellow: '#f9e2af',
          red: '#ff7b72',
          purple: '#d2a8ff',
          cyan: '#76e3ea',
        }
      },
      animation: {
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideUp': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}