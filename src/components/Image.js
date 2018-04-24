import React from 'react'
import { StyleSheet } from '@react-pdf/core'
import SafeImage from './SafeImage'

import {
  imageResizeUrl
} from 'mdast-react-render/lib/utils'

const styles = StyleSheet.create({
  image: {
    padding: 0,
    marginBottom: 5,
    backgroundColor: 'grey'
  }
})

export default ({ src }) => {
  return <SafeImage style={styles.image} src={imageResizeUrl(src, '2000x')} />
}
