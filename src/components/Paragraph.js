import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    lineHeight: 1.3,
    marginBottom: 10,
    textAlign: 'justify',
    position: 'relative',
    fontFamily: fontFamilies.serifRegular
  }
})

const Paragraph = ({ style, children }) => (
  <Text style={[style, styles.text]}>{children}</Text>
)

export default Paragraph
