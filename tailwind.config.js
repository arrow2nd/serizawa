// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/components/**/*.{ts,tsx}'],
  safelist: [
    'hidden',
    'bg-red-400',
    'bg-gray-600',
    'hover:bg-red-600',
    'hover:bg-gray-800'
  ],
  theme: {
    extend: {
      colors: {
        chiyuki: '#FBFAFA',
        luca: '#1E140E',
        rinze: '#89C3EB',
        yuika: '#3B91C4'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.drag': {
          '-webkit-app-region': 'drag'
        },
        '.drag-none': {
          '-webkit-user-drag': 'none',
          '-webkit-app-region': 'no-drag',
          'user-select': 'none'
        }
      }
      addUtilities(newUtilities)
    })
  ]
}
