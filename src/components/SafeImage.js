import React from 'react'
import { Image } from '@react-pdf/core'
import { parse, format } from 'url'
import { branch, renderNothing } from '../lib/hocs'

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
  return <Image {...props} src={format(url)} />
}

export default branch(props => !props.src, renderNothing)(SafeImage)
