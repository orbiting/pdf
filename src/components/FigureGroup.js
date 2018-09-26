import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    width: '455',
    marginLeft: -60,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  }
})

const Center = ({ size, columns, children, ...props }) => {
  const sizeClassName = size === 'breakout' ? styles.fullWidth : null

  return (
    <View
      wrap={false}
      style={[styles.container, sizeClassName]}
    >
      {children}
    </View>
  )
}

export default Center
