import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  subject: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: fontFamilies.sansSerifRegular,
    color: '#8c8c8c'
  }
})

const Subject = ({ children }) => (
  <Text style={styles.subject}>{children}</Text>
)

export default Subject
