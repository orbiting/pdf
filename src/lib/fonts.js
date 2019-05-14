import { Font } from '@react-pdf/renderer'

const DEV = process.env.NODE_ENV !== 'production'

if (DEV || process.env.DOTENV) {
  require('dotenv').config()
}

const fonts = JSON.parse(process.env.FONTS || '{}')

Object.keys(fonts).forEach(key => {
  const font = fonts[key]
  if (font.url) {
    Font.register({
      family: font.family,
      src: font.url
    })
  }
})

export const fontFamilies = Object.keys(fonts)
  .reduce((acc, key) => ({ ...acc, [key]: fonts[key].family }), {})
