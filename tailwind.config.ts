import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        cyber: {
          dark: '#0f172a',
          darker: '#0a0e27',
          glow: '#0ff',
          danger: '#ff1744',
          warning: '#ffa500',
          success: '#00ff88',
        }
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(15, 255, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(15, 255, 255, 0.8)' },
        }
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config
