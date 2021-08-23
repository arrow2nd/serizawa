// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    content: ['./src/components/**/*.{ts,tsx}'],
    safelist: [
      'bg-red-400',
      'bg-gray-600',
      'hover:bg-red-600',
      'hover:bg-gray-800'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        shiny: '#8dbbff',
        'shiny-dark': '#749bd6'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.drag': {
          '-webkit-app-region': 'drag'
        },
        '.drag-none': {
          '-webkit-user-drag': 'none',
          '-webkit-app-region': 'no-drag'
        },
        '.-transform-50': {
          transform: 'translate(-50%, -50%)'
        }
      }
      addUtilities(newUtilities)
    })
  ]
}
