import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/core'
import ReactPDF from '@react-pdf/node'

import { renderMdast } from 'mdast-react-render'
import schema from '../schema'

import { MissingPdfNode } from './index.js'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    marginTop: 50,
    marginLeft: 50
  }
})

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
