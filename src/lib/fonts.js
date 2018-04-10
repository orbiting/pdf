import { Font } from '@react-pdf/core'

require('dotenv').config()

const fonts = JSON.parse(process.env.FONTS || '{}')

Object.keys(fonts).forEach(key => {
  const font = fonts[key]
  if (font.url) {
    Font.register(font.url, {
      family: font.family
    })
  }
})

export const fontFamilies = Object.keys(fonts)
  .reduce((acc, key) => ({ ...acc, [key]: fonts[key].family }), {})
