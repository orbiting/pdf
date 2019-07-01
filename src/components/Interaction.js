import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  strong: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.sansSerifMedium
  },
  emphasis: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.sansSerifItalic
  }
})

const Strong = ({ children }) => (
  <Text style={styles.strong}>{children}</Text>
)

const Emphasis = ({ children }) => (
  <Text style={styles.emphasis}>{children}</Text>
)

export default { Strong, Emphasis }
