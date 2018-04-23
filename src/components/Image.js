import React from 'react'
import { Image, StyleSheet } from '@react-pdf/core'
import { parse, format } from 'url'

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
  const url = parse(imageResizeUrl(src, '2000x'), true)
  // force convert gif to png
  // and ensure pngs are not interlaced
  // - not supported by pdfkit
  if (url.pathname.match(/\.(gif|png)$/)) {
    url.query.format = 'png'
    // ensure format calculates from query object
    url.search = undefined
  }
  return <Image style={styles.image} src={format(url)} />
}
