import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/core'

import { renderMdast } from 'mdast-react-render'
import schema from '../schema'

import { MissingPdfNode } from './index.js'

import { range } from 'd3-array'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    marginTop: 50,
    marginLeft: 50
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

const PdfDocument = ({ article }) => {
  const mdast = renderMdast(
    article.content,
    schema,
    {
      MissingNode: MissingPdfNode
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

export default PdfDocument
