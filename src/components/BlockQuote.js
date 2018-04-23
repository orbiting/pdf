import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  text: {
    padding: 10,
    marginBottom: 3,
    backgroundColor: '#f7f7f7',
    fontFamily: fontFamilies.serifTitle
  }
})

const BlockQuote = ({ children }) => (
  <View>{children}</View>
)

const BlockQuoteText = ({ children, ...props }) => (
  <Text style={styles.text}>{children}</Text>
)

BlockQuote.Text = BlockQuoteText

export default BlockQuote
