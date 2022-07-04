import React from 'react'
import { Image, StyleSheet } from '@react-pdf/renderer'
import { URL } from 'url'
import { branch, RenderNothing } from '../lib/hocs'

const styles = StyleSheet.create({
  maxHeight: {
    objectFit: 'contain',
    maxHeight: 560,
    '@media max-width: 420': {
      maxHeight: 500
    }
  }
})

const SafeImage = ({ src, ...props }) => {
  const url = new URL(src)
  // force convert gif to png
  // and ensure pngs are not interlaced
  // - not supported by pdfkit
  if (url.pathname.match(/\.(gif|png|svg)$/)) {
    url.searchParams.set('format', 'png')
  }
  return (
    <Image
      {...props}
      style={[styles.maxHeight].concat(props.style).filter(Boolean)}
      src={url.href}
    />
  )
}

export default branch(props => !props.src, RenderNothing)(SafeImage)
