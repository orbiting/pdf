import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const family = {
  editorial: fontFamilies.serifTitle,
  meta: fontFamilies.sansSerifMedium,
  scribble: fontFamilies.cursiveTitle
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 30
  }
})

const H1 = ({ children, kind }) => (
  <Text
    minPresenceAhead={26}
    hyphenationPenalty={10000}
    style={[styles.headline, { fontFamily: family[kind] || family.editorial }]}
  >
    {children}
  </Text>
)

export default H1
