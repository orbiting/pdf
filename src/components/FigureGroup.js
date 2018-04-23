import React from 'react'
import { View, StyleSheet } from '@react-pdf/core'

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fullWidth: {
    width: '455',
    marginLeft: -60
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
