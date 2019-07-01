import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  strong: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.serifBold
  },
  emphasis: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.serifItalic
  },
  strongEmphasis: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.serifBoldItalic
  }
})

const Strong = ({ children }) => (
  <Text style={styles.strong}>{children}</Text>
)

const Emphasis = ({ children }) => (
  <Text style={styles.emphasis}>{children}</Text>
)

const StrongEmphasis = ({ children }) => (
  <Text style={styles.strongEmphasis}>{children}</Text>
)

export default { Strong, Emphasis, StrongEmphasis }
