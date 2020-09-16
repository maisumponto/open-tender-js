export const centsToDollars = (cents) => (cents / 100).toFixed(2)

export const buttonsKeypad = [
  '1234567890'.split(''),
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  ['Clr', ...'zxcvbnm'.split(''), 'Del'],
]

export const buttonsNumpad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['Clr', 0, 'Del'],
]

export const buttonsCheckout = [
  [1, 2, 3, '$5'],
  [4, 5, 6, '$10'],
  [7, 8, 9, '$20'],
  ['Clr', 0, '00', 'Next $'],
]

export const reduceKeypad = (value, key, clear) => {
  const current = clear ? '' : value
  switch (key) {
    case 'Clear':
    case 'Clr':
      return ''
    case 'Delete':
    case 'Del':
      return value.slice(0, -1)
    case 'Space':
      return current + ' '
    default:
      return current + key
  }
}

export const reduceNumpad = (value, key, clear) => {
  const current = clear ? '' : value
  switch (key) {
    case 'Clear':
    case 'Clr':
      return ''
    case 'Delete':
    case 'Del':
      return value.slice(0, -1)
    default:
      return current + key
  }
}

export const reduceCheckout = (value, key, clear) => {
  const current = !key.toString().includes('$') && clear ? '' : value
  switch (key) {
    case 'Clear':
    case 'Clr':
      return '0.00'
    case 'Next $': {
      const [dollars] = current.split('.')
      const val = (parseInt(dollars) + 1) * 100
      return centsToDollars(val)
    }
    case '$5':
    case '$10':
    case '$20': {
      const keyValue = parseInt(key.replace('$', '')) * 100
      const [dollars, cents] = current.split('.').map((n) => parseInt(n))
      let val
      if (cents > 0 || dollars % 10 > 0) {
        val =
          Math.floor(parseInt(current.replace('.', '')) / keyValue) * keyValue +
          keyValue
      } else {
        val = dollars * 100 + keyValue
      }
      return centsToDollars(val)
    }
    default: {
      const val = parseInt(current.replace('.', '') + key)
      return centsToDollars(val)
    }
  }
}