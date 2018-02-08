import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Link
} from '@react-pdf/core'

import https from 'https'
import fs from 'fs'
import { basename, join } from 'path'

const DEV = process.env.NODE_ENV !== 'production'

if (DEV) {
  require('dotenv').config()
}

const FONTS = JSON.parse(process.env.FONTS);

const cacheFont = (url, bname, cb) => {
  const dest = join(__dirname, `fonts-cache-${bname || basename(url)}`)
  if (fs.existsSync(dest)) {
    cb(dest)
  }

  const file = fs.createWriteStream(dest)

  https.get(url, response => {
    response.pipe(file)
    file.on('finish', () => {
      file.close(() => {
        cb(dest)
      })
    })
  })
}

export const registerFonts = () => {
  Object.keys(FONTS).forEach(key => {
    const font = FONTS[key]
    if (font.url) {
      cacheFont(font.url, font.basename, file => {
        Font.register(file, {
          family: font.family
        })
      })
    }
  })
}

registerFonts()

export const fontFamilies = Object.keys(FONTS)
  .reduce((acc, key) => ({ ...acc, [key]: FONTS[key].family }), {})
