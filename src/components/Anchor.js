import React from 'react'
import { Link, Text, StyleSheet } from '@react-pdf/renderer'

const { FRONTEND_BASE_URL } = process.env

const styles = StyleSheet.create({
  link: {
    color: '#000000'
  }
})

const Anchor = ({ children, href }) => (
  <Link
    src={
      href && href[0] === '/' // path urls
        ? FRONTEND_BASE_URL + href
        : href
    }
  >
    <Text style={styles.link}>{children}</Text>
  </Link>
)

export default Anchor
