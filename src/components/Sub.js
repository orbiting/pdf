import React from 'react'
import { Text, StyleSheet } from '@react-pdf/core'

const styles = StyleSheet.create({
  sup: {
    bottom: -0.4,
    fontSize: 8,
    position: 'relative'
  }
})

const Sub = ({ children }) => (
  <Text style={styles.sup}>{children}</Text>
)

export default Sub
