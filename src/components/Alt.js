import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  alt: {
    fontSize: 8,
    lineHeight: 1.3,
    marginBottom: 5,
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const Alt = ({ children, style }) => (
  <Text style={[styles.alt, style]}>
    {children}
  </Text>
)

export default Alt
