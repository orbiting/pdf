import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  text: {
    width: 500,
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 2, // not supported.
    fontFamily: fontFamilies.serifRegular
    // align: 'justify'
  }
})

const Paragraph = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
)

export default Paragraph
