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
  },
  tinyWidth: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '33%',
    marginBottom: 5
  }
})

const Figure = ({ size, width, inCenter, children }) => {
  let style

  if (width) {
    style = { width }
  } else if (inCenter && size === 'breakout') {
    style = styles.fullWidth
  } else if (size === 'tiny') {
    style = styles.tinyWidth
  } else {
    style = styles.columnWidth
  }

  return <View style={style} wrap={false}>
    {children}
  </View>
}

export default Figure
