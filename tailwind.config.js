/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0e14',
          900: '#0e141d',
          850: '#131b27',
          800: '#1a2433',
          700: '#243144',
          600: '#33435c',
          500: '#4a5d78'
        },
        gold: { 400: '#e8c479', 500: '#d4a84b', 600: '#b8892f' },
        jade: { 400: '#4cc38a', 500: '#2fa971' },
        rust: { 400: '#e07a5f', 500: '#d45d3f' },
        sky: { 400: '#5ea7d6', 500: '#3d8bc4' }
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', '"PingFang TC"', '"Microsoft JhengHei"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif TC"', '"Songti TC"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
}
