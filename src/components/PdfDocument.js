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

const logTree = (node, depth = 0) => {
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
    node.props.children.map(c => logTree(c, depth + 1))
  }
}

const PdfDocument = ({ article, autoPage = false }) => {
  // If autoPage is true, we break each mdast child to a new page for demo reasons.
  // This should eventually become some smart logic based on element heights.
  const mdast = renderMdast(
    article.content,
    schema,
    {
      MissingNode: MissingPdfNode
    }
  )

  // logTree(mdast)

  return (
    <Document>
      {autoPage
        ? mdast.props.children.map(child => (
          <Page size='A4' style={styles.page}>
            {child}
          </Page>
        ))
        : (
          <Page size='A4' style={styles.page}>
            {mdast}
          </Page>
        )
      }
    </Document>
  )
}

export default PdfDocument
