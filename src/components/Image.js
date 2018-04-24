import React from 'react'
import { StyleSheet, Text } from '@react-pdf/core'
import SafeImage from './SafeImage'
import { fontFamilies } from '../lib/fonts'

import {
  imageResizeUrl
} from 'mdast-react-render/lib/utils'

const styles = StyleSheet.create({
  image: {
    padding: 0,
    marginBottom: 5,
    backgroundColor: 'grey'
  },
  alt: {
    fontSize: 8,
    lineHeight: 1.3,
    fontFamily: fontFamilies.sansSerifRegular,
    marginBottom: 5
  }
})

export const Alt = ({alt, children}) => (
  <Text style={styles.alt}>{children}</Text>
)

export default ({ src, alt, skip, isCover }) => {
  if (skip) {
    return <Alt>
      {`${isCover ? 'Cover' : 'Bild'}`}
      {`${alt ? `: ${alt}` : ''}`}
    </Alt>
  }
  return <SafeImage style={styles.image} src={imageResizeUrl(src, '2000x')} />
}
