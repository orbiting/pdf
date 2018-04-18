import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  strong: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: fontFamilies.serifBold
  }
})

const Strong = ({ children }) => (
  <Text style={styles.strong}>{children}</Text>
)

export default Strong
