import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    lineHeight: 1.3,
    marginBottom: 10,
    textAlign: 'justify',
    fontFamily: fontFamilies.serifRegular
  }
})

const Paragraph = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
)

export default Paragraph
