import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  cursive: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.serifItalic
  }
})

const Cursive = ({ children }) => (
  <Text style={styles.cursive}>{children}</Text>
)

export default Cursive
