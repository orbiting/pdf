import React from 'react'
import { Link, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  link: {
    color: '#000000',
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const Anchor = ({ children, href }) => (
  <Link style={styles.link} src={href}>{children}</Link>
)

export default Anchor
