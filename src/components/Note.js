import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  note: {
    fontSize: 7,
    marginBottom: 10,
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const Note = ({ children }) => (
  <Text style={styles.note}>
    {children}
  </Text>
)

export default Note
