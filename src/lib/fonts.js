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

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const fonts = JSON.parse(process.env.FONTS || "{}")

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
