// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/components/**/*.{ts,tsx}'],
  safelist: [
    'bg-red-400',
    'bg-gray-600',
    'hover:bg-red-600',
    'hover:bg-gray-800'
  ],
  theme: {
    extend: {
      colors: {
        shiny: '#8dbbff',
        'shiny-dark': '#749bd6'
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
