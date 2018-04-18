import React from 'react'
import { View, StyleSheet } from '@react-pdf/core'

const styles = StyleSheet.create({
  titleblock: {
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: 90
  }
})

const TitleBlock = ({ children, ...props }) => (
  <View
    style={[
      styles.titleblock,
      { textAlign: props.center ? 'center' : 'left' }
    ]}
    {...props}
  >
    {children}
  </View>
)

export default TitleBlock
