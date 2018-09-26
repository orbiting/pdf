import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  lead: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: fontFamilies.serifRegular
  }
})

const Lead = ({ children }) => (
  <Text style={styles.lead}>{children}</Text>
)

export default Lead
