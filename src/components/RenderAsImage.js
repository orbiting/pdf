import React from 'react'
import {
  Image,
  StyleSheet
} from '@react-pdf/core'

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
  const parents = [].concat(ancestors).reverse()
  const rootNode = parents[0]

  const ranges = parents.map((parent, index, all) => {
    return parent.children.indexOf(all[index + 1] || node)
  })

  const extractUrl = `${FRONTEND_BASE_URL}${rootNode.path}?extract=${ranges.join(':')}&unpack=${ranges.length}`
  const renderUrl = `${ASSETS_SERVER_BASE_URL}/render?width=665&height=1&id=${encodeURIComponent(rootNode.id)}&url=${encodeURIComponent(extractUrl)}`

  return (
    <Image style={styles.image} src={renderUrl} />
  )
}
