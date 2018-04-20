import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  container: {
    marginVertical: 20
  },
  text: {
    fontFamily: fontFamilies.serifTitle,
    textAlign: 'center'
  }
})

const QuoteText = ({ children, ...props }) => (
  <Text style={styles.text}>{children}</Text>
)

const Quote = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

Quote.Text = QuoteText

export default Quote
