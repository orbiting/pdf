import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  headline: {
    fontSize: 30,
    marginBottom: 10,
    fontFamily: fontFamilies.serifTitle
  }
})

const H1 = ({ children }) => (
  <Text
    minPresenceAhead={26}
    style={styles.headline}
  >
    {children}
  </Text>
)

export default H1
