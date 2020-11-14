import React from 'react'
import { StyleSheet } from '@react-pdf/renderer'
import { imageResizeUrl } from 'mdast-react-render/lib/utils'
import Alt from './Alt'
import SafeImage from './SafeImage'
import { branch } from '../lib/hocs'

const styles = StyleSheet.create({
  image: {
    padding: 0,
    marginBottom: 5
  }
})

const Image = ({ src }) => (
  <SafeImage style={styles.image} src={imageResizeUrl(src, '2000x')} />
)

const ImageAlt = ({ alt, isCover }) => (
  <Alt>
    {`${isCover ? 'Cover' : 'Bild'}`}
    {`${alt ? `: ${alt}` : ''}`}
  </Alt>
)

export default branch(props => props.skip, ImageAlt)(Image)
