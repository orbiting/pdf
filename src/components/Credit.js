import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  credit: {
    fontSize: 8,
    lineHeight: 1.3,
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const Credit = ({ children }) => (
  <Text style={styles.credit}>{children}</Text>
)

export default Credit
