import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'
import colors from '../lib/colors'

const styles = StyleSheet.create({
  subject: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: fontFamilies.sansSerifRegular,
    color: colors.feuilleton
  }
})

const Subject = ({ children }) => (
  <Text style={styles.subject}>{children}</Text>
)

export default Subject
