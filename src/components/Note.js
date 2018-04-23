import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  note: {
    fontSize: 7,
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const Note = ({ children }) => (
  <Text style={styles.note}>
    {children[0].props.children}
  </Text>
)

export default Note
