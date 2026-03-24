import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent:     '#4f46e5',
        'accent-d': '#3730a3',
        'accent-lt':'#eef2ff',
        green:      '#16a34a',
        amber:      '#d97706',
        red:        '#dc2626',
        cyan:       '#0891b2',
        ink:        '#0d1117',
        muted:      '#8b949e',
      },
      fontFamily: {
        sans:  ['Outfit', 'sans-serif'],
        mono:  ['DM Mono', 'monospace'],
        syne:  ['Syne', 'sans-serif'],
        dm:    ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
        sm: '7px',
        lg: '14px',
        xl: '20px',
      },
    },
  },
  plugins: [],
}

export default config
