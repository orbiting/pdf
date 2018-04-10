import React from 'react'
import { Image, StyleSheet } from '@react-pdf/core'

import {
  imageResizeUrl
} from 'mdast-react-render/lib/utils'

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'grey',
    padding: 0,
    maxWidth: 500,
    marginBottom: 10
  }
})

export default ({ src }) => (
  <Image style={styles.image} src={imageResizeUrl(src, '2000x')} />
)
