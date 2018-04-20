import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  legend: {
    fontSize: 7,
    marginBottom: 10,
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const Legend = ({ children }) => (
  <Text style={styles.legend}>{children}</Text>
)

export default Legend
