const DEV = process.env.NODE_ENV !== 'production'

if (DEV || process.env.DOTENV) {
  require('dotenv').config()
}

const colors = JSON.parse(process.env.COLORS || '{}')

export default colors
