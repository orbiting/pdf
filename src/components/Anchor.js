import React from 'react'
import { Link, StyleSheet } from '@react-pdf/renderer'

const { FRONTEND_BASE_URL } = process.env

const styles = StyleSheet.create({
  link: {
    color: '#000000',
    textDecoration: 'underline'
  }
})

const Anchor = ({ children, href }) => (
  <Link
    style={styles.link}
    src={
      href && href[0] === '/' // path urls
        ? FRONTEND_BASE_URL + href
        : href
    }
  >
    {children}
  </Link>
)

export default Anchor
