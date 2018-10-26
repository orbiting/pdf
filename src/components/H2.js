import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  subheadline: {
    fontSize: 13,
    marginTop: 15,
    marginBottom: 5,
    fontFamily: fontFamilies.serifBold
  }
})

const H2 = ({ children }) => (
  <Text
    minPresenceAhead={26}
    hyphenationPenalty={10000}
    style={styles.subheadline}
  >
    {children}
  </Text>
)

export default H2
