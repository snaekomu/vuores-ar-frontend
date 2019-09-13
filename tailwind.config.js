module.exports = {
  theme: {
    filter: {
      grayscale: 'grayscale(1)'
    },
    linearGradients: {
      colors: {
        pink: ['#FC4278', '#FF2F53']
      }
    },
    scale: {
      40: '0.4',
      50: '0.5',
      85: '0.85',
      90: '0.9',
      100: '1',
      110: '1.1',
      150: '1.5',
      175: '1.75',
      200: '2'
    },
    translate: {
      '1/2': '50%',
      '-1/2': '-50%',
      full: '100%',
      '2full': '200%'
    },
    extend: {
      colors: {
        'hot-pink': '#FF2F53',
        'dark-grey': '#383838'
      },
      margin: {
        '1/2': '50%',
        '-1/2': '-50%',
        '-full': '-100%'
      },
      spacing: {
        7: '1.75rem',
        52: '13rem',
        68: '17rem',
        72: '18rem',
        76: '19rem'
      },
      transitionProperty: {
        filter: 'filter',
        transform: 'transform'
      }
    }
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'active'],
    linearGradients: ['responsive', 'hover'],
    scale: ['responsive', 'hover', 'active']
  },
  plugins: [
    require('tailwindcss-gradients')(),
    require('tailwindcss-transforms')(),
    require('tailwindcss-transitions')(),
    require('tailwindcss-filters')()
  ]
}
