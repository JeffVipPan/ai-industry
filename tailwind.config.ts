import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: '#fbfbfd',
          panel: 'rgba(255, 255, 255, 0.84)',
          border: 'rgba(210, 210, 215, 0.86)',
          cyan: '#0071e3',
          blue: '#5ac8fa',
          violet: '#af52de',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Helvetica Neue', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['SFMono-Regular', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 12px 32px rgba(0, 102, 204, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
