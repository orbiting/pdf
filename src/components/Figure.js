import React from 'react'
import { View } from '@react-pdf/core'

const Figure = ({ children, ...props }) => (
  <View {...props}>{children}</View>
)

export default Figure
