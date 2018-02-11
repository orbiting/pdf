import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  headline: {
    fontSize: 28,
    marginBottom: 5,
    fontFamily: fontFamilies.serifTitle
  }
})

const H1 = ({ children }) => (
  <Text style={styles.headline}>{children}</Text>
)

export default H1
