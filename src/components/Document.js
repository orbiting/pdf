import React from 'react'
import { StyleSheet, Document, Page, Text } from '@react-pdf/core'

import { renderMdast } from 'mdast-react-render'
import articleSchema from '../templates/Article'

import MissingNode from './MissingNode'

import { range } from 'd3-array'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 50
  }
})

const logReactTree = (node, depth = 0) => {
  const prefix = range(depth).map(() => '-')
  if (typeof node === 'string') {
    console.log(prefix, `${node.slice(0, 40)}${node.length >= 40 ? '...' : ''}`)
    return
  }
  console.log(
    prefix,
    node.displayName || (
      node.type && node.type.displayName
        ? node.type.displayName
        : node.type
    ),
    node.key
  )
  if (node.props && node.props.children) {
    node.props.children.map(c => logReactTree(c, depth + 1))
  }
}

const MdastDocument = ({ article }) => {
  if (article.meta.template !== 'article') {
    return (
      <Document>
        <Page size='A4' style={styles.page}>
          <Text>Template «{article.meta.template}» not supported</Text>
        </Page>
      </Document>
    )
  }

  const mdast = renderMdast(
    article.content,
    articleSchema,
    {
      MissingNode
    }
  )

  // logReactTree(mdast)

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        {mdast.props.children}
      </Page>
    </Document>
  )
}

export default MdastDocument
