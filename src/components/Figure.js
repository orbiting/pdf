import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'
import Center from './Center'

const styles = StyleSheet.create({
  breakoutWidth: {
    width: '455',
    marginLeft: -60,
    marginTop: 5,
    marginBottom: 5,
    '@media max-width: 420': {
      width: '100%',
      marginLeft: 0
    }
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

const Identity = ({ children }) => children

const Figure = ({ size, width, skip, inCenter, children }) => {
  let style

  if (width) {
    style = { width }
  } else if (inCenter && size === 'breakout') {
    style = styles.breakoutWidth
  } else if (size === 'tiny') {
    style = styles.tinyWidth
  } else {
    style = styles.columnWidth
  }

  const Wrapper = skip && !inCenter ? Center : Identity

  return (
    <Wrapper>
      <View style={style} wrap={false}>
        {children}
      </View>
    </Wrapper>
  )
}

export default Figure
