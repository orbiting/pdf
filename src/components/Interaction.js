import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  emphasis: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.sansSerifMedium
  },
  cursive: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.sansSerifItalic
  }
})

const Emphasis = ({ children }) => (
  <Text style={styles.emphasis}>{children}</Text>
)

const Cursive = ({ children }) => (
  <Text style={styles.cursive}>{children}</Text>
)

export default { Emphasis, Cursive }
