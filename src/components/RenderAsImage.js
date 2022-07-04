import React from 'react'
import { StyleSheet } from '@react-pdf/renderer'
import { getRanges } from '../lib/ranges'
import SafeImage from './SafeImage'

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginBottom: 10
  }
})

const {
  FRONTEND_BASE_URL,
  ASSETS_SERVER_BASE_URL
} = process.env

export default ({ node, ancestors }) => {
  const rootNode = ancestors[ancestors.length - 1]
  const ranges = getRanges({ node, ancestors })

  const extractUrl = `${FRONTEND_BASE_URL}${rootNode.path}?extract=${ranges.join(':')}&unpack=${ranges.length}`
  const renderUrl = `${ASSETS_SERVER_BASE_URL}/render?viewport=665&zoomFactor=2&id=${encodeURIComponent(rootNode.id)}&url=${encodeURIComponent(extractUrl)}`

  return (
    <SafeImage style={styles.image} src={renderUrl} />
  )
}
