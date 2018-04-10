import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  legend: {
    marginTop: 5,
    marginBottom: 10,
    width: 500,
    fontSize: 12,
    fontFamily: fontFamilies.serifRegular
  }
})

const Legend = ({ children }) => (
  <Text style={styles.legend}>{children}</Text>
)

export default Legend
