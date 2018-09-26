import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  legend: {
    fontSize: 8,
    lineHeight: 1.3,
    marginBottom: 10,
    fontFamily: fontFamilies.sansSerifRegular
  },
  credit: {
    fontSize: 7,
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const Legend = ({ children }) => (
  <Text style={styles.legend}>{children}</Text>
)

Legend.Credit = ({ children }) => (
  <Text style={styles.credit}>{children}</Text>
)

export default Legend
