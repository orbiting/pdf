import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  emphasis: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.serifBold
  },
  cursive: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.serifItalic
  }
})

const Emphasis = ({ children }) => (
  <Text style={styles.emphasis}>{children}</Text>
)

const Cursive = ({ children }) => (
  <Text style={styles.cursive}>{children}</Text>
)

export default { Emphasis, Cursive }
