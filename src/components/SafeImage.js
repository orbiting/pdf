import React from 'react'
import { Image, StyleSheet } from '@react-pdf/renderer'
import { parse, format } from 'url'
import { branch, renderNothing } from '../lib/hocs'

const styles = StyleSheet.create({
  maxHeight: {
    maxHeight: 560,
    '@media max-width: 420': {
      maxHeight: 400
    }
  }
})

const SafeImage = ({ src, ...props }) => {
  const url = parse(src, true)
  // force convert gif to png
  // and ensure pngs are not interlaced
  // - not supported by pdfkit
  if (url.pathname.match(/\.(gif|png)$/)) {
    url.query.format = 'png'
    // ensure format calculates from query object
    url.search = undefined
  }
  return <Image {...props}
    style={[styles.maxHeight].concat(props.style).filter(Boolean)}
    src={format(url)} />
}

export default branch(props => !props.src, renderNothing)(SafeImage)
