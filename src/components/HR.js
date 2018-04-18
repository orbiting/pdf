import React from 'react'
import { View, StyleSheet } from '@react-pdf/core'

const styles = StyleSheet.create({
  center: {
    height: 1,
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#DADDDC'
  }
})

const HR = ({ children, href }) => (
  <View style={styles.center}>{children}</View>
)

export default HR
