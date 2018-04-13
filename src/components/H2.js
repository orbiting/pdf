import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  subheadline: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: fontFamilies.serifBold
  }
})

const H2 = ({ children }) => (
  <Text style={styles.subheadline} orphan={false}>{children}</Text>
)

export default H2
