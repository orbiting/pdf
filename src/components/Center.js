import React from 'react'
import { View, StyleSheet } from '@react-pdf/core'

const styles = StyleSheet.create({
  center: {
    paddingHorizontal: 90,
    '@media max-width: 420': {
      paddingHorizontal: 30
    }
  }
})

const Center = ({ children, href }) => (
  <View style={styles.center}>{children}</View>
)

export default Center
