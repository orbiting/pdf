import React from 'react'
import { View, StyleSheet } from '@react-pdf/core'

const styles = StyleSheet.create({
  center: {
    paddingHorizontal: 90
  }
})

const Anchor = ({ children, href }) => (
  <View style={styles.center}>{children}</View>
)

export default Anchor
