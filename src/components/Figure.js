import React from 'react'
import { View, StyleSheet } from '@react-pdf/core'

const styles = StyleSheet.create({
  fullWidth: {
    width: '455',
    marginLeft: -60,
    marginTop: 5,
    marginBottom: 5
  },
  columnWidth: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5
  }
})

const Figure = ({ size, width, inCenter, children }) => {
  let sizeClassName

  if (width) {
    sizeClassName = { width }
  } else if (inCenter && size === 'breakout') {
    sizeClassName = styles.fullWidth
  } else {
    sizeClassName = styles.columnWidth
  }

  return <View style={sizeClassName}>{children}</View>
}

export default Figure
