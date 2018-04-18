import React from 'react'
import { View } from '@react-pdf/core'

const Quote = ({ children, ...props }) => {
  return (
    <View>{children}</View>
  )
}

export default Quote
