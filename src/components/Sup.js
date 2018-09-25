import React from 'react'
import { Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  sup: {
    bottom: 0.8,
    fontSize: 8,
    position: 'relative'
  }
})

const Sup = ({ children }) => (
  <Text style={styles.sup}>{children}</Text>
)

export default Sup
