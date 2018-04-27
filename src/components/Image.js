import React from 'react'
import { StyleSheet, Text } from '@react-pdf/core'
import { imageResizeUrl } from 'mdast-react-render/lib/utils'
import SafeImage from './SafeImage'
import { branch, renderComponent } from '../lib/hocs'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  image: {
    padding: 0,
    marginBottom: 5
  },
  alt: {
    fontSize: 8,
    lineHeight: 1.3,
    fontFamily: fontFamilies.sansSerifRegular,
    marginBottom: 5
  }
})

export const Alt = ({ children }) => (
  <Text style={styles.alt}>
    {children}
  </Text>
)

const Image = ({ src }) => (
  <SafeImage style={styles.image} src={imageResizeUrl(src, '2000x')} />
)

const ImageAlt = ({ alt, isCover }) => (
  <Alt>
    {`${isCover ? 'Cover' : 'Bild'}`}
    {`${alt ? `: ${alt}` : ''}`}
  </Alt>
)

export default branch(props => props.skip, renderComponent(ImageAlt))(Image)
