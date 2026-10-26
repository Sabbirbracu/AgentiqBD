import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0B',
          900: '#0A0A0B',
          800: '#111113',
          700: '#18181B',
          600: '#222226',
          500: '#2E2E33',
          400: '#4A4A52',
          300: '#7A7A84',
        },
        paper: {
          DEFAULT: '#FCFCF4',
          50: '#FEFEFA',
          100: '#FCFCF4',
          200: '#F4F4E8',
          300: '#E9E9D9',
          400: '#D6D6C2',
        },
        signal: {
          DEFAULT: '#E84F3D',
          300: '#F08272',
          400: '#EC6552',
          500: '#E84F3D',
          600: '#CC3B2A',
          700: '#A52D1F',
        },
        // Hero artwork palette (sampled from the approved hero design)
        flame: { DEFAULT: '#FC522C', 600: '#E8431F' },
        scarlet: '#F33B2E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        dash: {
          to: { strokeDashoffset: '-24' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        smoke: {
          '0%': { transform: 'translate(0,0) scale(0.6)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '100%': { transform: 'translate(26px,-74px) scale(2)', opacity: '0' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(3.5px) rotate(0.5deg)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        'marquee-reverse': 'marqueeReverse 56s linear infinite',
        dash: 'dash 1.2s linear infinite',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.2,0.6,0.3,1) infinite',
        smoke: 'smoke 9s ease-out infinite',
        bob: 'bob 5s ease-in-out infinite',
        floaty: 'floaty 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
