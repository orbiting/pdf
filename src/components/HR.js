import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  center: {
    height: 1,
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#DADDDC'
  }
})

const HR = ({ children, href }) => (
  <View style={styles.center} wrap={false}>{children}</View>
)

export default HR
