import React from 'react'
import { Link, StyleSheet } from '@react-pdf/core'

const styles = StyleSheet.create({
  link: {
    color: '#00508C',
    fontSize: 13
    // fontFamily: 'GT America Regular'
  }
})

const Anchor = ({ children, href }) => (
  <Link style={styles.link} src={href}>{children}</Link>
)

export default Anchor
